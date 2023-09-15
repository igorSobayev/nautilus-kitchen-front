<script setup lang="ts">
import type { FormError } from '@nuxthq/ui/dist/runtime/types'
import { useAuthStore } from '../../../store/auth'
import { onNuxtReady, ref } from '../../../.nuxt/imports'
import { useRecipeStore } from '../../../store/recipe'
import RichEditor from './../../../components/custom/RichEditor.vue' // TODO WIP

const authStore = useAuthStore()
const recipeStore = useRecipeStore()

const prueba = ref('<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>')

const state = ref({})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Requerido' })
  if (!state.surname) errors.push({ path: 'surname', message: 'Requerido' })
  return errors
}

const form = ref()

async function submit () {
  await form.value!.validate()
}

onNuxtReady(async () => {

})
</script>

<template>
    <div class="flex items-center justify-center">
        <h1>{{ $route.params.id }}</h1>
        <RichEditor v-model="prueba" />
        <!-- <hr>
        <UForm
            ref="form"
            :validate="validate"
            :state="state"
            @submit.prevent="submit"
            class="bg-white p-12 rounded-lg border-2"
        >
            <div class="grid grid-cols-3">
                <div class="flex justify-center align-center flex-col gap-5 p-5">
                    <div>
                        <img class="rounded-full max-h-52" v-if="state.newAvatarPreview" :src="state.newAvatarPreview" />
                        <UFormGroup name="username" label="Imagen destacada" class="mt-3">
                            <UInput @change="changedAvatar" icon="i-heroicons-pencil-square" class="mt-3" type="file" />
                        </UFormGroup>
                    </div>
                </div>
                <div class="col-span-2">
                    <UFormGroup name="username" label="Título" class="mt-3">
                        <UInput disabled v-model="state.username" />
                    </UFormGroup>

                    <UFormGroup name="description" class="mt-3" label="Descripción">
                        <UTextarea :disabled="!state.editing" :rows="8" variant="outline" v-model="state.description" />
                    </UFormGroup>     
                </div>
            </div>
            <div class="flex gap-4">
                <UFormGroup name="name" label="Nombre" class="mt-3 w-[50%]">
                    <UInput :disabled="!state.editing" v-model="state.name" />
                </UFormGroup>

                <UFormGroup name="surname" label="Apellido" class="mt-3 w-[50%]">
                    <UInput :disabled="!state.editing" v-model="state.surname" />
                </UFormGroup>
            </div>
            <div class="mt-3">
                <UFormGroup name="description" label="Descripción">
                    <UTextarea :disabled="!state.editing" :rows="8" variant="outline" v-model="state.description" />
                </UFormGroup>
            </div>

            <UButton v-if="state.editing" block type="submit" class="mt-5" label="Guardar" />
        </UForm> -->
    </div>
</template>
