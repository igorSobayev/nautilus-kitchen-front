<template>
    <header class="bg-white z-50 fixed w-screen">
        <nav class="flex justify-between items-center w-[92%] mx-auto">
            <div>
                <img class="w-64 cursor-pointer" src="./../../assets/logo.png" alt="...">
            </div>
            <div class="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[40vh] left-0 top-[-1000%] md:w-auto  w-full flex items-center px-5 z-50" :class="{ 'top-[101%]': menuOpenned }">
                <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <NuxtLink class="hover:text-gray-500" to="/">Home</NuxtLink>
                    <NuxtLink class="hover:text-gray-500" to="/">Movies</NuxtLink>
                </ul>
            </div>
            <div class="flex items-center gap-6">
                <x-button color="primary" size="sm" to="/login" icon="login"><span class="sm:block hidden">Login</span></x-button>
                <x-button color="secondary" size="sm" to="/signin" icon="register"><span class="sm:block hidden">Registrarse</span></x-button>
                <x-icon @click="onToggleMenu" class="text-3xl cursor-pointer md:hidden" :icon="menuOpenned ? 'close' : 'menu'" />
            </div>
        </nav>
    </header>
  </template>

<script setup>
    const menuOpenned = ref(false)
    const onToggleMenu = (e) => {
        menuOpenned.value = !menuOpenned.value
    }
</script>
  