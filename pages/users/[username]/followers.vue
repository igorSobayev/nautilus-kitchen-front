<script setup>
import { useUserStore } from './../../../store/user'
import { onNuxtReady, ref, useRoute } from '../../../.nuxt/imports'

const route = useRoute()
const userStore = useUserStore()

const followingList = ref([])

onNuxtReady(async () => {

    const username = route.params.username

    followingList.value = await userStore.listFollowing(username)
    
    console.log(followingList.value)
})
</script>


<template>
    <div class="">
        La home de los followings
    </div>
</template>
