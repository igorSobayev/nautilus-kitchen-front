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

export type ImgObject = {
    uploadedImage: {
        ETag: string
        ServerSideEncryption: string
        Location: string
        Bucket: string
        Key: string
    }
}

