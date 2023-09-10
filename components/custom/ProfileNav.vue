<script setup lang="ts">
import { useAuthStore } from './../../store/auth'
import { useUserStore } from '../../store/user';

const authStore = useAuthStore()
const userStore = useUserStore()
const userMail = ref('')
const userAvatar = ref('')
const user = ref()

const items = ref([
  [
    {
      label: userMail,
      slot: 'account',
      disabled: true
    }
  ],
  [
    {
      label: 'Configuración',
      icon: 'i-heroicons-cog-8-tooth',
      link: '/recetas'
    },
  ],
  [
    {
      label: 'Mi perfil',
      icon: 'i-heroicons-user',
      link: '/profile'
    },
    {
      label: 'Mis recetas',
      icon: 'i-heroicons-book-open',
      link: '/recetas'
    },
    {
      label: 'Crear receta',
      icon: 'i-heroicons-folder-plus',
      link: '/recetas/crear-receta'
    }
  ],
  [
    {
      label: 'Desconectar',
      slot: 'logout',
      icon: 'i-heroicons-arrow-left-on-rectangle'
    }
  ]
])

const logout = () => {
    authStore.logout()
}

onNuxtReady(async () => {
    user.value = await userStore.loadUserData()

    userMail.value = user.value.email
    userAvatar.value = user.value.avatar
})
</script>

<template>
  <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UAvatar v-if="userAvatar" :src="userAvatar" />
    <UAvatar v-else src="https://i2-prod.dailyrecord.co.uk/incoming/article8543359.ece/ALTERNATES/s1200c/CP47009989.jpg" />

    <template #account="{ item }">
      <div class="text-left">
        <p>
          Iniciado como
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
        <NuxtLink :to="item.link" class="flex justify-between w-full">
            <span class="truncate">{{ item.label }}</span>

            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </NuxtLink>
    </template>

    <template #logout="{ item }">
        <div @click="logout" class="w-full flex justify-between">
            <span class="truncate">{{ item.label }}</span>
            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </div>
    </template>
  </UDropdown>
</template>
