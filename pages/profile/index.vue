<script setup>
import { useUserStore } from '../../store/user'
import { useRecipeStore } from '../../store/recipe'

const items = [
    {
        label: 'Recetas en curso',
        key: 'recipes-wip',
        icon: 'i-heroicons-queue-list',
    },
    {
        label: 'Recetas publicas',
        key: 'recipes-published',
        icon: 'i-heroicons-queue-list',
    },
    {
        label: 'Comentarios',
        key: 'comments',
        icon: 'i-heroicons-chat-bubble-left-right',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam itaque animi impedit nemo obcaecati! Labore esse et cum impedit voluptas quos, molestias perferendis magnam molestiae id! Adipisci a natus sed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam itaque animi impedit nemo obcaecati! Labore esse et cum impedit voluptas quos, molestias perferendis magnam molestiae id! Adipisci a natus sed.'
    }
]

const optionsUnpublishedItems = [
[
    {
        label: 'Edit Recipe',
        action: 'editRecipe',
        icon: 'i-heroicons-pencil-square',
    },
    {
        label: 'Preview Recipe',
        action: 'previewRecipe',
        icon: 'i-heroicons-eye',
    },
    {
        label: 'Publish Recipe',
        action: 'publishRecipe',
        icon: 'i-heroicons-arrow-up-on-square-stack',
    },
    {
        label: 'Delete Recipe',
        action: 'deleteRecipe',
        icon: 'i-heroicons-archive-box-x-mark',
    },
]
]

const optionsPublishedItems = [
[
    {
        label: 'Edit Recipe',
        action: 'editRecipe',
        icon: 'i-heroicons-pencil-square',
    },
    {
        label: 'Preview Recipe',
        action: 'previewRecipe',
        icon: 'i-heroicons-eye',
    },
    {
        label: 'Unpublish Recipe',
        action: 'unpublishRecipe',
        icon: 'i-heroicons-arrow-down-on-square-stack',
    },
    {
        label: 'Delete Recipe',
        action: 'deleteRecipe',
        icon: 'i-heroicons-archive-box-x-mark',
    },
]
]

const userStore = useUserStore()
const recipeStore = useRecipeStore()
const toast = useToast()
const router = useRouter()

const recipes = ref([])
const publishedRecipes = ref([])


async function loadRecipesData () {
    recipes.value = await userStore.loadUserWipRecipes()
    publishedRecipes.value = await userStore.loadUserPublishedRecipes()
}

async function handleOptionsClick (action, recipeId) {
    switch(action) {
        case 'editRecipe':
            return editRecipe(recipeId)
        case 'previewRecipe': 
            return previewRecipe(recipeId)
        case 'publishRecipe': 
            return publishRecipe(recipeId)
        case 'unpublishRecipe': 
            return unpublishRecipe(recipeId)
        case 'deleteRecipe': 
            return deleteRecipe(recipeId)
        default:
            break
    }
}
async function previewRecipe (recipeId) {
    console.log("previewRecipe", recipeId)
}

function editRecipe (recipeId) {
    router.push(`/recetas/edit/${recipeId}`)
}

async function publishRecipe (recipeId) {
    await recipeStore.publishRecipe(recipeId)
    await loadRecipesData()
    toast.add({ title: '¡Receta publicada!' })
}

async function unpublishRecipe (recipeId) {
    await recipeStore.unpublishRecipe(recipeId)
    await loadRecipesData()
    toast.add({ title: '¡Receta despublicada!' })
}

async function deleteRecipe (recipeId) {
    await recipeStore.deleteRecipe(recipeId)
    await loadRecipesData()
    toast.add({ title: '¡Receta eliminada!' })
}

onNuxtReady(async () => {
    await loadRecipesData()
})
</script>

