<template>
  <div class="cloud-data">
    <div>云数据上传</div>
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      :action="`${baseUrl}/upload_clound_data`"
      :auto-upload="false"
      :headers="{
        Authorization: authorization
      }"
      multiple
      :data="uploadData"
      :on-success="handlerSuccess"
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
    <LinkDownLoad />
    <el-button type="primary" @click="handlerCreateFolder">创建文件夹</el-button>
    <div class="files-contain">
      <div class="file transparent-card" v-for="(item, index) in fileList" :key="index" @dblclick.="handlerClick(item)">
        <el-icon v-if="item.isFile" class="folder-icon"><Files /></el-icon>
        <el-icon v-else class="folder-icon"><Folder /></el-icon>
        <div class="item-name">{{ item.name.slice(0, 10) }}</div>
        <template v-if="item.isFile">
          <div @click="openDownload(item.name)">下载</div>
          <div @click="play(item.name)">播放</div>
        </template>
        <div @click="handlerDeleteCloudFile(item)">删除</div>
      </div>    
    </div>
    <div>
      <video class="play-video" :src="videoSrc" controls></video>
    </div>
  </div>  
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { UploadInstance } from 'element-plus'
import { baseUrl } from '@/config/index'
import { GlobalStore } from "@/stores";
import  { queryCloudData, downloadCloudFile, getVideo, createFolder, deleteCloudFile } from '@/api/index'
import LinkDownLoad from '@/views/home/clound_data/components/LinkDownLoad.vue'

const authorization = localStorage.getItem('token')

const globalStore = GlobalStore();

const uploadRef = ref<UploadInstance>()

const fileList = ref([] as any)

const videoSrc = ref('' as any)

const router = useRouter()

const route = useRoute()

const uploadData = ref({} as any)

// 获取文件列表
const getFileList = (path: any) => {
  queryCloudData({
    userid: globalStore.user.userid,
    path: path
  }).then((res: any) => {
    fileList.value = res.files.slice(0)
  })
}

const getData = () => {
  getFileList(route.query.path)
}

watch(
  route,
  (value) => {
    // console.log('测试watch', value.query.path)
    let obj: any = {
      userid: globalStore.user.userid
    }

    if (value.query.path) {
      obj.path = value.query.path
    } else {
      delete obj.path
    }

    uploadData.value = obj

    getData()
  },
  {
    immediate: true
  }
)

// 上传成功回调
const handlerSuccess = () => {
  getData()
}

// 上传
const submitUpload = () => {
  uploadRef.value!.submit()
}

// 删除文件或文件夹
const handlerDeleteCloudFile = (item: any) => {  
  console.log('测试item', item)
  ElMessageBox.confirm(
    '删除文件?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      deleteCloudFile({
        file: item.name,
        path: route.query.path,
        isFile: item.isFile
      }).then((res: any) => {
        getData()
      })
    })
    .catch((err: any) => {
      console.log(err)
    })
}

const downloadFile = (item: any) => {
  downloadCloudFile({
    userid: globalStore.user.userid,
    path: route.query.path,
    filename: item
  }).then((res: any) => {
    const blob = new Blob([res]);
    const url = URL.createObjectURL(blob);

    // 创建下载链接
    const link = document.createElement('a');
    link.href = url;
    link.download = item; // 设置下载的文件名，可根据需要进行修改
    link.click();

    // 释放URL对象
    URL.revokeObjectURL(url);
  }).catch(error => {
    console.error('下载文件失败：', error);
  });
}

const openDownload = (item: any) => {
  ElMessageBox.confirm(
    '下载文件?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      downloadFile(item)
    })
    .catch((err: any) => {
      console.log(err)
    })
}

// 播放视频
const play = (item: any) => {
  getVideo({
    userid: globalStore.user.userid,
    filename: item,
    path: route.query.path
  }).then((res: any) => {
    const blob = new Blob([res]);
    const url = URL.createObjectURL(blob);

    videoSrc.value = url
  }).catch(error => {
    console.error('下载文件失败：', error);
  });
}

// 创建文件夹
const handlerCreateFolder = () => {  
  ElMessageBox.prompt('请输入文件名', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',    
  })
    .then(({ value }) => {
      createFolder({
        folderPath: `${route.query.path ? route.query.path : ''}/${value}`
      }).then(res => {
        getData()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}

// 文件夹点击会进入下级目录
const handlerClick = (item: any) => {  
  if(!item.isFile) {
    router.push({
      name: 'cloundData',
      query: {
        path: `${route.query.path ? route.query.path : ''}/${item.name}`
      }
    })
  }
}

</script>

<style lang="less" scoped>
.files-contain {
  display: flex;
  flex-wrap: wrap;
  .file {
    width: 120px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 12px;
    margin-right: 14px;
    margin-bottom: 14px;
    cursor: pointer;
    .folder-icon {
      margin-bottom: 6px;
      font-size: 26px;
    }
    .item-name {

    }
  }
}
.play-video {
  width: 600px;
  height: 400px;
}
</style>