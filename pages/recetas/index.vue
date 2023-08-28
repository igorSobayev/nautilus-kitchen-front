<script setup>

import { ref, } from 'vue'
import { useAuthStore } from './../../store/auth'
import { onMounted, onNuxtReady } from './../../.nuxt/imports'
// import { onNuxtReady } from 'nuxt'
// import { onNuxtReady } from nuxt

const recetas = ref([])

const authStore = useAuthStore()

const loadRecipes = async () => {
    const url = 'http://localhost:8080/api/recipes'
    const token = authStore.token
    const { data, error } = await useFetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    })
    recetas.value = data.value
}

onNuxtReady(() => {
    // setTimeout(() => {
        loadRecipes()
    // }, 1000)
})
</script>

<template>
    <div class="">
        Recetitas
        <button @click="loadRecipes" class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Save changes
        </button>
        <div v-for="receta in recetas">
            {{ receta.title }}
        </div>
    </div>
</template>

