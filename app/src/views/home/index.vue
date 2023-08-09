<template>
  <div class="home">
    <div class="home-content" v-if="globalStore.user.username" >
      <Header />
      <div class="main">
        <router-view />
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Header from './Header/index.vue'
import { GlobalStore } from "@/stores";
import { getCurrentUser } from '@/api/index'
import { useRouter, useRoute } from 'vue-router'

const user = ref({} as any)

const router = useRouter()
const route = useRoute()

onMounted(() => {
  console.log(route.name)
  // const store = useStore()

  getCurrentUser().then((res: any) => {
    console.log('测试用户', res)
    if (res && res.username) {
      globalStore.user = {
        userid: res.id,
        username: res.username
      }

      user.value = globalStore.user
    } else {
      router.push({
        name: 'login'
      })
    }
  }).catch((err: any) => {
    console.log(err)
  })
})

const globalStore = GlobalStore();
</script>

<style lang="less">
.home {
  min-width: 1200px;
  height: 100%;
  background-image: url("@/assets/imgs/white.jpeg");
  background-position: top center;
  .home-content {
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;    
    .main {
      // flex: 1;
      height: calc(100% - 50px)
    }
  }
}
</style>
