<template>
  <div class="side-bar transparent-card">
    <div class="create-group" @click="showCreate">创建群</div>
    <div class="join-group" @click="showJoin">加入群</div>
    <!-- <div @click="handlerCheck">测试查看所有用户</div> -->
    <!-- <div @click="handlerQueryAllGroups">测试查看所有群</div> -->
    <div class="user-groups">
      <div
        class="groups-item"
        :class="item.id === route.params.id ? 'active' : ''"
        v-for="(item, index) in groups"
        :key="index"
        @click="handlerJoinRoom(item)"
      >{{ item.groupname }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  queryAllUsersApi,
  createGroup,
  queryAllGroups
} from '@/api/index'
// import { useStore } from 'vuex'
import { GlobalStore } from "@/stores";

const globalStore: any = GlobalStore();

const router = useRouter()
const route = useRoute()
// const store = useStore()
const groups = ref([] as any)

// const handlerCheck = () => {
//   queryAllUsersApi().then((res: any) => {
//     console.log('测试res', res)
//   }).catch((err: any) => {
//     console.log(err)
//   })
// }

const showCreate = () => {
  ElMessageBox.prompt('创建一个群', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(({ value }: any) => {
      createGroup({
        groupname: value,
        creator: globalStore.user.username
      }).then((res: any) => {
        console.log('测试创建', res)
        handlerQueryAllGroups()
      })
    })
    .catch(() => {})
}

const showJoin = () => {
  ElMessageBox.prompt('加入一个群', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(({ value }: any) => {

    })
    .catch(() => {})
}

// 查看所有群
const handlerQueryAllGroups = () => {
  globalStore.roomLoading = true
  queryAllGroups().then((res: any) => {
    console.log('测试所有群', res)

    groups.value = JSON.parse(JSON.stringify(res)).map((val: any) => {
      return {
        id: val._id,
        groupname: val.groupname,
        creator: val.creator
      }
    })

    globalStore.groups = groups.value
  }).catch((err: any) => {
    console.log(err)
  }).finally(() => {
    globalStore.roomLoading = false
  })
}

// 点击进入房间
const handlerJoinRoom = (item: any) => {
  console.log('测试进入群', item)
  router.push({
    name: 'room',
    params: {
      id: item.id,
      groupname: item.groupname
    }
  })
}

onMounted(() => {
  handlerQueryAllGroups()
})
</script>

<style lang="less" scoped>
.side-bar{
  width: 200px;
  // background: #fff;
  padding: 20px 30px;
  margin-right: 10px;
  border-radius: 6px;
  .create-group {
    cursor: pointer;
    margin-bottom: 14px;
  }
  .join-group {
    cursor: pointer;
    margin-bottom: 14px;
  }
  .user-groups {
    .groups-item {
      height:  36px;
      margin-bottom: 10px;      
      background: #ddd;
      border-radius: 6px;
      line-height: 36px;
      padding: 0 10px;
      cursor: pointer;
    }
    .active {
      background: #fff;
    }
  }
}
</style>
