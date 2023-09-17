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
    isCombination: boolean
    published: boolean
    onProgress: boolean
    combinations: []
    featuredImg: string
    media: []
}

export type EditRecipeParams = {
    _id: string
    title: string
    description: string
    notes: string
    avgTime: string
    difficulty: number
    isCombination: boolean
    published: boolean
    onProgress: boolean
    combinations: array
    featuredImg: string
    media: array
    userId?: string
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

