export type User = {
    username: string
    email: string
    avatar: string
    name: string
    surname: string
    description: string
    id: string
}
  
export type EditUserParams = {
    name: string
    surname: string
    description: string
    id: string
    newAvatar: FormData | undefined
    avatar?: string
}

export type Recipe = {
    _id: string
    title: string
    description: string
    notes: string
    avgTime: string
    difficulty: number
    published: boolean
    onProgress: boolean
    versions: []
    featuredImg: string
    media: []
    ingredients: Ingredient[]
    steps: Step[]
}

export type Ingredient = {
    name: string
    quantity: string
}

export type Step = {
    order: number
    description: string
}

export type EditRecipeParams = {
    _id: string
    title: string
    description: string
    notes: string
    avgTime: string
    difficulty: number
    published: boolean
    onProgress: boolean
    versions: array
    featuredImg: string
    media: array
    userId?: string
    ingredients: Ingredient[]
    steps: Step[]
}

export type ImgObject = {
    uploadedImage: {
        ETag: string
        ServerSideEncryption: string
        Location: string
        Bucket: string
        Key: string
    }
}

