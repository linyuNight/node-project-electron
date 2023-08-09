<template>    
  <el-button type="primary" @click="open">Link Download</el-button>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { linkDownLoad } from '@/api/index.ts'

const open = () => {
  ElMessageBox.prompt('Please input your link', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
    .then(({ value }) => {
    //   ElMessage({
    //     type: 'success',
    //     message: `Your email is:${value}`,
    //   })
			linkDownLoad({
				link: value
			}).then((res:any) => {
				
			})
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}
</script>

<style lang="less" scoped>

</style>