export type CreateJobCategoryType = {
    name: string
    description?: string
    isActive: boolean
}

export type UpdateJobCategoryType = {
    name: string
    description?: string
    isActive?: boolean
    id: number
}

export type JobCategoryColumnDefType = {
    name: string
    description: string
    status: boolean
    id: number
}

export type JobCategoryFormType = {
    name: string
    description?: string
    isActive: boolean
}
