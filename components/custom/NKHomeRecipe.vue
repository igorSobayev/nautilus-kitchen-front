<script setup>
const props = defineProps({ 
    recipe: Object,
})
</script>

<template>
    <div class="grid grid-cols-12 hover:bg-slate-100">
        <div class="col-span-1 pt-2 align-center flex">
            <NuxtLink class="h-8" :to="`/users/${recipe.user.username}`">
                <UAvatar :alt="recipe.user.username" :src="recipe.user.avatar" />
            </NuxtLink>
        </div>
        <div class="col-span-11">
            <div class="pl-2 pt-1 text-lg">
                <NuxtLink class="underline underline-offset-1" :to="`/users/${recipe.user.username}`">
                {{ recipe.user.username }}
                </NuxtLink>
            </div>
            <!-- Recipe container -->
            <div class="flex flex-col pl-3">
                <div>{{ recipe.title }}</div>
                <div class="my-3">
                    <img :src="recipe.featuredImg" alt="">
                </div>
                <div class="grid grid-cols-2">
                    <div>
                        <ul>
                            <li v-for="ingredient in recipe.ingredients" :key="ingredient._id">- {{ ingredient.name }} | {{ ingredient.quantity }}</li>
                        </ul>
                    </div>  
                    <div>
                        <div class="pb-2">
                            <NuxtRating :read-only="true" ratingContent="🍴" activeColor="#6366f1" :ratingValue="recipe.difficulty ?? 0" />
                        </div>
                        <div class="pl-2">{{ recipe.avgTime }}</div>
                        <div class="pl-2">{{ recipe.steps.length }} {{ $t('stepsLower') }}</div>
                    </div>
                </div>
                <div class="pb-2 pt-4 flex justify-center">
                    <UButton :to="`/recipes/${recipe._id}`" size="lg" color="primary">{{ $t('viewRecipe') }}</UButton>
                </div>
            </div>
        </div>
    </div>
</template>