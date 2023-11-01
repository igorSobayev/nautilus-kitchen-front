<script setup>
import { useRecipeStore } from '../../store/recipe';

const props = defineProps({
    recipeId: String,
    publishedOptions: Boolean
})

const emit = defineEmits(['actionDone'])

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

const recipeStore = useRecipeStore()
const toast = useToast()
const router = useRouter()

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
    console.log("previewRecipe", recipeId) // TODO
}

function editRecipe (recipeId) {
    router.push(`/recetas/edit/${recipeId}`)
}

async function publishRecipe (recipeId) {
    await recipeStore.publishRecipe(recipeId)
    emit('actionDone')
    toast.add({ title: '¡Receta publicada!' })
}

async function unpublishRecipe (recipeId) {
    await recipeStore.unpublishRecipe(recipeId)
    emit('actionDone')
    toast.add({ title: '¡Receta despublicada!' })
}

async function deleteRecipe (recipeId) {
    await recipeStore.deleteRecipe(recipeId)
    emit('actionDone')
    toast.add({ title: '¡Receta eliminada!' })
}

</script>

<template>
    <UDropdown :items="publishedOptions ? optionsPublishedItems : optionsUnpublishedItems" :popper="{ placement: 'bottom-start' }">
        <UButton color="white" class="ml-2" trailing-icon="i-heroicons-chevron-down-20-solid" />

        <template #item="{ item }">
            <div class="flex justify-between w-full" @click="handleOptionsClick(item.action, recipeId)">
                <span class="truncate">{{ item.label }}</span>
                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
            </div>
        </template>
    </UDropdown>
</template>
  