<script setup>

import { ref, } from 'vue'
import { useUserStore } from './../../store/user'
import { onNuxtReady } from './../../.nuxt/imports'

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

onNuxtReady(async () => {
    const recipes = await userStore.followingRecipes()
    console.log(recipes)
})
</script>

<template>
    <div>
        Que cosas jeje
    </div>
</template>

