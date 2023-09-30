import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import types from './types'
import { ingredients } from './../utils/shared.js'

export const useRecipeStore = defineStore('recipe', () => {
  const authStore = useAuthStore()

  const baseUrl = useRuntimeConfig().public.API_BASE_URL

  async function loadWipRecipes () {
    const userId = authStore.user.id

    const user: types.User = await $fetch(`${baseUrl}/user/${userId}`, {
      method: 'GET',
      credentials: 'include',
    })

    return user
  }

  async function createClean () {
    const userId = authStore.user.id

    return $fetch(`${baseUrl}/recipes/create-clean`, {
      method: 'POST',
      body: {
        userId: userId
      },
      credentials: 'include',
    })
  }

  async function loadRecipeData (recipeId: String): Promise<types.Recipe> {
    return $fetch(`${baseUrl}/recipes/${recipeId}`, {
      method: 'GET',
      credentials: 'include',
    })
  } 

  async function  edit (recipeData: types.EditRecipeParams) {
    const userId = authStore.user.id

    // Append the user
    recipeData.userId = userId
    console.log(recipeData)
    await $fetch(`${baseUrl}/recipes/edit/${recipeData._id}`, {
      method: 'PUT',
      body: recipeData,
      credentials: 'include',
    })
  }

  async function uploadFeaturedImage (image: FormData): Promise<types.ImgObject> {
    const userId = authStore.user.id
    
    const newImg = await $fetch(`${baseUrl}/user/upload-file/${userId}`, {
      method: 'POST',
      body: image,
      credentials: 'include',
    }) as types.ImgObject

    return newImg
  }

  return {
    ingredients,
    createClean,
    loadRecipeData,
    edit,
    uploadFeaturedImage,
  }
})
