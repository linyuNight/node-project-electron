<template>
  <div class="music">
    <div>音乐上传</div>
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      :action="`${baseUrl}/upload_music`"
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
    <div class="music-list">
      <div class="item" v-for="(item, index) in musicList" :key="index">
        <div :class="currentIndex == index ? 'active' : ''">{{ item.name }}</div>
        <el-button type="primary" @click="play(item, index)">播放</el-button>
      </div>
    </div>
    <audio 
      ref="audioRef" 
      :src="audioSrc" 
      controls
      @ended="ended"
      preload="auto"
    ></audio>
  </div>  
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue'
import { baseUrl } from '@/config/index'
import type { UploadInstance } from 'element-plus'
import {
  queryMusic,
  getMusic
} from '@/api'
import { GlobalStore } from "@/stores";
const globalStore = GlobalStore();

const authorization = localStorage.getItem('token')

const uploadData = ref({} as any)

const musicList = ref([] as any)

const audioRef = ref(null as any);

const uploadRef = ref<UploadInstance>()

const currentIndex = ref(null as any)

onMounted(() => {
  getData()
})

// 获取音乐列表
const getData = () => {
  queryMusic({
    userid: globalStore.user.userid
  }).then((res: any) => {
    musicList.value = res.files
  })
}

// 上传成功回调
const handlerSuccess = () => {
  setTimeout(() => {
    getData()
  }, 300)  
}

// 上传
const submitUpload = () => {
  uploadRef.value!.submit()
}

const audioSrc = ref('' as any); // 后端提供的音频接口

// 播放音乐
const play = async (item: any, index: any) => {
  currentIndex.value = index

  audioSrc.value = getMusic(item.name)

  nextTick(() => {
    audioRef.value.play()
  })
}

const ended = () => {
  if(currentIndex.value == musicList.value.length - 1) {
    currentIndex.value = 0
  } else {
    currentIndex.value++
  }  

  play(musicList.value[currentIndex.value], currentIndex.value)
}
</script>

<style lang="less" scoped>
.music-list {
  .item {
    display: flex;
    .active {
      color: #ffc
    }
  }
}
</style>