<template>
  <div class="bg-[#eeeeee] h-screen flex flex-col overflow-x-hidden">
    <NKNavBar />
    <div class="flex justify-center pt-20 mb-auto">
      <NuxtPage class="xl:w-2/3 w-[90%]" />
    </div>
    <NKFooter />
    <UNotifications />
    <NKAddRecipeButton />
  </div>
</template>


<script setup>
import NKNavBar from './components/layout/NKNavBar.vue'
import NKFooter from './components/layout/NKFooter.vue'
import NKAddRecipeButton from './components/custom/NKAddRecipeButton.vue'
</script>

<style>
</style>