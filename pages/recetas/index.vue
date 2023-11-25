<script setup>

import { ref, } from 'vue'
import { useAuthStore } from './../../store/auth'
import { onNuxtReady } from './../../.nuxt/imports'

useHead({
  title: 'Recipes',
  meta: [
    {
      name: 'description',
      content: 'TODO: SEO' 
    },
  ],
})

const recetas = ref([])

const authStore = useAuthStore()

const loadRecipes = async () => {
    const url = 'http://localhost:8080/api/recipes'
    const token = authStore.token
    const { data, error } = await useFetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    recetas.value = data.value
}

onNuxtReady(() => {
    if (authStore.isLoggedIn) {
        loadRecipes()
    }
})
</script>

<template>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <div class="border rounded-md bg-white">
            <div class="w-full">
                <img class="rounded-t-md" src="https://elikaeskola.com/wp-content/uploads/me-siento-culpable-por-comer.png" />
            </div>
            <div class="border-b p-2 pt-4 pb-4 font-medium text-sm">
                Tortilla de patata con cebolla caramelizada
            </div>
            <div class="p-2 flex items-center min-h-[40px]">
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-star" /><span>4'4</span></div>
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-clock" /><span>60 min</span></div>
                <div class="flex items-center gap-1"><UIcon name="i-heroicons-chart-bar" /><span>Fácil</span></div>

            </div>
        </div>
        <div class="border rounded-md bg-white">
            <div class="w-full">
                <img class="rounded-t-md" src="https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2022/07/11/fotografia-de-una-tortilla-de-patata.jpeg" />
            </div>
            <div class="border-b p-2 pt-4 pb-4 font-medium text-sm">
                Tortilla de patata con cebolla caramelizada
            </div>
            <div class="p-2 flex items-center min-h-[40px">
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-star" /><span>4'4</span></div>
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-clock" /><span>60 min</span></div>
                <div class="flex items-center gap-1"><UIcon name="i-heroicons-chart-bar" /><span>Fácil</span></div>

            </div>
        </div>
       <div class="border rounded-md bg-white">
            <div class="w-full">
                <img class="rounded-t-md" src="https://elikaeskola.com/wp-content/uploads/me-siento-culpable-por-comer.png" />
            </div>
            <div class="border-b p-2 pt-4 pb-4 font-medium text-sm">
                Tortilla de patata con cebolla caramelizada
            </div>
            <div class="p-2 flex items-center">
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-star" /><span>4'4</span></div>
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-clock" /><span>60 min</span></div>
                <div class="flex items-center gap-1"><UIcon name="i-heroicons-chart-bar" /><span>Fácil</span></div>

            </div>
        </div>
        <div class="border rounded-md bg-white">
            <div class="w-full">
                <img class="rounded-t-md" src="https://elikaeskola.com/wp-content/uploads/me-siento-culpable-por-comer.png" />
            </div>
            <div class="border-b p-2 pt-4 pb-4 font-medium text-sm">
                Tortilla de patata con cebolla caramelizada
            </div>
            <div class="p-2 flex items-center">
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-star" /><span>4'4</span></div>
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-clock" /><span>60 min</span></div>
                <div class="flex items-center gap-1"><UIcon name="i-heroicons-chart-bar" /><span>Fácil</span></div>

            </div>
        </div>
        <div class="border rounded-md bg-white">
            <div class="w-full">
                <img class="rounded-t-md" src="https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2022/07/11/fotografia-de-una-tortilla-de-patata.jpeg" />
            </div>
            <div class="border-b p-2 pt-4 pb-4 font-medium text-sm">
                Tortilla de patata con cebolla caramelizada
            </div>
            <div class="p-2 flex items-center">
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-star" /><span>4'4</span></div>
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-clock" /><span>60 min</span></div>
                <div class="flex items-center gap-1"><UIcon name="i-heroicons-chart-bar" /><span>Fácil</span></div>

            </div>
        </div>
        <div class="border rounded-md bg-white">
            <div class="w-full">
                <img class="rounded-t-md" src="https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2022/07/11/fotografia-de-una-tortilla-de-patata.jpeg" />
            </div>
            <div class="border-b p-2 pt-4 pb-4 font-medium text-sm">
                Tortilla de patata con cebolla caramelizada
            </div>
            <div class="p-2 flex items-center">
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-star" /><span>4'4</span></div>
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-clock" /><span>60 min</span></div>
                <div class="flex items-center gap-1"><UIcon name="i-heroicons-chart-bar" /><span>Fácil</span></div>

            </div>
        </div>
        <div class="border rounded-md bg-white">
            <div class="w-full">
                <img class="rounded-t-md" src="https://elikaeskola.com/wp-content/uploads/me-siento-culpable-por-comer.png" />
            </div>
            <div class="border-b p-2 pt-4 pb-4 font-medium text-sm">
                Tortilla de patata con cebolla caramelizada
            </div>
            <div class="p-2 flex items-center">
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-star" /><span>4'4</span></div>
                <div class="flex items-center gap-1 mr-3"><UIcon name="i-heroicons-clock" /><span>60 min</span></div>
                <div class="flex items-center gap-1"><UIcon name="i-heroicons-chart-bar" /><span>Fácil</span></div>

            </div>
        </div>
    </div>
</template>

