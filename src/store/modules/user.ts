import { ref } from 'vue'
import { defineStore } from "pinia"
import { useTagsStore } from '@/store'
import { loginApi, getUserInfoApi } from '@/apis/core'
import { setToken, delToken } from '@/utils/auth'
import type { ILoginData } from '@/apis/core/types' 

export const useUserStore = defineStore('user', () => {
  const tagsStore = useTagsStore()
  // 用户信息
  const userInfo = ref<any>({})

  /**
   * 登录
   * @param form 表单数据 
   * @returns 
   */
  const login = (form: ILoginData) => {
    return new Promise((resolve, reject) => {
      loginApi(form).then(e => {
        setToken(`Bearer ${e.data.token}`)
        resolve(null)
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * 获取用户信息
   * @returns 
   */
  const getUserInfo = () => {
    return new Promise((resolve, reject) => {
      getUserInfoApi().then(e => {
        userInfo.value = e.data;
        resolve(null)
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * 退出登录
   */
  const logOut = () => {
    return new Promise(resolve => {
      delToken()
      tagsStore.delAllTag()
      resolve(null)
    })
  }

  return {
    userInfo,
    getUserInfo,
    login,
    logOut
  }
})
