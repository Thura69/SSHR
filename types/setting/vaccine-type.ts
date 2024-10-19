export type CreateVaccineType = {
    id?: number
    vaccineTypeId?: number
    name?: string
    description?: string
    status?: boolean
    vaccineTypeName?:string
}

export type VaccineType = {
    created_by:number,
    created_date:string,
    edited_by:number,
    is_active:boolean,
    tenant_id:number,
    vaccine_id:number,
    vaccine_name:string,
    vaccine_type_id:number,
    description?:string,
    vaccine_type_name:string
}

export type CreatePostVaccineType = {
    Vaccine_Name: string
    IsActive: boolean
    Description: string
}
