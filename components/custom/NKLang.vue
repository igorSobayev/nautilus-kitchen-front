<template>
    <USelect v-model="locale" :options="langs" />
</template>
  

<script setup>
const langs = ['es', 'en']
const { locale } = useI18n()

watch(locale, async (newLocale) => {
    localStorage.setItem('userLangSelection', newLocale)
})

onNuxtReady(async () => {
    const userLangSelection = localStorage.getItem('userLangSelection')
    if (userLangSelection) {
        locale.value = userLangSelection
    }
})
</script>
