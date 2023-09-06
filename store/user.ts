import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

interface user {
  username: string
  email: string
  avatar: string
  name: string
  surname: string
  description: string
  id: string
}

interface editUserParams {
  name: string
  surname: string
  description: string
  id: string
}

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()

  const baseUrl = useRuntimeConfig().public.API_BASE_URL

  async function loadUserData (): Promise<user> {
    const user: user = await $fetch(`${baseUrl}/user/${authStore.user.id}`, {
      method: 'GET',
      credentials: 'include',
    })

    return user
  }

  async function  edit (userData: editUserParams) {
    await $fetch(`${baseUrl}/user/edit/${userData.id}`, {
      method: 'PUT',
      body: userData,
      credentials: 'include',
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => { throw error })
  }


  return {
    loadUserData,
    edit,
  }
})
