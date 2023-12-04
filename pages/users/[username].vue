<script setup>
import NKUserProfileInfo from '~/components/custom/NKUserProfileInfo.vue'
import NKUserRecipes from '~/components/custom/publicComps/NKUserRecipes.vue'

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

onNuxtReady(async () => {
    
})
</script>

<template>
    <div class="flex justify-center flex-col gap-2 pt-5">
        <div class="flex justify-center flex-col pt-5">
            <NKUserProfileInfo :public="true" />
        </div>
        <div class="w-full mt-5">
            <NKUserRecipes />
        </div>
    </div>
</template>