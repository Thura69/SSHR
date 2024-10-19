export type CreateJobGradeType = {
    name: string
    description?: string
    isActive: boolean
}

export type UpdateJobGradeType = {
    name: string
    description?: string
    isActive: boolean
    id: number
}

export type JobGradeColumnDefType = {
    name: string
    description: string
    isActive: boolean
    id: number
}

export type JobGradeFormType = {
    name: string
    description?: string
    isActive: boolean
}
