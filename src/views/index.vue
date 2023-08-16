<template>
  <!-- <div>{{ ip }}</div>   -->
  <div class="main-contain" ref="containRef">
    <div class="text-container">
      <div v-for="(item, index) in terminalList" :key="index" :style="{color: item.color?item.color:'#000'}">{{ `${item.path ? item.path + ':' : ''}${item.content}` }}</div>
    </div>
    <div class="text-control">
      <span style="color: #5c5dcd">{{ path }}:</span>
      <input v-model="commandInput" @keyup.enter="handlerExec" />
      <button type="button" @click="handlerExec">exec</button>
      <button type="button" @click="handlerMouse">mouse</button>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'

// const ip = ref('')
const commandInput = ref('')
const terminalList: any = reactive([] as any)
const path = ref('')
const containRef = ref(null as any)

onMounted(() => {
  // (window as any).electronAPI.getIP().then((res: any) => {
  //   ip.value = res
  // })

  (window as any).electronAPI.handlerExec({
    commandInput: 'pwd'
  }).then((res: any) => {
    path.value = res.content
  })
})

const handlerExec = () => {
  (terminalList as any).push({
    path: path.value,
    content: commandInput.value,
    color: '#ffb200'
  })
  
  nextTick(() => {
    (window as any).electronAPI.handlerExec({
      commandInput: commandInput.value
    }).then((res: any) => {
      // console.log('测试res', res)
      terminalList.push(res)
      nextTick(() => {
        containRef.value.scrollTop = containRef.value.scrollHeight;
      })
    })

    commandInput.value = ''
  })
}

let x: any = 200
let y: any = 200

const handlerMouse = () => {
  // setInterval(() => {
  //   (window as any).electronAPI.setMousePosition({
  //     x: x += 10,
  //     y: y += 10
  //   })
  // }, 2000)  
  (window as any).electronAPI.setMousePosition({
    x,
    y
  })
}
</script>

<style lang="less" scoped>
.main-contain {
  padding: 8px;
  height: calc(100vh - 16px);
  overflow: auto;
  white-space: pre-line;
}
</style>