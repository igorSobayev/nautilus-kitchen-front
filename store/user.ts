import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import types from './types'

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()

  const baseUrl = useRuntimeConfig().public.API_BASE_URL

  async function loadUserData (): Promise<types.User> {
    const user: types.User = await $fetch(`${baseUrl}/user/${authStore.user.id}`, {
      method: 'GET',
      credentials: 'include',
    })

    return user
  }

  async function  edit (userData: types.EditUserParams) {
    let avatarUpdated

    if (userData.newAvatar) {
      avatarUpdated = await uploadAvatarImg(userData.newAvatar, userData.id)

      userData.avatar = avatarUpdated.uploadedImage.Location
    }

    await $fetch(`${baseUrl}/user/edit/${userData.id}`, {
      method: 'PUT',
      body: userData,
      credentials: 'include',
    })
  }

  async function uploadAvatarImg (userImg: FormData, userId: string): Promise<types.ImgObject> {
    const newImg = await $fetch(`${baseUrl}/user/upload-file/${userId}`, {
      method: 'POST',
      body: userImg,
      credentials: 'include',
    }) as types.ImgObject

    return newImg
  }


  return {
    loadUserData,
    edit,
  }
})
