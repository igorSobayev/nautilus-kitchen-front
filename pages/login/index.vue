<script setup>
import { useAuthStore } from '../../store/auth'
import { ref } from 'vue'
import NKPasswordInput from '../../components/custom/NKPasswordInput.vue'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()

useHead({
  title: t('login'),
  meta: [
    {
      name: 'description',
      content: 'TODO: SEO' 
    },
  ],
})

const state = ref({
  email: '',
  password: ''
})

const validate = (state) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: t('required') })
  if (!state.password) errors.push({ path: 'password', message: t('required') })
  return errors
}

const form = ref()

async function submit () {
  await form.value.validate()
  authStore
    .login(state.value)
    .then((_response) => router.push("/"))
    .catch((error) => console.log("API error", error))
}

function forgotPassword () {
  router.push("/forgot-password")
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
            @submit="submit"
            >
            <UFormGroup label="Email" name="email">
                <UInput type="email" name="email" v-model="state.email" />
            </UFormGroup>

            <NKPasswordInput v-model="state.password" :label="$t('password')" name="password" class="mt-4" />
        
            <div class="mt-4 cursor-pointer text-primary" @click="forgotPassword">{{ $t('forgotPassword') }}</div>

            <UButton type="submit" class="mt-4" block>
                {{ $t('login') }}
            </UButton>
            </UForm>
        </div>
    </div>
</template>