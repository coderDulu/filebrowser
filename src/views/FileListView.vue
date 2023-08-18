<script setup lang="tsx">
import { ref, unref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '@/hooks/useFetch'
import IconsItem from '@/components/IconsItem.vue'
import useIcons from '@/hooks/useIcons'
// import { ElTableV2 } from 'element-plus'

import type { FunctionalComponent } from 'vue'
import { ElCheckbox, type CheckboxValueType } from 'element-plus'

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
}

interface BreadcrumbType {
  label: string
  path: string
  icon?: Icon
}

const route = useRoute()
const router = useRouter()
const rootRoutePath = '/files'

// 文件列表
const tableData = ref<TableType[]>([])

/**
 * 请求处理文件列表
 */
const requestFiles = (url: string) => {
  const { data } = useFetch<TableType>(url)
  watch(data, (newData) => {
    if (newData) {
      const { items, isFolder } = newData
      if (isFolder && items?.length) {
        tableData.value = items
      }
    }
  })
}
/**
 * 路由变化，发送请求
 */
watchEffect(() => {
  requestFiles(`/api/${route.fullPath}`)
})

/**
 * 面包屑部分
 */
const breadcrumbList = ref<BreadcrumbType[]>([])

/**
 * 路由切换面包屑更改
 */
watchEffect(() => {
  const path = route.params?.path

  breadcrumbList.value = [
    {
      label: '首页',
      path: rootRoutePath,
      icon: 'HomeFilled'
    }
  ]

  if (path.length && path instanceof Array) {
    const morePath: BreadcrumbType[] = path.map((p, index) => ({
      label: p,
      path: `${rootRoutePath}/${path.slice(0, index + 1).join('/')}`
    }))

    breadcrumbList.value.push(...morePath)
  }
})

const columns: any[] = [
  {
    dataKey: 'name',
    key: 'name',
    title: '名称',
    minWidth: 500,
    cellRenderer: ({ rowData }: { rowData: TableType }) => {
      return (
        <>
          <div
            onDblclick={() => {
              console.log('dbclick')
            }}
            class="el-table-column-folder"
          >
            <IconsItem iconName={rowData.isFolder ? 'Folder' : 'Document'} />
            {rowData.name}
          </div>
        </>
      )
    }
  },
  {
    dataKey: 'size',
    key: 'size',
    title: '大小',
    minWidth: 500
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
  const parentTarget = rowTarget.parentNode as HTMLDivElement
  const childrenNodes = Array.from(parentTarget.children)
  const findIndex = childrenNodes.findIndex((item) => item === rowTarget)

  if (findIndex !== -1) {
    const { path } = tableData.value[findIndex]
    router.push(rootRoutePath + path)
  }
}
</script>

<template>
  <div class="filelist">
    <!-- 面包屑导航 -->
    <el-breadcrumb :separator-icon="useIcons('ArrowRight')">
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="{ path: item.path }">
        <icons-item style="cursor: pointer" size="24" v-if="item.icon" :icon-name="item.icon" />
        <span v-else>{{ item.label }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
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

    <!-- <el-table
      lazy
      @row-dblclick="rowDbClick"
      show-overflow-tooltip
      highlight-current-row
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="名称">
        <template #default="{ row }">
          <div class="el-table-column-folder">
            <icons-item :icon-name="row.isFolder ? 'Folder' : 'Document'" />
            {{ row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小" />
      <el-table-column prop="modified" label="最后修改时间" />
    </el-table> -->
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
