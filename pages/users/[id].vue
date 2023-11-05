<template>
    <div class="">
        La home del user {{ route.params.id }}
    </div>
</template>
  

<script lang="ts" setup>
import { useRoute } from '../../.nuxt/imports'
const route = useRoute()
</script>
