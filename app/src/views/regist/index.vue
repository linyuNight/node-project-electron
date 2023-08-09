<template>
  <div class="login">
    <div class="login-box">
      <div class="login-title">{{ $t('login.title') }}</div>
      <el-form :model="register" label-width="120px">
        <el-form-item class="username" :label="$t('login.username')">
          <el-input v-model="register.username" />
        </el-form-item>
        <el-form-item class="password" :label="$t('login.password')">
          <el-input type="password" v-model="register.password" />
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="handlerRegister">{{ $t('login.regist') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  registerApi
} from '@/api/index'
import { useRouter } from 'vue-router'

const register = ref({
  username: '',
  password: ''
})

const router = useRouter()

// 注册
const handlerRegister = () => {
  registerApi({
    username: register.value.username,
    password: register.value.password
  }).then((res: any) => {
    // console.log('测试post', res)
    if (res === 'success') {
      ElMessage({
        message: '注册成功',
        type: 'success'
      })

      router.push({
        name: 'login'
      })
    } else {
      ElMessage.error('注册失败')
    }
  })
}
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #2c3a4cff;
  .login-box {
    width: 500px;
    height: 500px;
    background: #fff;
    border-radius: 12px;
    .login-title {
      text-align: center;
      margin: 60px;
      font-size: 32px;
    }
    .username {
      margin-right: 40px;
    }
    .password {
      margin-right: 40px;
    }
    .el-form-item {
      margin-bottom: 40px;
      &:last-child {
        margin-bottom: 0;
      }
      .login-btn {
        width: 260px;
        margin-bottom: 20px;

      }
    }
    .regist-btn {
      margin-left: 120px;
      color: #3f9effff;
      cursor: pointer;
    }
  }
}
</style>
