<template>
  <div class="login">
    <div class="login-box">
      <div class="login-title">{{ $t('login.title') }}</div>
      <el-form :model="login" label-width="120px">
        <el-form-item class="username" :label="$t('login.username')">
          <el-input v-model="login.username" />
        </el-form-item>
        <el-form-item class="password" :label="$t('login.password')">
          <el-input type="password" v-model="login.password" />
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="handlerLogin">{{ $t('login.login') }}</el-button>
        </el-form-item>
      </el-form>
      <div class="regist-btn" @click="toRegist">regist</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  loginApi
} from '@/api/index'
import { useRouter } from 'vue-router'

const login = ref({
  username: '',
  password: ''
})

const router = useRouter()

// 登录
const handlerLogin = () => {
  loginApi({
    username: login.value.username,
    password: login.value.password
  }).then((res: any) => {
    console.log('测试post', res)
    if (res) {
      localStorage.setItem('token', res.token)

      router.push({
        name: 'home'
      })
    } else if (res === false) {
      ElMessage.error('用户名或者密码错误')
    } else {
      ElMessage.error('网络错误')
    }
  })
}

const toRegist = () => {
  router.push({
    name: 'regist'
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
