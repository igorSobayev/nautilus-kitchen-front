<script setup>
import NKUserProfileInfo from '~/components/custom/NKUserProfileInfo.vue'
import NKUserRecipes from '~/components/custom/publicComps/NKUserRecipes.vue'
import { useAuthStore } from '~/store/auth';
import { useUserStore } from '~/store/user'

const route = useRoute()
const toast = useToast()

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

const followUser = async () => {
  const username = route.params.username
  await userStore.followUser(username)
    .then(() => {
      toast.add({ title: `¡Has seguido a ${username}!` })
    })
}

onNuxtReady(async () => {
    
})
</script>

<template>
    <div class="flex justify-center flex-col gap-2 pt-5">
        <div class="flex justify-end">
          <UButton label="Follow user" icon="i-heroicons-user-plus" @click="followUser" size="sm" color="primary" square />
        </div>
        <div class="flex justify-center flex-col pt-5">
            <NKUserProfileInfo />
        </div>
        <div class="w-full mt-5">
            <NKUserRecipes />
        </div>
    </div>
</template>