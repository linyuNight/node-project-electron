// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

export const GlobalStore = defineStore({
  id: "GlobalStore",
  state: () => {
    return {
      user: {} as any,
      groups: [],
      roomLoading: true
    }
  },
  getters: {},
  actions: {    
    setUser(data: any) {
      this.user = data
    },
    setGroups(data: any) {
      this.groups = data
    },
    setRoomLoading(status: boolean) {
      this.roomLoading = status
    }
  }
})
