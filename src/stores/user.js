import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref()

  function setUserInfo (user) {
    userInfo.value = user
  }

  return { userInfo, setUserInfo }
})
