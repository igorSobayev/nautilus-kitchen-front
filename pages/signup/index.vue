<script setup lang="ts">
import type { FormError } from '@nuxthq/ui/dist/runtime/types'

const state = ref({
  username: '',
  email: '',
  password: '',
  password2: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Requerido' })
  if (!state.username) errors.push({ path: 'username', message: 'Requerido' })
  if (!state.password) errors.push({ path: 'password', message: 'Requerido' })
  if (state.password !== state.password2) errors.push({ path: 'password', message: 'Las contraseñas no coinciden' })
  return errors
}

const form = ref()

async function submit () {
  await form.value!.validate()
  // Do something with state.value
}
</script>

<template>
    <div class="flex items-center justify-center h-[80vh]">
        <UForm
            ref="form"
            :validate="validate"
            :state="state"
            @submit.prevent="submit"
        >
            <UFormGroup name="username" label="Usuario" class="mt-3">
                <UInput v-model="state.username" />
            </UFormGroup>

            <UFormGroup name="email" label="Email" class="mt-3">
                <UInput v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
            </UFormGroup>

            <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-3">
                <UFormGroup label="Contraseña">
                    <UInput v-model="state.password" type="password" />
                </UFormGroup>

                <UFormGroup label="Repetir contraseña" name="password">
                    <UInput v-model="state.password2" type="password" />
                </UFormGroup>
            </div>

            <UButton block type="submit" class="mt-5" label="Registrarse" />
        </UForm>
    </div>
</template>
