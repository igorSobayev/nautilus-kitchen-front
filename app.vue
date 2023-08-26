<template>
  <div class="bg-[#eeeeee] h-screen flex flex-col overflow-x-hidden">
    <NavBar />
    <div class="flex justify-center pt-20 mb-auto">
      <NuxtPage class="w-2/3" />
    </div>
    <Footer />
  </div>
</template>


<script setup>
import NavBar from './components/layout/NavBar.vue'
import Footer from './components/layout/Footer.vue'
</script>

<style>
</style>