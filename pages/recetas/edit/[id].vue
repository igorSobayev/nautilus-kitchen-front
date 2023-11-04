<script setup lang="ts">
import type { FormError } from '@nuxthq/ui/dist/runtime/types'
import { onNuxtReady, ref, useRoute, useToast } from '../../../.nuxt/imports'
import { useRecipeStore } from '../../../store/recipe'
import { useUserStore } from '../../../store/user'
import NKRichEditor from './../../../components/custom/NKRichEditor.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import types from './../../../store/types'

const toast = useToast()
const userStore = useUserStore()
const recipeStore = useRecipeStore()
const route = useRoute()

const state = ref({
    _id: '',
    title: '',
    description: '',
    notes: '',
    avgTime: '',
    difficulty: 2,
    published: false,
    onProgress: true,
    versions: [
        {
            name: '',
            description: '',
            avgTime: '',
            difficulty: 0,
            ingredients: [
                {
                    name: '',
                    quantity: '',
                }
            ]
        }
    ],
    featuredImg: '',
    media: [] as string[],
    ingredients: [
        {
            name: '',
            quantity: '',
        }
    ],
    steps: [
        {
            order: 1,
            description: ''
        }
    ]
})

const newFeaturedImage = ref(new FormData())
const newFeaturedImagePreview = ref()

const newAdditionalImages = ref(new FormData())
const newAdditionalImagesPreview = ref([])
const rawAdditionalImages = ref()
const additionalImagesToDelete = ref([] as string[])

const formManagement = ref({
    advanceDescription: false
})

const accordionVersions = ref([
    {
        label: 'Nombre',
        advanceDescription: false,
        description: '',
        avgTime: '',
        difficulty: 0,
        ingredients: [
            {
                name: '',
                quantity: '',
            }
        ]
    },
])

const validate = (state: any): FormError[] => {
  const errors: FormError[] = []
  if (state.avgTime && state.avgTime.length >= 15) errors.push({ path: 'avgTime', message: 'The average time is to long' })
//   if (!state.surname) errors.push({ path: 'surname', message: 'Requerido' })
  return errors
}

const form = ref()

async function submit () {
    await form.value!.validate()

    setVersionData()

    cleanEmptyElements()

    deleteAdditionalImages()

    recipeStore
        .edit(state.value)
        .then(() => {
            toast.add({ title: '¡Receta actualizada con éxito!' })
        })
}

function cleanEmptyElements () {
    if (state.value.ingredients.length && state.value.ingredients[0].name === '') {
        state.value.ingredients = []
    }

    if (state.value.steps.length && state.value.steps[0].description === '') {
        state.value.steps = []
    }
}

function setVersionData () {
    if (accordionVersions.value.length > 0) {
        state.value.versions = []
        accordionVersions.value.forEach(version => {
            const cleanVersion = {
                name: version.label,
                description: version.description,
                avgTime: version.avgTime,
                difficulty: version.difficulty,
                ingredients: version.ingredients
            }

            state.value.versions.push(cleanVersion)
        })
    }
}

function changeFeaturedImg (event: any) {
    const fileObj = event.target.files
    // @ts-ignore comment
    newFeaturedImage.value = new FormData() // @ts-ignore comment
    newFeaturedImage.value.append('file', fileObj[0]) // @ts-ignore comment
    newFeaturedImage.value.append('path', `/recipes/${state.value._id}/featured-img`)
    
    // Set preview
    newFeaturedImagePreview.value = URL.createObjectURL(fileObj[0])
}

async function replaceFeaturedImage () {
    const featuredImage = await recipeStore.uploadFeaturedImage(newFeaturedImage.value)
    state.value.featuredImg = featuredImage.uploadedImage.Location
    await submit()

    cancelNewFeaturedImage()
}

function cancelNewFeaturedImage () {
    newFeaturedImage.value = new FormData()
    newFeaturedImagePreview.value = ''
}


async function changeAdditionalImages (event: any) {

    rawAdditionalImages.value = Array.from(event.target.files)
    const fileObj = await event.target.files

    for (let index = 0; index < fileObj.length; index++) {
        const imageUrl = URL.createObjectURL(fileObj[index])
        // @ts-ignore comment
        newAdditionalImagesPreview.value.push(imageUrl)
    }
}

function removeNewAdditionalImage (imageToRemove: number) {
    rawAdditionalImages.value.splice(imageToRemove, 1)
    newAdditionalImagesPreview.value.splice(imageToRemove, 1)
}

function removeAdditionalImage (imageToRemove: number) {
    const removedImage = state.value.media.splice(imageToRemove, 1)
    additionalImagesToDelete.value.push(...removedImage)
}

function cancelNewAdditionalImages () {
    newAdditionalImages.value = new FormData()
    newAdditionalImagesPreview.value = []
}

