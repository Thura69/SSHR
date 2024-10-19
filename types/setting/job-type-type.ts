export type CreateJobTypeType = {
    name: string
    description?: string
    isActive: boolean
}

export type UpdateJobTypeType = {
    name: string
    description?: string
    isActive?: boolean
    id: number
}

export type JobTypeColumnDefType = {
    name: string
    description: string
    status: boolean
    id: number
}

export type JobTypeFormType = {
    name: string
    description?: string
    isActive: boolean
}
