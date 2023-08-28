<script setup>
import { ref } from 'vue'


const email = ref('')
const password = ref('')
const passwordRepeated = ref('')
const username = ref('')
const conditions = ref(false)
const rules = {
  isEmail: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail no valido',
  isRequired: (v) => !!v  || 'El campo es obligatorio',
}

function onSubmit(isValid) {

}
</script>

<template>
    <div class="flex items-center justify-center h-[80vh]">
        <x-form @submit="onSubmit">
            <div class="grid gap-4">
                <x-input
                    v-model="username"
                    :rules="[rules.isRequired]"
                    name="username"
                    label="Usuario"
                    class="w-full"
                />
            </div>
            <div class="grid gap-4">
                <x-input
                v-model="email"
                :rules="[rules.isRequired, rules.isEmail]"
                name="email"
                label="Email"
                class="w-full"
                />
            </div>
            <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
                <x-input
                v-model="password"
                type="password"
                :rules="[rules.isRequired]"
                name="password"
                label="Contraseña"
                class="w-full"
                />
                <x-input
                v-model="passwordRepeated"
                type="password"
                :rules="[rules.isRequired]"
                name="passwordRepeated"
                label="Repetir contraseña"
                class="w-full"
                />
            </div>
            <div class="grid grid-col-1 gap-4 mt-4">
                <x-checkbox v-model="conditions" :rules="[rules.isRequired]" name="conditions" label="Aceptar terminos y condiciones"/>
                <x-button block color="primary" type="submit">Registrarse</x-button>
                <x-button block class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" type="submit">Registrarse</x-button>
                <button @click="loadRecipes" class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Save changes
                </button>
            </div>
        </x-form>
    </div>
</template>
