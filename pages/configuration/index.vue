<script setup lang="ts">
import type { FormError } from '@nuxthq/ui/dist/runtime/types'
import { useAuthStore } from '../../store/auth'
import { useUserStore } from './../../store/user'
import { onNuxtReady, ref } from '../../.nuxt/imports'

const authStore = useAuthStore()
const userStore = useUserStore()

const state = ref({
  username: '',
  email: '',
  name: '',
  surname: '',
  avatar: '',
  description: '',
  editing: false,
  newAvatar: undefined,
  newAvatarPreview: ''
})

const originalValues = ref({
  name: '',
  surname: '',
  avatar: '',
  description: '',
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Requerido' })
  if (!state.surname) errors.push({ path: 'surname', message: 'Requerido' })
  return errors
}

const form = ref()

async function submit () {
  await form.value!.validate()

  let newAvatar

  if (state.value.newAvatar) {
    newAvatar = state.value.newAvatar
  }

  userStore
        .edit({
            name: state.value.name,
            surname: state.value.surname,
            description: state.value.description,
            id: authStore.user.id,
            newAvatar,
        })
        .then(() => {
            updatedSuccesfully()
        })
        .catch((error) => console.log("API error", error))

}

async function edit () {
    state.value.editing = true
}

async function cancelEditing () {
    state.value.editing = false
    state.value.name = originalValues.value.name
    state.value.surname = originalValues.value.surname
    state.value.avatar = originalValues.value.avatar
    state.value.description = originalValues.value.description
}

async function changePassword () {
// TODO
}

async function changedAvatar (event: any) {
    const fileObj = event.target.files
    // @ts-ignore comment
    state.value.newAvatar = new FormData() // @ts-ignore comment
    state.value.newAvatar.append('file', fileObj[0]) // @ts-ignore comment
    state.value.newAvatar.append('path', '/avatar')
    
    // Set preview
    state.value.newAvatarPreview = URL.createObjectURL(fileObj[0])
}

async function updatedSuccesfully () {
    await loadUserData()
    state.value.editing = false
}

async function loadUserData () {
    const user = await userStore.loadUserData()
    originalValues.value.name = user.name
    originalValues.value.surname = user.surname
    originalValues.value.description = user.description
    originalValues.value.avatar = user.description

    state.value.username = user.username
    state.value.email = user.email
    state.value.name = user.name
    state.value.surname = user.surname
    state.value.description = user.description
    state.value.avatar = user.avatar
}

onNuxtReady(async () => {
    await loadUserData()
})
</script>

<template>
    <div class="flex items-center justify-center">
        <UForm
            ref="form"
            :validate="validate"
            :state="state"
            @submit.prevent="submit"
            class="bg-white p-12 rounded-lg border-2 w-[60%]"
        >
            <div class="flex justify-end mb-5">
                <UButton v-if="!state.editing" @click="edit" icon="i-heroicons-pencil-square" size="md" label="Editar" color="primary" />
                <UButton v-else @click="cancelEditing" icon="i-heroicons-x-mark" size="md" label="Cancelar" color="primary" />
                <UButton @click="changePassword" icon="i-heroicons-key" size="md" label="Cambiar contraseña" color="gray" class="ml-3" />
            </div>
            <div class="grid grid-cols-3">
                <div class="flex justify-center align-center flex-col gap-5 p-5">
                    <div v-if="!state.editing" class="flex justify-center">
                        <img :src="state.avatar" class="rounded-full max-h-52" />
                    </div>
                    <div v-if="state.editing">
                        <img class="rounded-full max-h-52" v-if="state.newAvatarPreview" :src="state.newAvatarPreview" />
                        <img class="rounded-full max-h-52" v-else :src="state.avatar" />
                        <UInput @change="changedAvatar" icon="i-heroicons-pencil-square" class="mt-3" type="file" />
                        <span class="text-slate-800 text-xs">Recomendado 256 x 256</span>
                    </div>
                </div>
                <div class="col-span-2">
                    <UFormGroup name="username" label="Usuario" class="mt-3">
                        <UInput disabled v-model="state.username" />
                    </UFormGroup>

                    <UFormGroup name="email" label="Email" class="mt-3">
                        <UInput type="email" disabled v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
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
        </UForm>
    </div>
</template>
