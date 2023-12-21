<script setup>
import { useRecipeStore } from '../../store/recipe'

const recipeStore = useRecipeStore()

async function addRecipe () {
    await recipeStore.addRecipe()
}
</script>

<template>
    <div class="w-12 h-12 bg-primary-600 rounded-full absolute bottom-24 right-24 flex justify-center align-center items-center cursor-pointer hover:bg-gray-600" @click="addRecipe" :title="$t('addNewRecipe')">
        <UIcon name="i-heroicons-plus" class="text-white h-8 w-8" />
    </div>
</template>
  