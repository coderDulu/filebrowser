<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import loginBackImg from '@/assets/img/loginBackImg.png'
import { login } from '@/request/apis/index'
import { ElMessage } from 'element-plus'
import formDefaultRules from '@/utils/formRules'

import type { FormInstance, FormRules } from 'element-plus'


interface UserType {
  username: string
  password: string
}

const router = useRouter()

const formState = reactive<UserType>({
  username: '',
  password: ''
})

const ruleFormRef = ref<FormInstance>()
const rules: FormRules<UserType> = {
    username: formDefaultRules.required,
    password: formDefaultRules.required
}

const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      login(formState)
        .then((res) => {
          const { token } = res
          localStorage.setItem('token', token)
          ElMessage.success('登录成功')
          router.push({
            name: 'home'
          })
        })
        .catch((err: Error) => {
          ElMessage.error(err.message)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div class="login-c">
    <img :src="loginBackImg" class="back-img" />
    <div class="login-form font-size fadeIn">
      <div class="login-form-title">
        <IconsItem icon-name="FolderOpened" />
        <h2>File Browser</h2>
      </div>

      <el-form
        style="width: 70%"
        label-width="auto"
        :rules="rules"
        hide-required-asterisk
        size="large"
        ref="ruleFormRef"
        :model="formState"
      >
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="formState.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            @keydown.enter="onSubmit(ruleFormRef)"
            type="password"
            show-password
            placeholder="请输入密码"
            v-model="formState.password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%" size="large" type="primary" @click="onSubmit(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.login-c {
  width: 100%;
  height: 100%;
  //   background: url('../assets/img/loginBackImg.png') no-repeat;
  //   background-size: cover;
  //   background-color: #a09f9f;
  @include center();
  position: relative;

  .back-img {
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
    -webkit-font-smooting: antialiased;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
}

.login-form {
  width: 450px;
  height: 400px;
  background-color: rgba($color: #f6f6f6, $alpha: 0.5);
  @include center();
  border-radius: 10px;
  gap: 20px;

  &-title {
    text-align: center;

    h2 {
      font-weight: bold;
    }
  }
}

.font-size {
  font-size: 3vw;
}

@media screen and (min-width: 480px) {
  .font-size {
    font-size: 24px;
  }
}

@media screen and (min-width: 960px) {
  .font-size {
    font-size: 40px;
  }
}
</style>
