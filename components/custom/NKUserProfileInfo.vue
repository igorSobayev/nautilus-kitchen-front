<script setup>
import { useUserStore } from '../../store/user'
import { onNuxtReady, ref, useRoute } from '../../.nuxt/imports'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/store/auth';

const { t } = useI18n()
const toast = useToast()
const userStore = useUserStore()
const authStore = useAuthStore()
const route = useRoute()
const user = ref({})
const userCreationDate = ref('')
const username = ref('')
const sameUser = ref(false)

const props = defineProps({
  public: Boolean,
})

const followUser = async () => {
  await userStore.followUser(username.value)
  await updateUser()
  toast.add({ title: `${t('youFollowed')} ${username.value}!` })
}

const unfollowUser = async () => {
  await userStore.unfollowUser(username.value)
  await updateUser()
  toast.add({ title: `${t('youUnfollowed')} ${username.value}!` })
}

const updateUser = async () => {
  user.value = await userStore.loadPublicUserData(username.value)
}

onNuxtReady(async () => {
  username.value = route.params.username

  await updateUser()

  // Enable or disable follow button looking if the public page is from the logged user
  if (username.value === authStore.user.username) {
    sameUser.value = true
  }

  const date = new Date(user.value.creationDate)
  userCreationDate.value = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
})

defineExpose({
  updateUser,
})
</script>

<template>
  <div class="bg-white w-full h-auto pt-8 pb-14 px-6">
    <div class="flex justify-end" v-if="public && !sameUser">
      <UButton v-if="!user.isFollowing" :label="$t('follow')" icon="i-heroicons-user-plus" @click="followUser" size="sm" color="primary" square />
      <UButton v-else :label="$t('unfollow')" icon="i-heroicons-user-minus" @click="unfollowUser" size="sm" color="primary" square />
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-3 mt-5">
        <div class="flex justify-center align-center">
            <div :style="'background-image: url(' + user.avatar + ');'" class="bg-cover bg-center bg-no-repeat rounded-full h-64 w-64"></div>
        </div>
        <div class="flex flex-col gap-4 xl:border-r border-[#e5e7eb]">
            <h2 class="text-4xl mb-4">{{ user.username }}</h2>
            <div class="flex items-center gap-3"><span class="">{{ $t('recipes') }}</span> <UBadge color="primary" variant="solid" :label="user.recipesNumber ?? 0" /></div>
            <div class="flex items-center gap-3"><NuxtRating :read-only="true" :ratingValue="user.avgRating ?? 0" /></div>
            <div>{{ $t('activeSince') }} <span class="font-bold">{{ userCreationDate }}</span></div>
        </div>
        <div class="flex border-t border-[#e5e7eb] xl:border-t-0 xl:m5-0 xl:pt-0 xl:pl-5 mt-6 pt-6">{{ user.description }}</div>
    </div>
  </div>
</template>
