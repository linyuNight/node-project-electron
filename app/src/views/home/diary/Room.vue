<template>
  <div class="room">
    <div class="message-list" ref="messageListRef">
      <div
        v-for="(item, index) in messages"
        :key="index"
        class="message-item"
      >
        <div class="user-image"></div>
        <div class="user-content">
          <div class="user-name">{{ item.username }}</div>
          <div class="user-message">
            <div class="triangle"></div>
            <span>{{ item.message }}</span>
          </div>
          <Delete
            class="delete-btn"
            @click="handlerDeleteMessage(item.id)"
          />
        </div>
      </div>
    </div>
    <div class="send-content">
      <el-input class="message-input" v-model="newMessage" placeholder="请输入消息..." @keydown.enter="sendMessage" />
      <el-button class="send-btn" type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
// import { useStore } from 'vuex'
import { GlobalStore } from "@/stores";
import { io } from 'socket.io-client'
import { baseUrl } from '@/config/index'
import {
  queryGroup
  // deleteGroupMessage
} from '@/api/index.js'

// const store = useStore()
const globalStore: any = GlobalStore();

const route = useRoute()

const groupname = computed(() => {
  // console.log('测试store', store.state.groups.find(val => {
  //   return val.id === route.params.id
  // }))
  return globalStore.groups.find((val: any) => {
    return val.id === route.params.id
  })?.groupname ?? ''
  // return 'aaa'
})

let socket: any = null
// 发送的新消息
const newMessage = ref('')
// 消息列表
const messages = ref([
  // {
  //   message: '123123123123123',
  //   username: '1231231'
  // },
  // {
  //   message: '1231231231231',
  //   username: '123123'
  // }
  // {
  //   message:"123",
  //   username:"123"
  // },
  // {
  //   message:"123",
  //   username:"123"
  // },
  // {
  //   message:"123",
  //   username:"123"
  // },
  // {
  //   message:"123",
  //   username:"123"
  // },
  // {
  //   message:"123",
  //   username:"123"
  // },
  // {
  //   message:"123",
  //   username:"123"
  // },
  // {
  //   message:"123",
  //   username:"123"
  // },
  // {
  //   message:"123",
  //   username:"123"
  // },
  // {
  //   message:"123",
  //   username:"123"
  // },
  // {
  //   message:"123",
  //   username:"123"
  // }
] as any)

// 加入群
const joinGroup = (groupname: any) => {
  socket.emit('joinGroup', groupname)
}

// 发送消息
const sendMessage = () => {
  if (newMessage.value) {
    // const message = {
    //   from: user.value,
    //   content: newMessage.value,
    // };

    // console.log('测试message', message)
    // 发送消息给服务器
    socket.emit('message', {
      username: globalStore.user.username,
      userid: globalStore.user.userid,
      message: newMessage.value,
      groupname: groupname.value
    })

    // 清空输入框
    newMessage.value = ''

    getMessages()
  }
}

// 删除消息
const handlerDeleteMessage = (id: any) => {
  ElMessageBox.confirm('删除该聊天记录', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(() => {
      // deleteGroupMessage({
      //   groupname: groupname.value,
      //   id: id
      // }).then(res => {
      //   console.log('测试删除', res)
      //   getMessages()
      // })
      socket.emit('delete_message', {
        groupname: groupname.value,
        id: id
      })
    })
    .catch(() => {})
}

// 获取group信息
const getMessages = () => {
  queryGroup({
    groupname: groupname.value
  }).then((res: any) => {
    console.log('测试群信息', res)
    if (res && res.messages) {
      messages.value = res.messages
    }
  })
}

onMounted(() => {
  // 获取group信息
  getMessages()

  socket = io(baseUrl, {
    auth: {
      token: localStorage.getItem('token')
    }
  })

  socket.on('connect', () => {
    console.log(socket.connected) // true
  })

  joinGroup(groupname.value)

  socket.on('message', (data: any) => {
    console.log('测试返回消息', data)
    messages.value.push({
      username: data.username,
      message: data.message,
      id: data.id
    })
  })

  socket.on('delete_message', (data: any) => {
    console.log('测试返回数据', data)
    if (data && data.id) {
      messages.value = messages.value.filter((val: any) => {
        return val.id !== data.id
      })
    }
  })
})

onBeforeUnmount(() => {
  socket.disconnect()
})
</script>

<style lang="less">
.room {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 30px;
  .message-list {
    flex: 1;
    // max-height: 400px;
    overflow: auto;
    .message-item {
      display: flex;
      margin-bottom: 20px;
      .user-image {
        width: 40px;
        height: 40px;
        background: #fcc;
        border-radius: 100px;
        margin-right: 10px;
        margin-top: 4px;
      }
      .user-content {
        .user-name {
          margin-bottom: 4px;
        }
        .user-message {
          position: relative;
          display: inline-block;
          background: #fff;
          padding: 6px 14px;
          border-radius: 8px;
          margin-left: 10px;
          .triangle {
            position: absolute;
            left: -8px;
            top: 8px;
            width: 0;
            height: 0;
            border-right: 8px solid #fff;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
          }
        }
        .delete-btn {
          position: relative;
          top: 2px;
          width: 18px;
          color: #555;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .send-content {
    .message-input {
      width: 400px;
    }
    ::v-deep {
      .el-input__wrapper {
        border-radius: 6px 0 0 6px;
      }
    }
    .send-btn {
      border-radius: 0 6px 6px 0;
    }
  }
}
</style>
