<template>
  <div>node-project前端pc上传</div>
  <el-upload
    ref="uploadRef"
    class="upload-demo"
    :action="`${baseUrl}/upload`"
    :auto-upload="false"
    :headers="{
      Authorization: authorization
    }"
    multiple
  >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>

    <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button>

    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
  <div>node-project前端mobile上传</div>
  <el-upload
    ref="uploadMobileRef"
    class="upload-demo"
    :action="`${baseUrl}/upload_mobile`"
    :auto-upload="false"
    :headers="{
      Authorization: authorization
    }"
    multiple
  >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>

    <el-button class="ml-3" type="success" @click="submitUploadMobile">
      upload to server
    </el-button>

    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
  <div>后台管理上传</div>
  <el-upload
    ref="uploadManagerRef"
    class="upload-demo"
    :action="`${baseUrl}/upload_manager`"
    :auto-upload="false"
    :headers="{
      Authorization: authorization
    }"
    multiple
  >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>

    <el-button class="ml-3" type="success" @click="submitUploadManager">
      upload to server
    </el-button>

    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
  <el-button type="primary" @click="openUpdateBackend">更新后台</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadInstance } from 'element-plus'
import { baseUrl } from '@/config/index'
import { updateBackend } from '@/api/index.ts'
import { ElMessage, ElMessageBox } from 'element-plus'

const authorization = localStorage.getItem('token')

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
}

const uploadMobileRef = ref<UploadInstance>()

const submitUploadMobile = () => {
  uploadMobileRef.value!.submit()
}

const uploadManagerRef = ref<UploadInstance>()

const submitUploadManager = () => {
  uploadManagerRef.value!.submit()
}

// 更新后台
const handlerUpdateBackend = () => {
  updateBackend().then((res: any) => {
    console.log('测试', res)
  })
}

const openUpdateBackend = () => {
  ElMessageBox.confirm(
    '更新后台?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      handlerUpdateBackend()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
</script>

<style lang="less" scoped>

</style>