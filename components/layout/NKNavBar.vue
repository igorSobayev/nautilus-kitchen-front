<template>
    <header class="bg-white z-50 fixed w-screen">
        <nav class="flex justify-between items-center w-[92%] mx-auto">
            <div>
                <img class="w-64 cursor-pointer" src="./../../assets/logo.png" alt="...">
            </div>
            <div class="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[40vh] left-0 top-[-1000%] md:w-auto  w-full flex items-center px-5 z-50" :class="{ 'top-[101%]': menuOpenned }">
                <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <NuxtLink class="hover:text-gray-500" to="/home">{{ $t('home') }}</NuxtLink>
                    <NuxtLink class="hover:text-gray-500" to="/recetas/favorite-recipes">{{ $t('favoriteRecipes') }}</NuxtLink>
                    <NuxtLink class="hover:text-gray-500" :to="`/profile/${authStore.user.username}`">{{ $t('myProfile') }}</NuxtLink>
                </ul>
            </div>
            <div class="flex items-center gap-2">
                <NKLang />
                <span v-if="!authStore.isLoggedIn" class="flex items-center gap-2">
                    <UButton to="/login" icon="i-material-symbols-login-sharp" size="md" color="primary" class="nbtn"><span class="sm:block hidden">{{ $t('login') }}</span></UButton>
                    <UButton to="/signup" icon="i-mingcute-fork-line" size="md" color="gray" class="nbtn"><span class="sm:block hidden">{{ $t('signup') }}</span></UButton>
                </span>
                <span v-else class="flex items-center gap-2">
                    <NKProfileNav />
                </span>
                <UIcon @click="onToggleMenu" class="text-3xl cursor-pointer md:hidden" :name="menuOpenned ? 'i-material-symbols-close' : 'i-material-symbols-menu'" />
            </div>
        </nav>
    </header>
  </template>

<script setup>
import NKProfileNav from './../custom/NKProfileNav.vue'
import NKLang from '../components/custom/NKLang.vue'
import { useAuthStore } from './../../store/auth'

const authStore = useAuthStore()

const menuOpenned = ref(false)
const onToggleMenu = (e) => {
    menuOpenned.value = !menuOpenned.value
}

// Manage login in server 
authStore.manageLoginSession()

// Manage login data on client
onMounted(() => {
  if(!process.client) return
  authStore.manageLoginSessionClient()
})
</script>
  