<script setup lang="ts">
import type { FormError } from '@nuxt/ui/dist/runtime/types'
import { useAuthStore } from '../../store/auth'
import { ref } from 'vue'
import NKPasswordInput from '../../components/custom/NKPasswordInput.vue'

const authStore = useAuthStore()
const router = useRouter()

const state = ref({
  email: ''
})

const newPasswordState = ref({
  email: '',
  resetCode: '',
  newPassword: '',
  repeatedNewPassword: '',
})

const resetCodeSend = ref(true)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Requerido' })
  return errors
}

const validateResetCode = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'userEmail', message: 'Requerido' })
  if (!state.resetCode) errors.push({ path: 'resetCode', message: 'Requerido' })
  if (!state.newPassword) errors.push({ path: 'newPassword', message: 'Requerido' })
  if (!state.repeatedNewPassword) errors.push({ path: 'repeatedNewPassword', message: 'Requerido' })
  if (state.newPassword !== state.repeatedNewPassword) errors.push({ path: 'newPassword', message: 'Las contraseñas no coinciden!' })
  return errors
}

const form = ref()

async function sendResetCode () {
  await form.value!.validate()
  authStore
    .forgotPassword(state.value.email)
    .then(() => {
      resetCodeSend.value = true
    })
    .catch((error) => console.log("API error", error))
}

async function resetPassword () {
  await form.value!.validate()
  authStore
    .forgotPassword(state.value.email)
    .then(() => {
      resetCodeSend.value = true
    })
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
            :validate-on="['submit']"
            @submit="sendResetCode"
            v-if="!resetCodeSend"
            >
              <UFormGroup label="Email" name="email">
                  <UInput type="email" name="email" v-model="state.email" />
              </UFormGroup>
          
              <UButton type="submit" class="mt-4" block>
                  Get reset code
              </UButton>
            </UForm>

            <UForm
            ref="form"
            :validate="validateResetCode"
            :state="state"
            :validate-on="['submit']"
            @submit="resetPassword"
            v-else
            >
              <UFormGroup class="mt-4" label="Email" name="userEmail">
                  <UInput type="email" name="userEmail" v-model="newPasswordState.email" />
              </UFormGroup>

              <UFormGroup class="mt-4" label="Reset code" name="resetCode">
                  <UInput type="text" name="resetCode" v-model="newPasswordState.resetCode" />
              </UFormGroup>

              <NKPasswordInput v-model="newPasswordState.newPassword" label="New password" name="newPassword" class="mt-4" />

              <NKPasswordInput v-model="newPasswordState.repeatedNewPassword" label="Repeat new password" class="mt-4 w-full" name="repeatedNewPassword" />

              <UButton type="submit" class="mt-4" block>
                  Change password
              </UButton>
            </UForm>
        </div>
    </div>
</template>