<script setup lang="ts">
import type { FormError } from '@nuxthq/ui/dist/runtime/types'
import { useAuthStore } from '../../store/auth'
import { useFetch, onNuxtReady, ref, useRouter } from '../../.nuxt/imports'

const authStore = useAuthStore()
const router = useRouter()

const state = ref({
  name: 'Igor',
  surname: 'Sobayev',
  avatar: 'https://i2-prod.dailyrecord.co.uk/incoming/article8543359.ece/ALTERNATES/s1200c/CP47009989.jpg',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam itaque animi impedit nemo obcaecati! Labore esse et cum impedit voluptas quos, molestias perferendis magnam molestiae id! Adipisci a natus sed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam itaque animi impedit nemo obcaecati! Labore esse et cum impedit voluptas quos, molestias perferendis magnam molestiae id! Adipisci a natus sed.',
  editing: false,
  newAvatar: ''
})

const originalValues = ref({
  username: 'k0sac',
  email: 'isobayev@gmail.com',
  name: 'Igor',
  surname: 'Sobayev',
  avatar: 'https://i2-prod.dailyrecord.co.uk/incoming/article8543359.ece/ALTERNATES/s1200c/CP47009989.jpg',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam itaque animi impedit nemo obcaecati! Labore esse et cum impedit voluptas quos, molestias perferendis magnam molestiae id! Adipisci a natus sed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam itaque animi impedit nemo obcaecati! Labore esse et cum impedit voluptas quos, molestias perferendis magnam molestiae id! Adipisci a natus sed.',
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Requerido' })
  if (!state.username) errors.push({ path: 'username', message: 'Requerido' })
  return errors
}

const form = ref()

async function submit () {
//   await form.value!.validate()
//     authStore
//         .signup({
//             username: state.value.username,
//             email: state.value.email,
//             password: state.value.password,
//         })
//         .then(() => {
//             state.value.userRegistered = true
//         })
//         .catch((error) => console.log("API error", error))
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

}

async function changedAvatar (event) {
    const fileObj = event.target.files
    state.value.avatar = URL.createObjectURL(fileObj[0])
}

onNuxtReady(async () => {
    const url = 'http://localhost:8080/api/user'
    const { data, error } = await useFetch(url, {
        method: 'GET',
        credentials: 'include'
    })
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
                <div class="flex justify-center align-center flex-col gap-5">
                    <div class="flex justify-center">
                        <img :src="state.avatar" class="rounded-full max-h-52" />
                    </div>
                    <div v-if="state.editing">
                        <UInput @change="changedAvatar" icon="i-heroicons-pencil-square" type="file" />
                        <img :src="state.newAvatar" />
                    </div>
                </div>
                <div class="col-span-2">
                    <UFormGroup name="username" label="Usuario" class="mt-3">
                        <UInput disabled v-model="originalValues.username" />
                    </UFormGroup>

                    <UFormGroup name="email" label="Email" class="mt-3">
                        <UInput type="email" disabled v-model="originalValues.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
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
