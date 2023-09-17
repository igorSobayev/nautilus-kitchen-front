<script setup lang="ts">
import type { FormError } from '@nuxthq/ui/dist/runtime/types'
import { useAuthStore } from '../../store/auth'
import { ref } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const state = ref({
  username: '',
  password: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.username) errors.push({ path: 'username', message: 'Requerido' })
  if (!state.password) errors.push({ path: 'password', message: 'Requerido' })
  return errors
}

const form = ref()

async function submit () {
  await form.value!.validate()
  authStore
    .login(state.value)
    .then((_response) => router.push("/"))
    .catch((error) => console.log("API error", error))
}
</script>

<template>
    <div class="flex justify-center items-center h-[80vh]">
        <div class="bg-white p-5 rounded-md">
            <UForm
            ref="form"
            :validate="validate"
            :state="state"
            @submit.prevent="submit"
            >
            <UFormGroup label="Nombre de usuario" name="username">
                <UInput type="text" v-model="state.username" />
            </UFormGroup>
        
            <UFormGroup label="Password" name="password" class="mt-4">
                <UInput v-model="state.password" type="password" />
            </UFormGroup>
        
            <UButton type="submit" class="mt-4" block>
                Iniciar sesión
            </UButton>
            </UForm>
        </div>
    </div>
</template>