export type User = {
    username: string
    email: string
    avatar: string
    name: string
    surname: string
    description: string
    id: string
    creationDate: date
    avgRating: number
    recipesNumber: string
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
    avgTime: string
    rating: number
    difficulty: number
    published: boolean
    onProgress: boolean
    versions: Version[]
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

export type Version = {
    name: string
    description: string
    avgTime: string
    difficulty: number
    ingredients: Ingredient[]
    steps: Nullable<Step[]>
}

export type EditRecipeParams = {
    _id: string
    title: string
    description: string
    avgTime: string
    difficulty: number
    published: boolean
    onProgress: boolean
    versions: Version[]
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

export type ImagesObject = {
    uploadedImages: [{
        ETag: string
        ServerSideEncryption: string
        Location: string
        Bucket: string
        Key: string
    }]
}
