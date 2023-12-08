<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    followers: Array,
}>()

</script>

<template>
    <div v-for="follower in followers" :key="follower._id" class="flex flex-col w-full bg-white p-2 gap-2">
        <div class="w-full grid grid-cols-4 min-h-24 p-2 items-center rounded-sm border border-gray">
            <div class="flex justify-center">
                <img :src="follower.avatar" class="rounded-md max-h-16" />
            </div>
            <div class="flex justify-center">{{ follower.username }} - {{ follower.name }}</div>
            <div class="flex justify-center items-center gap-1">{{ follower.followers }}
                <UIcon name="i-heroicons-users" class="text-primary" />
            </div>
            <div class="flex justify-center">
                <UButton label="View profile" icon="i-heroicons-eye" size="md" color="primary"
                    :to="`/users/${follower.username}`" />
            </div>
        </div>
</div></template>