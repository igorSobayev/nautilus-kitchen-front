import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import types from './types'

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()

  const baseUrl = useRuntimeConfig().public.API_BASE_URL

  async function loadUserData (): Promise<types.User | unknown> {
    const user: types.User | unknown = await $fetch(`${baseUrl}/user/${authStore.user.id}`, {
      method: 'GET',
      credentials: 'include',
    }).catch(async () => {
      await authStore.redirectLogin()
    })

    return user
  }

  async function loadUserRecipes (): Promise<types.Recipe[] | unknown> {
    const userRecipes: types.Recipe[] | unknown = await $fetch(`${baseUrl}/user/all-recipes/${authStore.user.id}`, {
      method: 'GET',
      credentials: 'include',
    })

    return userRecipes
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

  async function deleteFiles (filesRoutes: string[]): Promise<void> {
    const userId = authStore.user.id

    await $fetch(`${baseUrl}/user/delete-files/${userId}`, {
      method: 'POST',
      body: { filesRoutes },
      credentials: 'include',
    })
  }


  return {
    loadUserData,
    edit,
    deleteFiles,
    loadUserRecipes,
  }
})
