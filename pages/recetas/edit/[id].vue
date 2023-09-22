<script setup lang="ts">
import type { FormError } from '@nuxthq/ui/dist/runtime/types'
import { useAuthStore } from '../../../store/auth'
import { onNuxtReady, ref, useRoute, useToast } from '../../../.nuxt/imports'
import { useRecipeStore } from '../../../store/recipe'
import RichEditor from './../../../components/custom/RichEditor.vue' // TODO WIP
import types from './../../../store/types'

const toast = useToast()
const authStore = useAuthStore()
const recipeStore = useRecipeStore()
const route = useRoute()

const state = ref({
    _id: '',
    title: '',
    description: '',
    notes: '',
    avgTime: '',
    difficulty: 2,
    isCombination: false,
    published: false,
    onProgress: true,
    combinations: [],
    featuredImg: '',
    media: [],
    ingredients: [
        {
            name: '',
            quantity: '',
        }
    ],
    steps: [
        {
            order: 1,
            description: ''
        }
    ]
})

const formManagement = ref({
    advanceDescription: false
})

const validate = (state: any): FormError[] => {
  const errors: FormError[] = []
  if (state.avgTime && state.avgTime.length >= 15) errors.push({ path: 'avgTime', message: 'The average time is to long' })
//   if (!state.surname) errors.push({ path: 'surname', message: 'Requerido' })
  return errors
}

const form = ref()

async function submit () {
  await form.value!.validate()
  recipeStore
    .edit(state.value)
    .then(() => {
        toast.add({ title: 'Recipe updated successfully' })
    })
}

async function changeFeaturedImg () {
    // TODO
}


// Ingredients
function addIngredientRow () {
    state.value.ingredients.push({
        name: '',
        quantity: '',
    })
}

function removeIngredientRow (ingredientToRemove: String) {
    
    const ingredientPosition = state.value.ingredients.findIndex(ingredient => ingredient.name === ingredientToRemove)

    state.value.ingredients.splice(ingredientPosition, 1)
}

// Steps
function addStepRow () {
    let order
    if (state.value.steps.length) {
        const lastStep = state.value.steps[state.value.steps.length - 1]
        order = lastStep.order + 1
    } else {
        order = 1
    }
    
    state.value.steps.push({
        order,
        description: '',
    })
}

function removeStepRow (stepToRemove: Number) {
    
    const stepPosition = state.value.steps.findIndex(step => step.order === stepToRemove)
    state.value.steps.splice(stepPosition, 1)

    orderSteps()
}

function orderSteps () {
    state.value.steps.forEach((step, index) => {
        step.order = index + 1
    })
}

function setInitialRecipeData (recipe: types.Recipe) {
    state.value._id = recipe._id
    state.value.title = recipe.title
    state.value.description = recipe.description
    state.value.notes = recipe.notes
    state.value.avgTime = recipe.avgTime
    state.value.difficulty = recipe.difficulty
    state.value.isCombination = recipe.isCombination
    state.value.published = recipe.published
    state.value.onProgress = recipe.onProgress
    state.value.combinations = recipe.combinations
    state.value.featuredImg = recipe.featuredImg
    state.value.media = recipe.media
    state.value._id = recipe._id
}

onNuxtReady(async () => {
    const recipeId = route.params.id as String
    const recipe = await recipeStore.loadRecipeData(recipeId)
    setInitialRecipeData(recipe)
})
</script>

<template>
    <div class="flex items-center justify-center">
        <UForm
            ref="form"
            :validate="validate"
            :state="state"
            @submit.prevent=""
            class="bg-white p-12 rounded-lg border-2 w-[80%]"
        >
            <div class="grid grid-cols-3 gap-5">
                <div>
                    <UFormGroup name="username" label="Título" class="mt-3">
                        <UInput v-model="state.title" />
                    </UFormGroup> 
                </div>
                <div>
                    <UFormGroup name="avgTime" label="Tiempo medio" class="mt-3">
                        <UInput v-model="state.avgTime" placeholder="1h 30min" />
                    </UFormGroup> 
                </div>
                <div>
                    <UFormGroup name="difficulty" label="Dificultad" class="mt-3">
                        <UInput disabled v-model="state.difficulty" class="hidden" />
                        <NuxtRating :read-only="false" ratingContent="🍴" activeColor="#6366f1" :ratingValue="state.difficulty" />
                    </UFormGroup> 
                </div>
            </div>
            <div class="mt-5">
                <div class="flex gap-3 items-center pb-2">
                    <label class="block font-medium text-gray-700 dark:text-gray-200" for="description">Descripción</label>
                    <UToggle v-model="formManagement.advanceDescription" on-icon="i-heroicons-check-20-solid" off-icon="i-heroicons-x-mark-20-solid" />
                </div>
                <RichEditor v-if="formManagement.advanceDescription" v-model="state.description" />
                <UTextarea v-else :rows="8" variant="outline" v-model="state.description" />
            </div>

            <div class="mt-5 grid grid-cols-2">
                <div>
                    <div class="flex gap-3 items-center pb-2">
                        <label class="block font-medium text-gray-700 dark:text-gray-200" for="description">Ingredientes</label>
                        <UButton @click="addIngredientRow" icon="i-heroicons-plus" size="xs" color="primary" square variant="solid" />
                    </div>
                    <div>
                        <ul>
                            <li v-for="ingredient in state.ingredients">
                                {{ ingredient }} <UButton @click="removeIngredientRow(ingredient.name)" icon="i-heroicons-minus" size="xs" color="primary" square variant="solid" />
                            </li>
                        </ul>
                    </div>
                </div>  
                <div>
                    <div class="flex gap-3 items-center pb-2">
                        <label class="block font-medium text-gray-700 dark:text-gray-200" for="description">Pasos</label>
                        <UButton @click="addStepRow" icon="i-heroicons-plus" size="xs" color="primary" square variant="solid" />
                    </div>
                    <div>
                        <ul>
                            <li v-for="step in state.steps">
                                {{ step }} <UButton @click="removeStepRow(step.order)" icon="i-heroicons-minus" size="xs" color="primary" square variant="solid" />
                            </li>
                        </ul>
                    </div>
                </div>  
            </div>

            <div class="mt-5 grid grid-cols-2 gap-5">
                <div class="flex justify-center align-center flex-col gap-5 p-5">
                    <div>
                        <img class="rounded-full max-h-52" v-if="state.featuredImg" :src="state.featuredImg" />
                        <UFormGroup name="username" label="Imagen destacada" class="mt-3">
                            <UInput @change="changeFeaturedImg" icon="i-heroicons-pencil-square" class="mt-3" type="file" />
                        </UFormGroup>
                    </div>
                </div>
                <UFormGroup class="mt-5" name="notes" label="Notas adicionales">
                    <UTextarea :rows="3" variant="outline" v-model="state.notes" />
                </UFormGroup>
            </div>

            <UButton block class="mt-5" label="Guardar" @click="submit" />
        </UForm>
    </div>
</template>
