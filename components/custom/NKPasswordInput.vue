<script setup>
import { ref } from 'vue'

const props = defineProps({ 
    modelValue: String,
    name: String,
    label: String
})

const emit = defineEmits(['update:modelValue'])

const passwordInputType = ref('password')

const password = ref(props.modelValue)

function showPassword () {
    passwordInputType.value = 'text'
}

function hidePassword () {
    passwordInputType.value = 'password'
}

function updatePassword () {
    emit('update:modelValue', password.value)
}
</script>

<template>
    <UFormGroup :label="label" :name="name">
        <UInput v-model="password" @keyup="updatePassword" :type="passwordInputType" :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>
                <UButton
                    v-if="passwordInputType === 'password'"
                    color="gray"
                    variant="link"
                    icon="i-heroicons-eye"
                    :padded="false"
                    @click="showPassword"
                />
                <UButton
                    v-if="passwordInputType === 'text'"
                    color="gray"
                    variant="link"
                    icon="i-heroicons-eye-slash"
                    :padded="false"
                    @click="hidePassword"
                />
            </template>
        </UInput>
    </UFormGroup>
</template>