<template>
    <USelect v-model="locale" :options="langs" />
</template>
  

<script setup>
const langs = ['es', 'en']
const { locale, setLocaleCookie, setLocale } = useI18n()

watch(locale, async (newLocale) => {
    setLocaleCookie(newLocale)
    setLocale(newLocale)
})

onNuxtReady(async () => {
    const userLangSelection = useCookie('i18n_redirected')
    if (userLangSelection) {
        setLocale(userLangSelection.value)
    }
})
</script>
