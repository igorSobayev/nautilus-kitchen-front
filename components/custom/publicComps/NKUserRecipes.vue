<script setup lang="ts">
import { Recipe } from '../../../store/types'
import { useUserStore } from './../../../store/user'
import { onNuxtReady, ref, useRoute } from '../../../.nuxt/imports'

const userStore = useUserStore()
const route = useRoute()
const recipes = ref([] as Recipe[])

onNuxtReady(async () => {
  const username = route.params.username as string
  recipes.value = await userStore.loadPublicUserRecipes(username) as Recipe[]
})
</script>

<template>
  <div v-for="recipe in recipes" :key="recipe._id" class="flex flex-col w-full bg-white p-2 gap-2">
      <div class="w-full grid grid-cols-4 min-h-24 p-2 items-center border border-gray">
          <div class="flex justify-center"><img :src="recipe.featuredImg" class="rounded-md max-h-16" /></div>
          <div class="flex justify-center">{{ recipe.title ?? '-'  }}</div>
          <div class="flex justify-center"><NuxtRating :read-only="true" :ratingValue="recipe.rating ?? 0" /></div>
      </div>
  </div>
</template>
