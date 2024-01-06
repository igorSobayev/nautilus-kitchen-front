<script setup>

import { ref } from 'vue'
import { useUserStore } from './../../store/user'
import { onNuxtReady } from './../../.nuxt/imports'
import NKHomeRecipe from '~/components/custom/NKHomeRecipe.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userStore = useUserStore()

useHead({
  title: t('home'),
  meta: [
    {
      name: 'description',
      content: 'TODO: SEO' 
    },
  ],
})

const recipes = ref([])

onNuxtReady(async () => {
  recipes.value = await userStore.followingRecipes()
  console.log(recipes)
})
</script>

<template>
    <div class="flex justify-center">
      <div class="flex flex-col xl:w-2/4 bg-white border-r border-b border-l">
          <div class="border-t border-b px-5 py-3 text-xl">
            {{ $t('lastRecipes') }}
          </div>
          <div class="pb-5">
            <!-- Recipe -->
            <div v-for="recipe in recipes" :key="recipe._id">
              <NKHomeRecipe :recipe="recipe" />
            </div>
            <div v-if="!recipes.length" class="h-80 flex justify-center align-center items-center px-5">
              Vaya, parece que ninguno de tus seguidores ha publicado nada todavía. ¡Da ejemplo publicando algo!
            </div>
          </div>
      </div>
    </div>
</template>

