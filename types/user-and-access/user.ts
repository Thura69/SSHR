import {
    DistinctCompany,
    DistinctLocation,
    DistinctPosition,
    DistinctRole,
    DistinctSection,
} from '../common'

export interface UserMenuInterface {
    menu_id: number
    menu_name: string
    mobile_menu_name: string
    web_url: string
    parent_menu_id: number
    menu_order: number
    is_sub_menu: boolean
    is_employee_profile: boolean
    is_read: boolean
    is_edit: boolean
    is_delete: boolean
    is_write: boolean
    is_import: boolean
    is_export: boolean
    is_active: boolean
    company_id: number
}

export interface HandleEmployeeInterface {
    employee_name?: string
    user_id?: number
    employee_id?: number
    role_id?: number
    description?: string
    is_active?: boolean
    company_id?: number
}

export interface UserPermissionInterface {
    IsEdit?: boolean
    IsDelete?: boolean
}

export const UserStatusOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
]

export interface EmployeeCardType extends EmployeeModalProps {
    toggle: () => void
    handleEmployee_ID: (data: {
        employee_name?: string
        user_id?: number
        employee_id?: number
        role_id?: number
        description?: string
        is_active?: boolean
        company_id?: number
    }) => void
    permission: UserPermissionInterface
}

export interface EmployeeModalProps {
    company_id?: number
    tenant_id?: number
    company_name: string
    employee_id: number
    location_id?: number
    location_name: string
    branch_id?: number
    branch_name: string
    department_id?: number
    department_name: string
    section_id?: number
    section_name: string
    position_id?: number
    position_name: string
    role_id?: number
    employee_name: string
    is_active: boolean
    role_name: string
    employee_no: string
    user_id: number
    email: string
    ePhoto?: string
    description: string
}

export type FilterBarSortState = {
    Employee_Name: 'asc' | 'desc' | null
    Employee_No: 'asc' | 'desc' | null
    Branch_Name: 'asc' | 'desc' | null
    Department_Name: 'asc' | 'desc' | null
    Position_Name: 'asc' | 'desc' | null
    Role_Name: 'asc' | 'desc' | null
    IsActive: 'asc' | 'desc' | null
}

export interface EmployeeData {
    company_id: number
    tenant_id: number
    company_name: string
    employee_id: number
    location_id: number
    location_name: string
    branch_id: number
    branch_name: string
    department_id: number
    department_name: string
    section_id: number
    section_name: string
    position_id: number
    position_name: string
    user_id: number
    role_id: number
    employee_name: string
    is_active: boolean
    role_name: string
    employee_no: string
}

export interface Employee {
    company_id: number
    tenant_id: number
    company_name: string
    employee_id: number
    location_id: number
    location_name: string
    branch_id: number
    branch_name: string
    department_id: number
    department_name: string
    section_id: number
    section_name: string
    position_id: number
    position_name: string
    user_id: number
    role_id: number
    employee_name: string
    is_active: boolean
    role_name: string
    employee_no: string
    email: string
    description: string
}

export interface OptionData {
    Company: DistinctCompany[]
    Position: DistinctPosition[]
    Location: DistinctLocation[]
    Section: DistinctSection[]
    Role: DistinctRole[]
}

export interface EditUserFormInputs {
    description?: string
    password?: string
    is_active?: boolean | undefined
}
