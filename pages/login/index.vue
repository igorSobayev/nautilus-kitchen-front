<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const rules = {
  isRequired: (v) => !!v  || 'Field is required',
}

function onSubmit(isValid) {

}
</script>

<template>
    <div class="flex justify-center items-center h-[80vh]">
        <x-form @submit="onSubmit">
            <div class="gap-4">
                <x-input
                    v-model="username"
                    :rules="[rules.isRequired]"
                    name="username"
                    label="Usuario"
                    class="w-full"
                />
                <x-input
                    v-model="password"
                    type="password"
                    :rules="[rules.isRequired]"
                    name="password"
                    label="Contraseña"
                    class="w-full"
                />
            </div>
            <x-button block color="primary" class="mt-4" type="submit">Iniciar sesión</x-button>
        </x-form>
    </div>
</template>
