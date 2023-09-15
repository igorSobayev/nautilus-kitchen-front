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
                    <NuxtLink class="hover:text-gray-500" @click="addRecipe">Crear recetas</NuxtLink>
                </ul>
            </div>
            <div class="flex items-center gap-6">
                <span v-if="!authStore.isLoggedIn" class="flex items-center gap-6">
                    <UButton to="/login" icon="i-material-symbols-login-sharp" size="md" color="primary" class="nbtn"><span class="sm:block hidden">Login</span></UButton>
                    <UButton to="/signup" icon="i-mingcute-fork-line" size="md" color="gray" class="nbtn"><span class="sm:block hidden">Registrarse</span></UButton>
                </span>
                <span v-else class="flex items-center gap-6">
                    <ProfileNav />
                </span>
                <UIcon @click="onToggleMenu" class="text-3xl cursor-pointer md:hidden" :name="menuOpenned ? 'i-material-symbols-close' : 'i-material-symbols-menu'" />
            </div>
        </nav>
    </header>
  </template>

<script setup>
import ProfileNav from './../custom/ProfileNav.vue'
import { useAuthStore } from './../../store/auth'
import { useRecipeStore } from '~/store/recipe'

const router = useRouter()
const recipeStore = useRecipeStore()
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

// Recipe management
// On click to add new recipe, we create one clean in the backend and push the route to edit it, doing this we can
// edit the recipe all the time
async function addRecipe () {
    const newRecipe = await recipeStore.createClean()
    router.push(`/recetas/edit/${newRecipe._id}`)
}
</script>
  