export type CreateEmpStatusType = {
    name: string
    description?: string
    isActive?: boolean
}

export type UpdateEmpStatusType = {
    name: string
    description?: string
    isActive?: boolean
    id: number
}
