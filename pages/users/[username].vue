<script setup>
import NKUserProfileInfo from '~/components/custom/NKUserProfileInfo.vue'
import NKUserRecipes from '~/components/custom/publicComps/NKUserRecipes.vue'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()

const publishedRecipes = ref([])

onNuxtReady(async () => {
    publishedRecipes.value = await userStore.loadUserPublishedRecipes()
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