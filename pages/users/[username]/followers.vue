<script setup>
import { useUserStore } from './../../../store/user'
import NKFollowersList from '~/components/custom/followers/NKFollowersList.vue'
import { onNuxtReady, ref, useRoute } from '../../../.nuxt/imports'

const items = [
    {
        label: 'Following',
        key: 'following',
        icon: 'i-heroicons-queue-list',
    },
    {
        label: 'Followers',
        key: 'followers',
        icon: 'i-heroicons-queue-list',
    },
]

const route = useRoute()
const userStore = useUserStore()

const followingList = ref([])
const followersList = ref([])

onNuxtReady(async () => {

    const username = route.params.username

    followingList.value = await userStore.listFollowing(username)
    console.log(followingList.value)

    followersList.value = await userStore.listFollowers(username)
    console.log(followersList.value)
})
</script>


<template>
    <div class="">
        <UTabs :items="items" class="w-full mt-5">
            <template #default="{ item, index, selected }">
                <div class="flex items-center gap-2 relative truncate">
                    <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
                    <span class="truncate">{{ index + 1 }}. {{ item.label }}</span>
                    <span v-if="selected"
                        class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                </div>
            </template>
            <template #item="{ item }">
                <div v-if="item.key === 'following'">
                    <NKFollowersList :followers="followingList" />
                </div>
                <div v-if="item.key === 'followers'">
                    <NKFollowersList :followers="followersList" />
                </div>
            </template>
        </UTabs>
    </div>
</template>
