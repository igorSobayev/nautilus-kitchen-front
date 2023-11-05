<script setup lang="ts">
import { User } from '../../store/types'
import { useUserStore } from '../../store/user'

const userStore = useUserStore()
const user = ref({} as User)
const userCreationDate = ref('')

onNuxtReady(async () => {
  user.value = await userStore.loadUserData() as User // TODO use other userData
  const date = new Date(user.value.creationDate)
  userCreationDate.value = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
})
</script>

<template>
  <div class="bg-white grid grid-cols-1  xl:grid-cols-3 w-full h-auto py-14 px-6">
      <div class="flex justify-center align-center">
          <div :style="'background-image: url(' + user.avatar + ');'" class="bg-cover bg-center bg-no-repeat rounded-full h-64 w-64"></div>
      </div>
      <div class="flex flex-col gap-4 xl:border-r border-[#e5e7eb]">
          <h2 class="text-4xl mb-4">{{ user.name }}</h2>
          <div class="flex items-center gap-3"><span class="">Recetas</span> <UBadge color="primary" variant="solid" :label="user.recipesNumber ?? 0" /></div>
          <div class="flex items-center gap-3">Valoracón media <NuxtRating :read-only="true" :ratingValue="user.avgRating ?? 0" /></div>
          <div>Activo desde <span class="font-bold">{{ userCreationDate }}</span></div>
      </div>
      <div class="flex border-t border-[#e5e7eb] xl:border-t-0 xl:m5-0 xl:pt-0 xl:pl-5 mt-6 pt-6">{{ user.description }}</div>
  </div>
</template>