<template>
    <div class="flex justify-center flex-col gap-5 pt-5">
        <!-- Rectangulo con info del user -->
        <div class="bg-white grid grid-cols-1  xl:grid-cols-3 w-full h-auto py-14 px-6">
            <div class="flex justify-center align-center">
                <img src="https://i2-prod.dailyrecord.co.uk/incoming/article8543359.ece/ALTERNATES/s1200c/CP47009989.jpg" class="rounded-full max-h-64" />
            </div>
            <div class="flex flex-col gap-4 xl:border-r border-[#e5e7eb]">
                <h2 class="text-4xl mb-4">Gordom Ramsay</h2>
                <div class="flex items-center gap-3"><span class="">Recetas</span> <UBadge color="primary" variant="solid" label="33" /></div>
                <div>Valoracón media: <span class="font-bold">4/5</span></div>
                <div>Activo desde: <span class="font-bold">2 de septiembre del 2023</span></div>
            </div>
            <div class="flex border-t border-[#e5e7eb] xl:border-t-0 xl:m5-0 xl:pt-0 xl:pl-5 mt-6 pt-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam itaque animi impedit nemo obcaecati! Labore esse et cum impedit voluptas quos, molestias perferendis magnam molestiae id! Adipisci a natus sed.
            </div>
        </div>
        <!-- Tabs con otras partes interesantes de momento recetas y comentarios destacados -->
        <UTabs :items="items" class="w-full mt-5">
            <template #default="{ item, index, selected }">
                <div class="flex items-center gap-2 relative truncate">
                    <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
                    <span class="truncate">{{ index + 1 }}. {{ item.label }}</span>
                    <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                </div>
            </template>
            <template #item="{ item }">
                <div v-if="item.key === 'recipes-published'">
                    <div v-for="recipe in publishedRecipes" :key="recipe._id" class="flex flex-col w-full bg-white p-2 gap-2">
                        <div class="w-full grid grid-cols-4 min-h-24 p-2 items-center border border-gray">
                            <div class="flex justify-center"><img :src="recipe.featuredImg" class="rounded-md max-h-16" /></div>
                            <div class="flex justify-center">{{ recipe.title ?? '-'  }}</div>
                            <div class="flex justify-center"><NuxtRating :read-only="true" :ratingValue="recipe.rating ?? 0" /></div>
                            <div class="flex justify-center">
                                <UDropdown :items="optionsPublishedItems" :popper="{ placement: 'bottom-start' }">
                                    <UButton color="white" class="ml-2" trailing-icon="i-heroicons-chevron-down-20-solid" />

                                    <template #item="{ item }">
                                        <div class="flex justify-between w-full" @click="handleOptionsClick(item.action, recipe._id)">
                                            <span class="truncate">{{ item.label }}</span>
                                            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                                        </div>
                                    </template>
                                </UDropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="item.key === 'recipes-wip'">
                    <div v-for="recipe in recipes" :key="recipe._id" class="flex flex-col w-full bg-white p-2 gap-2">
                        <div class="w-full grid grid-cols-4 min-h-24 p-2 items-center rounded-sm border border-gray">
                            <div class="flex justify-center"><img :src="recipe.featuredImg" class="rounded-md max-h-16" /></div>
                            <div class="flex justify-center">{{ recipe.title ?? '-'  }}</div>
                            <div class="flex justify-center">
                                <NuxtRating :read-only="true" ratingContent="🍴" activeColor="#6366f1" :ratingValue="recipe.difficulty ?? 0" />
                            </div>
                            <div class="flex justify-center">
                                <UDropdown :items="optionsUnpublishedItems" :popper="{ placement: 'bottom-start' }">
                                    <UButton color="white" class="ml-2" trailing-icon="i-heroicons-chevron-down-20-solid" />

                                    <template #item="{ item }">
                                        <div class="flex justify-between w-full" @click="handleOptionsClick(item.action, recipe._id)">
                                            <span class="truncate">{{ item.label }}</span>
                                            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                                        </div>
                                    </template>
                                </UDropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </UTabs>
    </div>
</template>