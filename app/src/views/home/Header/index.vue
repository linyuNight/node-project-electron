<template>
  <div class="header transparent-card">
    <div class="header-l">
      <div
        class="header-item"
        :class="route.name === item.name || route.meta.parent === item.name ? 'active' : ''"
        v-for="(item, index) in headerList"
        :key="index"
        @click="handlerHeaderClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="header-r">
      <el-dropdown v-if="globalStore.user.username">
        <span class="user-name">{{ globalStore.user.username }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// import { useStore } from 'vuex'
import { GlobalStore } from "@/stores";

const headerList = ref([] as any)

const globalStore = GlobalStore();

onMounted(() => {
  console.log('mmmmm')

  headerList.value = [
    {
      label: 'diary',
      name: 'diary'
    },
    {
      label: 'tools',
      name: 'tools'
    },
    {
      label: 'clound data',
      name: 'cloundData'
    },
    {
      label: 'chatgpt',
      name: 'chatgpt'
    },
    {
      label: 'music',
      name: 'music'
    }
  ]

  console.log('测试username', globalStore.user.username)

  if (globalStore.user.username === '123') {
    console.log(globalStore.user)
    headerList.value.push({
      label: 'manager',
      name: 'manager'
    })
  }
})

const router = useRouter()
const route = useRoute()



const handlerHeaderClick = (item: any) => {
  router.push({
    name: item.name
  })
}

const logout = () => {
  localStorage.removeItem('token')

  globalStore.user = {}

  router.push({
    name: 'login'
  })
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0 24px;
  margin-bottom: 10px;
  .header-l {
    display: flex;
    align-items: center;
    margin-left: -6px;
    .header-item {
      // width: 60px;
      padding: 0 16px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    .active {
      color: #fff;
    }
  }
  .header-r {
    display: flex;
    align-items: center;
    .user-name {
      color: #000;
      cursor: pointer;
    }
  }
}
</style>