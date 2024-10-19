import BaseApi from '@/service/axios'

//try to set the bearrer header before you mutate this

export interface LoginAndLogoutAuditInterface {
    Is_Mobile: boolean
    Emp_Name: string
}

export interface auditInterface {
    Is_Mobile: boolean
    Emp_Name: string | undefined
    Page_Name: string
    Parent_Menu_ID?: number
    Sub_Menu_ID?: number
    Child_Menu_ID?: number
    Record_Name?: string
}

export interface createAuditInterface extends auditInterface {
    ValueAfter: Record<string, any>
}

export interface updateAuditInterface extends auditInterface {
    ValueAfter: Record<string, any>
    ValueBefore: Record<string, any>
}

export interface deleteAuditInterface extends auditInterface {
    ValueBefore: Record<string, any>
}

export interface getAuditInterface extends auditInterface {
    Detail: Record<string, any> | Record<string, any>[]
}

export interface userDataInterface {
    user_id: number
    company_id: number
    tenant_id: number
    employee_name: string
    is_admin?: boolean
    role_id?: number
}

const path = 'main/audit-trail'

export const loginAudit = async (data: LoginAndLogoutAuditInterface): Promise<any> => {
    try {
        const response = await BaseApi.post('main/audit-trail/login', data)
        return response.data
    } catch (error: any) {
        throw error
    }
}

export const logoutAudit = async (data: LoginAndLogoutAuditInterface): Promise<any> => {
    try {
        const response = await BaseApi.post('main/audit-trail/logout', data)
        return response.data
    } catch (error: any) {
        throw error
    }
}

// Function to exclude a key from an object
export function excludeKey<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    key: K,
): Omit<T, K> {
    const { [key]: excluded, ...rest } = obj
    return rest
}

export const createAudit = async (data: createAuditInterface): Promise<any> => {
    try {
        const response = await BaseApi.post(`${path}/post`, data)
        return response.data
    } catch (error: any) {
        throw error
    }
}

export const updateAudit = async (data: updateAuditInterface): Promise<any> => {
    try {
        const response = await BaseApi.post(`${path}/put`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteAudit = async (data: deleteAuditInterface): Promise<any> => {
    try {
        const response = await BaseApi.post(`${path}/del`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getAudit = async (data: getAuditInterface): Promise<any> => {
    try {
        const response = await BaseApi.post(`${path}/get`, data)
        return response.data
    } catch (error) {
        throw error
    }
}
