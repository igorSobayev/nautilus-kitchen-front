import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import types from './types'
import { ingredients } from './../utils/shared.js'

export const useRecipeStore = defineStore('recipe', () => {
  const authStore = useAuthStore()

  const baseUrl = useRuntimeConfig().public.API_BASE_URL

  async function loadWipRecipes () {
    const user: types.User = await $fetch(`${baseUrl}/user/${authStore.user.id}`, {
      method: 'GET',
      credentials: 'include',
    })

    return user
  }

  async function createClean () {
    return $fetch(`${baseUrl}/recipes/create-clean`, {
      method: 'POST',
      body: {
        userId: authStore.user.id
      },
      credentials: 'include',
    })
  }

  async function loadRecipeData (recipeId: String) {
    return $fetch(`${baseUrl}/recipes/${recipeId}`, {
      method: 'GET',
      credentials: 'include',
    })
  } 

  return {
    ingredients,
    createClean,
    loadRecipeData,
  }
})
