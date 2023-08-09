<template>
  <div class="chat-room transparent-card">
    <router-view :key="route.params.id" v-if="!globalStore.roomLoading"/>
  </div>
</template>

<script lang="ts" setup>
// import { useStore } from 'vuex'
import { GlobalStore } from "@/stores";
import { useRoute } from 'vue-router'

// const store = useStore()
const globalStore = GlobalStore();

const route: any = useRoute()
</script>

<style lang="less">
.chat-room {
  flex: 1;
  // background: #fff;
  border-radius: 6px;
}
</style>
