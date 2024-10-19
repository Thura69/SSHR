export interface MenuLanguage {
    original: string
    mobile_original: string
    mobile_translated: string
    translated: string
    menu_language_id: number
}

export interface GrandSubMenu {
    company_id: number
    is_active: boolean
    is_delete: boolean
    is_edit: boolean
    is_export: boolean
    is_import: boolean
    is_read: boolean
    is_write: boolean
    is_employee_profile: boolean
    is_sub_menu: boolean
    menu_id: number
    menu_name: string
    menu_order: number
    mobile_menu_name: string
    parent_menu_id: number
    web_url: string
}

export interface Menu {
    web_url?: string
    parent_menu_id?: number // This may or may not be optional based on your data structure
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
    tbl_menu_language?: MenuLanguage[]
    children?: this[]
    menu_id: number
    menu_name: string
    mobile_menu_name: string
    original_icon?: string
    hover_icon?: string
    is_employee_permission?: boolean
}
