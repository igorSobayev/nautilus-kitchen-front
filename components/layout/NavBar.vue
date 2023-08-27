<template>
    <header class="bg-white z-50 fixed w-screen">
        <nav class="flex justify-between items-center w-[92%] mx-auto">
            <div>
                <img class="w-64 cursor-pointer" src="./../../assets/logo.png" alt="...">
            </div>
            <div class="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[40vh] left-0 top-[-1000%] md:w-auto  w-full flex items-center px-5 z-50" :class="{ 'top-[101%]': menuOpenned }">
                <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <NuxtLink class="hover:text-gray-500" to="/">Home</NuxtLink>
                    <NuxtLink class="hover:text-gray-500" to="/recetas">Recetas</NuxtLink>
                    <NuxtLink class="hover:text-gray-500" to="/recetas/crear-receta">Crear recetas</NuxtLink>
                </ul>
            </div>
            <div class="flex items-center gap-6">
                <x-button color="primary" v-if="authStore.isLoggedIn" size="sm" @click="logout" icon="broken"><span class="sm:block hidden">Logout</span></x-button>
                <x-button color="primary" v-else size="sm" to="/login" icon="login"><span class="sm:block hidden">Login</span></x-button>
                <x-button color="secondary" size="sm" to="/signup" icon="register"><span class="sm:block hidden">Registrarse</span></x-button>
                <x-icon @click="onToggleMenu" class="text-3xl cursor-pointer md:hidden" :icon="menuOpenned ? 'close' : 'menu'" />
            </div>
        </nav>
    </header>
  </template>

<script setup>
import { useAuthStore } from './../../store/auth'
import { onMounted } from './../../.nuxt/imports'

const menuOpenned = ref(false)
const onToggleMenu = (e) => {
    menuOpenned.value = !menuOpenned.value
}

const authStore = useAuthStore()

const logout = () => {
    authStore.logout()
}


onMounted(() => {
  if(!process.client) return

  const savedData = localStorage.getItem('user')
  const token = localStorage.getItem('token')

  if(token && savedData) {
    authStore.user = savedData
    authStore.token = token
    authStore.isLoggedIn = !!savedData
  }
})
</script>
  