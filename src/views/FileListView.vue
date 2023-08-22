<script setup lang="tsx">
import IconsItem from '@/components/IconsItem.vue'
import { useFetch } from '@/hooks/useFetch'
import useIcons from '@/hooks/useIcons'
import { ref, unref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFiles } from '@/request/apis/index'

import { ElCheckbox, type CheckboxValueType, ElMessage } from 'element-plus'
import type { FunctionalComponent } from 'vue'

type SelectionCellProps = {
  value: boolean
  intermediate?: boolean
  onChange: (value: CheckboxValueType) => void
}

interface TableType {
  name: string
  size: number
  modified: string
  isFolder: boolean
  path: string
  type: any
  extension: string
  checked?: boolean
  items?: TableType[]
  content?: string
}

interface BreadcrumbType {
  label: string
  path: string
  icon?: Icon
}

const route = useRoute()
const router = useRouter()
const rootRoutePath = '/home/files'

// 文件列表
const tableData = ref<TableType[]>([])

/**
 * 路由变化，发送请求
 */
watchEffect(() => {
  const {
    params: { path }
  } = route

  let requestPath = '/files'
  if (Array.isArray(path)) {
    requestPath += path.join('/')
  }

  getFiles<TableType>(requestPath)
    .then((res) => {
      const { items, isFolder, content } = res
      if (items && isFolder) {
        tableData.value = items
      } else {
        console.log(content)
      }
    })
    .catch((err: Error) => {
      ElMessage.error(err.message)
      router.push('/login')
    })
})

/**
 * 面包屑部分
 */
const breadcrumbList = ref<BreadcrumbType[]>([])

/**
 * 路由切换面包屑更改
 */
watchEffect(() => {
  const { path } = route.params

  breadcrumbList.value = [
    {
      label: '首页',
      path: rootRoutePath,
      icon: 'HomeFilled'
    }
  ]

  if (Array.isArray(path)) {
    const morePath: BreadcrumbType[] = path.map((p, index) => ({
      label: p,
      path: `${rootRoutePath}/${path.slice(0, index + 1).join('/')}`
    }))

    breadcrumbList.value.push(...morePath)
  }
})

/**
 * 名称排序
 */
const hasSort = ref(true)
const onSort = () => {
  hasSort.value = !hasSort.value

  if (hasSort.value) {
    tableData.value.sort((a, b) => a.name.localeCompare(b.name))
  } else {
    tableData.value.sort((a, b) => b.name.localeCompare(a.name))
  }
}

const columns: any[] = [
  {
    dataKey: 'name',
    key: 'name',
    title: '名称',
    minWidth: "33%",
    cellRenderer: ({ rowData }: { rowData: TableType }) => {
      return (
        <div class="el-table-column-folder">
          <IconsItem iconName={rowData.isFolder ? 'Folder' : 'Document'} />
          {rowData.name}
        </div>
      )
    },
    headerCellRenderer: (props: any) => {
      if (props.column.key === 'name') {
        return (
          // 名称排序
          <div
            onClick={onSort}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            {props.column.title}
            {hasSort.value ? (
              <IconsItem iconName="CaretBottom" />
            ) : (
              <IconsItem iconName="CaretTop" />
            )}
          </div>
        )
      }
      return <>{props.column.title}</>
    }
  },
  {
    dataKey: 'size',
    key: 'size',
    title: '大小（字节）',
    minWidth: "33%"
  },
  {
    dataKey: 'modified',
    key: 'modified',
    title: '修改时间'
  }
]
const SelectionCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  intermediate = false,
  onChange
}) => {
  return <ElCheckbox onChange={onChange} modelValue={value} indeterminate={intermediate} />
}
columns.unshift({
  key: 'selection',
  width: 50,
  cellRenderer: ({ rowData }: any) => {
    const onChange = (value: CheckboxValueType) => (rowData.checked = value)
    return <SelectionCell value={rowData.checked} onChange={onChange} />
  },
  headerCellRenderer: () => {
    const _data = unref(tableData)
    const onChange = (value: CheckboxValueType) => {
      return (tableData.value = _data.map((row) => {
        row.checked = value as boolean
        return row
      }))
    }

    const allSelected = _data.length ? _data.every((item) => item.checked) : false

    const containsChecked = _data.some((row) => row.checked)

    return (
      <SelectionCell
        value={allSelected}
        intermediate={containsChecked && !allSelected}
        onChange={onChange}
      />
    )
  }
})

/**
 * 双击切换目录
 */
const dblclick = (e: any) => {
  const target = e.target // 当前cell元素
  const rowTarget = target.parentNode // 当前row元素
  // 找到对应的名称
  const text = rowTarget.children[1].innerText
  tableData.value.some((item) => {
    const { name, path } = item
    if (name === text) {
      router.push({
        name: 'files',
        params: {
          path: path.split('/').filter(Boolean)
        }
      })

      return
    }
  })
}
</script>

<template>
  <div class="filelist">
    <!-- 面包屑导航 -->
    <el-breadcrumb :separator-icon="useIcons('ArrowRight')">
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="{ path: item.path }">
        <icons-item style="cursor: pointer" size="24" v-if="item.icon" :icon-name="item.icon" />
        <span v-else
          ><h4 style="font-weight: bold">{{ item.label }}</h4></span
        >
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 文件夹列表 -->
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          @dblclick="dblclick"
          :columns="columns"
          :data="tableData"
          :width="width"
          :height="height"
        >
        </el-table-v2>
      </template>
    </el-auto-resizer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-breadcrumb) {
  display: flex;
  align-items: center;
}
.filelist {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

:deep(.el-table-column-folder) {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
}
</style>
