export type PositionFormType = {
    name: string
    description?: string
    isActive: boolean
    jobCategory: number
    specification?: string
    benefits?: string
    remarks?: string
    department: number
}

export type CreatePositionType = {
    name: string
    description?: string
    isActive: boolean
    jobCategory: number
    specification?: string
    benefits?: string
    remarks?: string
    department: number
}

export type UpdatePositionType = {
    name: string
    description?: string
    isActive: boolean
    jobCategory: number
    department: number
    specification?: string
    benefits?: string
    remarks?: string
    id: number
}

export type PositionColDefType = {
    name: string
    status: boolean
    id: number
    totalEmployees: number
    jobCategory_Name: string
}

export type PositionType = {
    position_id: number
    position_name: string
    job_description: string
    job_specifications: string
    benefits: string
    department_id: number
    created_date: Date
    edited_date?: Date
    created_by: number
    edited_by: number
    is_active: boolean
    jobcategory_id: number
    tenant_id: number
    totalEmployees: number
    jobCategory: string
    remarks: string
}
