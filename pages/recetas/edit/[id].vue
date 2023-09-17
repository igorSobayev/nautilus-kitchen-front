<script setup lang="ts">
import type { FormError } from '@nuxthq/ui/dist/runtime/types'
import { useAuthStore } from '../../../store/auth'
import { onNuxtReady, ref, useRoute, useToast } from '../../../.nuxt/imports'
import { useRecipeStore } from '../../../store/recipe'
import RichEditor from './../../../components/custom/RichEditor.vue' // TODO WIP

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

onNuxtReady(async () => {
    const recipeId = route.params.id
    const recipe = await recipeStore.loadRecipeData(recipeId)

    // TODO move to function
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
    
    console.log(recipe)

    state.value._id = recipeId
})
</script>

<template>
    <div class="flex items-center justify-center">
        <UForm
            ref="form"
            :validate="validate"
            :state="state"
            @submit.prevent="submit"
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
                <!-- <UFormGroup name="description" label="Descripción y pasos a seguir">
                    <RichEditor v-model="state.description" />
                </UFormGroup> -->
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

            <UButton block type="submit" class="mt-5" label="Guardar" />
        </UForm>
    </div>
</template>
