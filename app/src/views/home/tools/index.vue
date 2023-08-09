<template>
  <div class="tools-list">
    <div class="tools-item" v-for="(item, index) in toolsList" :key="index">
      <div>{{ item.label }}</div>
      <div>{{ item.content }}</div>
    </div>
    <video ref="myVideo" class="my-video" autoplay controls></video>
    <el-button type="primary" @click="showCamera">展示视频</el-button>
    <video ref="myAudio" class="my-audio" autoplay controls></video>
    <el-button type="primary" @click="showAudio">展示音频</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, onMounted } from 'vue'

const toolsList = ref([
  {
    label: 'tool132',
    content: 'tool1111211'
  }
])

let myVideoRef: any = null
let myAudioRef: any = null

onMounted(() => {
  const currentInstance: any = getCurrentInstance()
  myVideoRef = currentInstance.refs.myVideo
  myAudioRef = currentInstance.refs.myAudio
})

const showCamera = () => {
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  }).then(res => {
    myVideoRef.srcObject = res
  }).catch((err) => {
    console.log(err)
  })
}

const showAudio = () => {
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  }).then(res => {
    myAudioRef.srcObject = res
  }).catch((err) => {
    console.log(err)
  })
}
</script>

<style lang="less">
.tools-item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.my-video {
  width: 1200px;
  height: 1000px;
}
</style>
