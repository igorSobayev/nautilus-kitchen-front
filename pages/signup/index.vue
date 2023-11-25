<script setup lang="ts">
import type { FormError } from '@nuxt/ui/dist/runtime/types'
import { useAuthStore } from '../../store/auth'
import NKPasswordInput from '../../components/custom/NKPasswordInput.vue'

useHead({
  title: 'Sign Up',
  meta: [
    {
      name: 'description',
      content: 'TODO: SEO' 
    },
  ],
})

const authStore = useAuthStore()
const router = useRouter()

const state = ref({
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  userRegistered: false,
  alertTitle: '¡Te has registrado con éxito!',
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Requerido' })
  if (!state.username) errors.push({ path: 'username', message: 'Requerido' })
  if (!state.password) errors.push({ path: 'password', message: 'Requerido' })
  if (!state.repeatPassword) errors.push({ path: 'repeatPassword', message: 'Requerido' })
  if (state.password !== state.repeatPassword) errors.push({ path: 'repeatPassword', message: 'Las contraseñas no coinciden!' })
  return errors
}

const form = ref()

async function submit () {
  await form.value!.validate()
    authStore
        .signup({
            username: state.value.username,
            email: state.value.email,
            password: state.value.password,
        })
        .then(() => {
            state.value.userRegistered = true
        })
        .catch((error) => console.log("API error", error))
}

onNuxtReady(() => {
    if (authStore.isLoggedIn) {
        router.push('/recetas')
    }
})
</script>

<template>
    <div v-if="!state.userRegistered" class="flex items-center justify-center h-[80vh]">
        <UForm
            class="bg-white p-5 rounded-md"
            ref="form"
            :validate="validate"
            :state="state"
            :validate-on="['submit']"
            @submit="submit"
        >
            <UFormGroup name="username" label="Usuario" class="mt-3">
                <UInput v-model="state.username" />
            </UFormGroup>

            <UFormGroup name="email" label="Email" class="mt-3">
                <UInput v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
            </UFormGroup>

            <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-3">
                <NKPasswordInput v-model="state.password" label="Contraseña" name="password" />
                <NKPasswordInput v-model="state.repeatPassword" label="Repetir contraseña" name="repeatPassword" />
            </div>

            <UButton block type="submit" class="mt-5" label="Registrarse" />
        </UForm>
    </div>
    <div v-else class="flex items-center justify-center h-[80vh]">
        <UAlert icon="i-emojione-v1-party-popper" color="primary" variant="solid" :title="state.alertTitle">
            <template #description>
                <span>Ahora ya puedes empezar a crear recetas geniales, ¡echale un vistazo a la sección de <NuxtLink class="font-bold underline" to="/recetas">recetas</NuxtLink> para coger algunas ideas!</span>
            </template>
        </UAlert>
    </div>
</template>
