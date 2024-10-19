export type CreateVaccineTypeType = {
    id?: number
    name?: string
    description?: string
    active?: boolean
}

export type VaccineTypeType = {
    created_by: number
    created_date: string
    edited_by: string
    is_active: string
    tenant_id: number
    vaccine_type_id: number
    vaccine_type_name: string
    description?: string
}

export type CreatePostVaccineTypeType = {
    vaccine_type_name: string
    is_active: boolean
    description: string
}
