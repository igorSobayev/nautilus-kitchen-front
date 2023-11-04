<script setup>
import { useUserStore } from '../../store/user'
import NKRecipesOptionsDropdown from '~/components/custom/NKRecipesOptionsDropdown.vue'
import NKUserProfileInfo from '~/components/custom/NKUserProfileInfo.vue'

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

const userStore = useUserStore()

const recipes = ref([])
const publishedRecipes = ref([])

async function loadRecipesData () {
    recipes.value = await userStore.loadUserWipRecipes()
    publishedRecipes.value = await userStore.loadUserPublishedRecipes()
}

onNuxtReady(async () => {
    await loadRecipesData()
})
</script>

<template>
    <div class="flex justify-center flex-col gap-5 pt-5">
        <!-- Rectangulo con info del user -->
        <NKUserProfileInfo />
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
                                <NKRecipesOptionsDropdown :published-options="true" :recipe-id="recipe._id" @action-done="loadRecipesData" />
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
                                <NKRecipesOptionsDropdown :published-options="false" :recipe-id="recipe._id" @action-done="loadRecipesData" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </UTabs>
    </div>
</template>