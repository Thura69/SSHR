export interface Role {
    role_id: number
    role_name: string
    description: string
    edited_date: string
    created_by: number
    created_date: string
    edited_by: number
    is_active: boolean
    tenant_id: number
    is_admin: boolean
    action?: any
}

export interface RoleMeta {
    totalCount: number
    perPage: number
    currentPage: number
}

export interface RoleResponse {
    message: string
    data: Role[]
    meta: RoleMeta
}


export interface RoleUser {
    company_id: number
    employee_id: number
    location_id: number
    branch_id: number
    department_id: number
    section_id: number
    position_id: number
    employee_name?: string
    section_name?: string
    department_name?: string
    company_name?: string
    position_name?: string
    location_name?: string
    branch_name?: string
}

export type TableColumnProps = {
    positionOptions: Record<'label' | 'value', string>[]
    locationOptions: Record<'label' | 'value', string>[]
    branchOptions: Record<'label' | 'value', string>[]
    departmentOptions: Record<'label' | 'value', string>[]
    sectionOptions: Record<'label' | 'value', string>[]
    companyOptions: Record<'label' | 'value', string>[]
    handleRemove: (employeeObj: any) => void
}

export interface RoleOption {
    label: string
    value: string
}