async function replaceAdditionalImages () {
    // Add the path
    newAdditionalImages.value.append('path', `/recipes/${state.value._id}/media`)

    for (let index = 0; index < rawAdditionalImages.value.length; index++) {
        // @ts-ignore comment
        newAdditionalImages.value.append('file[]', rawAdditionalImages.value[index])
    }

    const newImages = await recipeStore.uploadAdditionalImages(newAdditionalImages.value)
    const additionalImages = newImages.uploadedImages.map(image => image.Location)

    state.value.media.push(...additionalImages)
    await submit()

    cancelNewAdditionalImages()
}

/**
 * Delete the images, we dont need to wait for this and is done asyncronously
 */
function deleteAdditionalImages () {
    userStore.deleteFiles(additionalImagesToDelete.value)
}

// Ingredients
function addIngredientRow () {
    state.value.ingredients.push({
        name: '',
        quantity: '',
    })
}

function removeIngredientRow (ingredientToRemove: String) {
    
    const ingredientPosition = state.value.ingredients.findIndex(ingredient => ingredient.name === ingredientToRemove)

    state.value.ingredients.splice(ingredientPosition, 1)
}

// Versions
function addVersionRow () {
    accordionVersions.value.push(
        {
        label: 'Nombre',
        advanceDescription: false,
        description: '',
        avgTime: '',
        difficulty: 0,
        ingredients: [
            {
                name: '',
                quantity: '',
            }
        ]
    }
    )
}

function addVersionIngredientRow (versionPosition: number) {
    accordionVersions.value[versionPosition].ingredients.push({
        name: '',
        quantity: '',
    })
}

function removeVersionIngredientRow (ingredientToRemove: String, versionPosition: number) {

    const ingredientPosition = accordionVersions.value[versionPosition].ingredients.findIndex(ingredient => ingredient.name === ingredientToRemove)

    accordionVersions.value[versionPosition].ingredients.splice(ingredientPosition, 1)
}

function removeVersionRow (versionPosition: number) {
    accordionVersions.value.splice(versionPosition, 1)
}

function importOriginalInfo (versionPosition: number) {
    accordionVersions.value[versionPosition].label = state.value.title
    accordionVersions.value[versionPosition].ingredients = state.value.ingredients
}

// Steps
function addStepRow () {
    let order
    if (state.value.steps.length) {
        const lastStep = state.value.steps[state.value.steps.length - 1]
        order = lastStep.order + 1
    } else {
        order = 1
    }
    
    state.value.steps.push({
        order,
        description: '',
    })
}

function removeStepRow (stepToRemove: Number) {
    
    const stepPosition = state.value.steps.findIndex(step => step.order === stepToRemove)
    state.value.steps.splice(stepPosition, 1)

    orderSteps()
}

function orderSteps () {
    state.value.steps.forEach((step, index) => {
        step.order = index + 1
    })
}

function setInitialRecipeData (recipe: types.Recipe) {
    state.value._id = recipe._id
    state.value.title = recipe.title
    state.value.description = recipe.description
    state.value.notes = recipe.notes
    state.value.avgTime = recipe.avgTime
    state.value.difficulty = recipe.difficulty
    state.value.published = recipe.published
    state.value.onProgress = recipe.onProgress
    state.value.featuredImg = recipe.featuredImg
    state.value.media = recipe.media
    state.value._id = recipe._id
    
    if (recipe.ingredients && recipe.ingredients.length > 0) {
        state.value.ingredients = recipe.ingredients
    }
    
    if (recipe.steps && recipe.steps.length > 0) {
        state.value.steps = recipe.steps
    }

    if (recipe.versions && recipe.versions.length > 0) {
        state.value.versions = recipe.versions
        setAccordionVersionsData(recipe.versions)
    }
}

function setAccordionVersionsData (versions: types.Version[]) {
    accordionVersions.value = []
    
    versions.forEach(version => {
        const formatedVersion = {
            label: version.name,
            advanceDescription: false,
            description: version.description,
            avgTime: version.avgTime,
            difficulty: version.difficulty,
            ingredients: version.ingredients
        }

        accordionVersions.value.push(formatedVersion)
    })
}

onNuxtReady(async () => {
    const recipeId = route.params.id as String
    const recipe = await recipeStore.loadRecipeData(recipeId)
    console.log(recipe)
    setInitialRecipeData(recipe)
})
</script>

