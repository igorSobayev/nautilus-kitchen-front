<script setup>

import { ref } from 'vue'
import { useUserStore } from './../../store/user'
import { onNuxtReady } from './../../.nuxt/imports'
import NKHomeRecipe from '~/components/custom/NKHomeRecipe.vue'

useHead({
  title: 'Home pibe',
  meta: [
    {
      name: 'description',
      content: 'TODO: SEO' 
    },
  ],
})

const userStore = useUserStore()
const recipes = ref([])

onNuxtReady(async () => {
  recipes.value = await userStore.followingRecipes()
  console.log(recipes)
})
</script>

<template>
    <div class="flex flex-col h-dvh xl:w-1/4 bg-white border-r border-b border-l">
        <div class="border-t px-5 py-3 text-xl">
          Últimas recetas
        </div>
        <div class="border-t border-b px-5">
          <!-- Recipe -->
          <div v-for="recipe in recipes" :key="recipe._id">
            <NKHomeRecipe :recipe="recipe" />
          </div>
        </div>
    </div>
</template>

