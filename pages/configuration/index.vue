<script setup>
import { useAuthStore } from '../../store/auth'
import { useUserStore } from './../../store/user'
import { onNuxtReady, ref } from '../../.nuxt/imports'
import NKPasswordInput from '../../components/custom/NKPasswordInput.vue'
import { useI18n } from 'vue-i18n'

const toast = useToast()
const authStore = useAuthStore()
const userStore = useUserStore()

const { t } = useI18n()

useHead({
  title: t('configuration'),
  meta: [
    {
      name: 'description',
      content: 'TODO: SEO' 
    },
  ],
})

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

const changingPassword = ref(false)

const changePasswordState = ref({
    actualPassword: '',
    newPassword: '',
    repeatedNewPassword: '',
})

const validate = (state) => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: t('required') })
  if (!state.surname) errors.push({ path: 'surname', message: t('required') })
  return errors
}

const validatePassword = (state) => {
  const errors = []
  if (!state.actualPassword) errors.push({ path: 'actualPassword', message: t('required') })
  if (!state.newPassword) errors.push({ path: 'newPassword', message: t('required') })
  if (!state.repeatedNewPassword) errors.push({ path: 'repeatedNewPassword', message: t('required') })
  if (state.newPassword !== state.repeatedNewPassword) errors.push({ path: 'newPassword', message: t('passwordsNotMatch') })
  return errors
}

const form = ref()
const formPassword = ref()

async function submit () {
  await form.value.validate()

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

    await formPassword.value.validate()

    await authStore.changePassword({
        actualPassword: changePasswordState.value.actualPassword,
        newPassword: changePasswordState.value.newPassword,
        repeatedNewPassword: changePasswordState.value.repeatedNewPassword,
    })

    changingPassword.value = false

    toast.add({ title: t('passwordUpdated') })
}

function cancelChangePassword () {
    changingPassword.value = false
}

async function changedAvatar (event) {
    const fileObj = event.target.files

    state.value.newAvatar = new FormData()
    state.value.newAvatar.append('file', fileObj[0])
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
            @submit="submit"
            :validate-on="['submit']"
            class="bg-white p-12 rounded-lg border-2 w-[60%]"
            v-if="!changingPassword"
        >
            <div>
                <div class="flex justify-end mb-5">
                    <UButton v-if="!state.editing" @click="edit" icon="i-heroicons-pencil-square" size="md" :label="$t('edit')" color="primary" />
                    <UButton v-else @click="cancelEditing" icon="i-heroicons-x-mark" size="md" :label="$t('cancel')" color="primary" />
                    <UButton @click="changingPassword = true" icon="i-heroicons-key" size="md" :label="$t('changePassword')" color="gray" class="ml-3" />
                </div>
                <div class="grid grid-cols-3">
                    <div class="flex justify-center align-center flex-col items-center gap-5 p-5">
                        <div v-if="!state.editing" :style="'background-image: url(' + state.avatar + ');'" class="bg-cover bg-center bg-no-repeat rounded-full h-36 w-36"></div>
                        <div v-if="state.editing" class="flex flex-col align-center items-center justify-center gap-3">
                            <div v-if="state.newAvatarPreview" :style="'background-image: url(' + state.newAvatarPreview + ');'" class="bg-cover bg-center bg-no-repeat rounded-full h-36 w-36"></div>
                            <div v-else :style="'background-image: url(' + state.avatar + ');'" class="bg-cover bg-center bg-no-repeat rounded-full h-36 w-36"></div>
                            <UInput @change="changedAvatar" icon="i-heroicons-pencil-square" class="mt-3" type="file" />
                            <span class="text-slate-800 text-xs">{{ $t('recommended') }} 256 x 256</span>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <UFormGroup name="username" :label="$t('user')" class="mt-3">
                            <UInput disabled v-model="state.username" />
                        </UFormGroup>

                        <UFormGroup name="email" label="Email" class="mt-3">
                            <UInput type="email" disabled v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
                        </UFormGroup>        
                    </div>
                </div>
                <div class="flex gap-4">
                    <UFormGroup name="name" :label="$t('name')" class="mt-3 w-[50%]">
                        <UInput :disabled="!state.editing" v-model="state.name" />
                    </UFormGroup>

                    <UFormGroup name="surname" :label="$t('surname')" class="mt-3 w-[50%]">
                        <UInput :disabled="!state.editing" v-model="state.surname" />
                    </UFormGroup>
                </div>
                <div class="mt-3">
                    <UFormGroup name="description" :label="$t('description')">
                        <UTextarea :disabled="!state.editing" :rows="8" variant="outline" v-model="state.description" />
                    </UFormGroup>
                </div>

                <UButton v-if="state.editing" block type="submit" class="mt-5" :label="$t('save')" />
            </div>
        </UForm>
        <!-- Change password form -->
        <UForm
            ref="formPassword"
            :validate="validatePassword"
            :state="changePasswordState"
            @submit="changePassword"
            :validate-on="['submit']"
            class="bg-white p-12 rounded-lg border-2 w-[60%]"
            v-else
        >
            <div>
                <div class="flex justify-end mb-5">
                    <UButton type="submit" icon="i-heroicons-key" size="md" :label="$t('update')" color="gray" class="ml-3" />
                    <UButton @click="cancelChangePassword" icon="i-heroicons-x-mark" size="md" :label="$t('cancel')" color="red" class="ml-3" />
                </div>
                <div class="flex justify-center align-center flex-col items-center gap-4">
                    <NKPasswordInput v-model="changePasswordState.actualPassword" :label="$t('currentPassword')" class="mt-3 w-full" name="actualPassword" />
                    <NKPasswordInput v-model="changePasswordState.newPassword" :label="$t('newPassword')" class="mt-3 w-full" name="newPassword" />
                    <NKPasswordInput v-model="changePasswordState.repeatedNewPassword" :label="$t('repeatNewPassword')" class="mt-3 w-full" name="repeatedNewPassword" />
                </div>
            </div>
        </UForm>
    </div>
</template>
