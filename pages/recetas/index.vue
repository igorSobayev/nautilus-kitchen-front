<script setup>

import { ref, } from 'vue'
import { useAuthStore } from './../../store/auth'
import { onMounted } from './../../.nuxt/imports'

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

onMounted(() => {
    setTimeout(() => {
        loadRecipes()
    }, 1000)
})
</script>

<template>
    <div class="">
        Recetitas
        <button @click="loadRecipes">asd</button>
        <div v-for="receta in recetas">
            {{ receta.title }}
        </div>
    </div>
</template>

