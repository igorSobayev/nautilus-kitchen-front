<script setup lang="ts">
import type { FormError } from '@nuxt/ui/dist/runtime/types'
import { useAuthStore } from '../../store/auth'
import { ref } from 'vue'
import NKPasswordInput from '../../components/custom/NKPasswordInput.vue'

const authStore = useAuthStore()
const router = useRouter()

const state = ref({
  email: '',
  password: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Requerido' })
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
            @submit="submit"
            >
            <UFormGroup label="Email" name="email">
                <UInput type="email" name="email" v-model="state.email" />
            </UFormGroup>

            <NKPasswordInput v-model="state.password" label="Contraseña" name="password" class="mt-4" />
        
            <UButton type="submit" class="mt-4" block>
                Iniciar sesión
            </UButton>
            </UForm>
        </div>
    </div>
</template>