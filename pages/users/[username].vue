<script setup>
import NKUserProfileInfo from '~/components/custom/NKUserProfileInfo.vue'
import NKUserRecipes from '~/components/custom/publicComps/NKUserRecipes.vue'
import { useUserStore } from '~/store/user'

const route = useRoute()

useHead({
  title: route.params.username + '  page',
  meta: [
    {
      name: 'description',
      content: 'TODO: SEO' 
    },
  ],
})

const userStore = useUserStore()

onNuxtReady(async () => {
    
})
</script>

<template>
    <div class="flex justify-center flex-col gap-5 pt-5">
        <div class="flex justify-center flex-col gap-5 pt-5">
            <NKUserProfileInfo />
        </div>
        <div class="w-full mt-5">
            <NKUserRecipes />
        </div>
    </div>
</template>