<template>
  <div class="diary">
    <SideBar />
    <ChatRoom />
  </div>
</template>

<script lang="ts" setup>
import SideBar from '@/views/home/diary/components/SideBar.vue'
import ChatRoom from '@/views/home/diary/components/ChatRoom.vue'
</script>

<style lang="less">
.diary {
  display: flex;
  height: 100%;
}
</style>