<template>
    <div class="flex items-center justify-center">
        <UForm
            ref="form"
            :validate="validate"
            :state="state"
            @submit.prevent=""
            class="bg-white p-12 rounded-lg border-2 w-[80%]"
        >
            <div class="grid grid-cols-3 gap-5">
                <div>
                    <UFormGroup name="username" label="Título" class="mt-3">
                        <UInput v-model="state.title" />
                    </UFormGroup> 
                </div>
                <div>
                    <UFormGroup name="avgTime" label="Tiempo medio" class="mt-3">
                        <UInput v-model="state.avgTime" placeholder="1h 30min" />
                    </UFormGroup> 
                </div>
                <div>
                    <UFormGroup name="difficulty" label="Dificultad" class="mt-3">
                        <UInput disabled v-model="state.difficulty" class="hidden" />
                        <NuxtRating :read-only="false" ratingContent="🍴" activeColor="#6366f1" :ratingValue="state.difficulty" />
                    </UFormGroup> 
                </div>
            </div>
            <div class="mt-5">
                <div class="flex gap-3 items-center pb-2">
                    <label class="block font-medium text-gray-700 dark:text-gray-200" for="description">Descripción</label>
                    <UToggle v-model="formManagement.advanceDescription" on-icon="i-heroicons-check-20-solid" off-icon="i-heroicons-x-mark-20-solid" />
                </div>
                <NKRichEditor v-if="formManagement.advanceDescription" v-model="state.description" />
                <UTextarea v-else :rows="8" variant="outline" v-model="state.description" />
            </div>

            <div class="mt-5 grid grid-cols-2 gap-5">
                <div class="flex justify-center align-center flex-col gap-5 p-5">
                    <UFormGroup name="username" label="Imagen destacada" class="mt-3">
                        <div class="bg-contain bg-center bg-no-repeat h-52 my-5" v-if="!newFeaturedImagePreview" :style="'background-image: url(' + state.featuredImg + ');'"></div>
                        <div class="bg-contain bg-center bg-no-repeat h-52 my-5" v-else :style="'background-image: url(' + newFeaturedImagePreview + ');'"></div>
                        <UInput @change="changeFeaturedImg" icon="i-heroicons-pencil-square" class="mt-3" type="file" />
                        <div v-if="newFeaturedImagePreview" class="flex justify-center mt-5 gap-3">
                            <UButton label="Actualizar imagen destacada" @click="replaceFeaturedImage" icon="i-heroicons-pencil" size="sm" color="primary" square variant="outline" />
                            <UButton @click="cancelNewFeaturedImage" icon="i-heroicons-x-mark" size="sm" color="red" square variant="outline" />
                        </div>
                    </UFormGroup>
                </div>
                <div class="grid grid-cols-1">
                    <div>
                        <div class="flex align-center items-center gap-4 mb-4">
                            <label class="block font-medium text-gray-700 dark:text-gray-200" for="description">Imagenes adicionales</label>
                            <UInput @change="changeAdditionalImages" :multiple="true" icon="i-heroicons-pencil-square" type="file" />
                        </div>
                        <div>
                            <div v-if="state.media.length > 0" class="mt-4">
                                <label class="block font-medium text-gray-700 dark:text-gray-200" for="description">Imagenes actuales</label>
                                <div class="grid grid-cols-4 gap-4">
                                    <div class="preview img relative" v-for="(media, index) in state.media">
                                        <div class="bg-contain bg-center bg-no-repeat h-12 border my-5" :style="'background-image: url(' + media + ');'"></div>
                                        <UButton @click="removeAdditionalImage(index)" icon="i-heroicons-x-circle" size="sm" class="absolute top-3 right-[-8px] bg-white" color="primary" :padded="false" variant="ghost" />
                                    </div>
                                </div>
                            </div>
                            <div v-if="newAdditionalImagesPreview.length > 0" class="mt-4">
                                <label class="block font-medium text-gray-700 dark:text-gray-200" for="description">Imagenes nuevas</label>
                                <div class="grid grid-cols-4 gap-4">
                                    <div class="preview img relative" v-for="(preview, index) in newAdditionalImagesPreview">
                                        <div class="bg-contain bg-center bg-no-repeat h-12 border my-5" :style="'background-image: url(' + preview + ');'"></div>
                                        <UButton @click="removeNewAdditionalImage(index)" icon="i-heroicons-x-circle" size="sm" class="absolute top-3 right-[-8px] bg-white" color="primary" :padded="false" variant="ghost" />
                                    </div>
                                </div>
                                <div v-if="newAdditionalImagesPreview.length > 0" class="flex justify-center mt-5 gap-3">
                                    <UButton label="Actualizar imagenes" @click="replaceAdditionalImages" icon="i-heroicons-pencil" size="sm" color="primary" square variant="outline" />
                                    <UButton @click="cancelNewAdditionalImages" icon="i-heroicons-x-mark" size="sm" color="red" square variant="outline" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <UFormGroup class="mt-5" name="notes" label="Notas adicionales">
                        <UTextarea :rows="3" variant="outline" v-model="state.notes" />
                    </UFormGroup>
                </div>
            </div>

            <hr class="mt-5 mb-5">

            <div class="mt-5 grid grid-cols-2">
                <div>
                    <div class="flex gap-3 items-center pb-2">
                        <label class="block font-medium text-gray-700 dark:text-gray-200" for="description">Ingredientes</label>
                        <UButton @click="addIngredientRow" icon="i-heroicons-plus" size="xs" color="primary" square variant="outline" />
                    </div>
                    <div>
                        <div class="border flex align-center flex-row gap-3 justify-start p-1 mb-2 rounded-md w-[80%]" v-for="ingredient in state.ingredients">
                            <div><UInput icon="i-material-symbols-kitchen-outline" placeholder="Tomates" v-model="ingredient.name" color="gray" variant="outline" /></div>
                            <div><UInput icon="i-icon-park-outline-weight" placeholder="200 g" color="gray" v-model="ingredient.quantity" variant="outline" /></div>
                            <div class="h-full my-auto"><UButton @click="removeIngredientRow(ingredient.name)" icon="i-heroicons-minus" size="xs" color="gray" square variant="outline" /></div>
                        </div>
                    </div>
                </div>  
                <div>
                    <div class="flex gap-3 items-center pb-2">
                        <label class="block font-medium text-gray-700 dark:text-gray-200" for="description">Pasos</label>
                        <UButton @click="addStepRow" icon="i-heroicons-plus" size="xs" color="primary" square variant="outline" />
                    </div>
                    <div>
                        <VueDraggableNext :list="state.steps" @change="orderSteps">
                            <div class="border flex align-center flex-row gap-4 justify-start p-2 mb-2 rounded-md w-[100%]" v-for="step in state.steps">
                                <div class="h-full my-auto text-gray-400">{{ step.order }}</div>
                                <div class="w-full"><UTextarea :rows="2" variant="outline" placeholder="Cortamos los tomates en rodajas de unos 2 cm de ...." v-model="step.description" /></div>
                                <div class="h-full my-auto"><UButton @click="removeStepRow(step.order)" icon="i-heroicons-minus" size="xs" color="gray" square variant="outline" /></div>
                            </div>
                        </VueDraggableNext>
                    </div>
                </div>  
            </div>

            <hr class="mt-5 mb-5">

            <div class="mt-5">
                <div class="flex gap-3 items-center pb-2">
                    <label class="block font-medium text-gray-700 dark:text-gray-200" for="versions">Versiones</label>
                    <UButton @click="addVersionRow" icon="i-heroicons-plus" size="xs" color="primary" square variant="outline" />
                </div>
                <UAccordion :items="accordionVersions">
                    <template #item="{ item, index }">
                        <div>
                            <div class="flex justify-end">
                                <UButton label="Eliminar versión" color="red" variant="outline" @click="removeVersionRow(index)" />
                            </div>
                            <div class="grid grid-cols-3 gap-5">
                                <div>
                                    <UFormGroup name="username" label="Nombre versión" class="mt-3">
                                        <UInput v-model="item.label" />
                                    </UFormGroup> 
                                </div>
                                <div class="items-end flex">
                                    <UButton label="Importar nombre e ingredientes" variant="outline" @click="importOriginalInfo(index)" />
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <div class="flex gap-3 items-center pb-2">
                                        <label class="block font-medium text-gray-700 dark:text-gray-200" for="description">Descripción</label>
                                        <UToggle v-model="item.advanceDescription" on-icon="i-heroicons-check-20-solid" off-icon="i-heroicons-x-mark-20-solid" />
                                    </div>
                                    <NKRichEditor v-if="item.advanceDescription" v-model="item.description" />
                                    <UTextarea v-else :rows="8" variant="outline" v-model="item.description" />
                                </div>
                                <div>
                                    <div class="flex gap-3 items-center pb-2">
                                        <label class="block font-medium text-gray-700 dark:text-gray-200" for="description">Ingredientes</label>
                                        <UButton @click="addVersionIngredientRow(index)" icon="i-heroicons-plus" size="xs" color="primary" square variant="outline" />
                                    </div>
                                    <div>
                                        <div class="border flex align-center flex-row gap-3 justify-start p-1 mb-2 rounded-md w-[80%]" v-for="ingredient in item.ingredients">
                                            <div><UInput icon="i-material-symbols-kitchen-outline" placeholder="Tomates" v-model="ingredient.name" color="gray" variant="outline" /></div>
                                            <div><UInput icon="i-icon-park-outline-weight" placeholder="200 g" color="gray" v-model="ingredient.quantity" variant="outline" /></div>
                                            <div class="h-full my-auto"><UButton @click="removeVersionIngredientRow(ingredient.name, index)" icon="i-heroicons-minus" size="xs" color="gray" square variant="outline" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </UAccordion>
            </div>

            <UButton block class="mt-5" label="Guardar" @click="submit" />
        </UForm>
    </div>
</template>
