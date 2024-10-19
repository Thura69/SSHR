import BaseApi from '@/service/axios'
import { queryStringGenerator } from '@/lib/utils'
import { RoleResponse } from '@/types/role'

const allRoleUrl = 'auth/roles'
const roleDynamicMenuUrl = 'auth/roles/dynamic-menu'
const vEmployeeUrl = 'auth/employee/v-employee'
const saveRole = 'auth/roles/save'
const editRoleUrl = 'auth/roles/edit'
const getRoleByIdUrl = 'auth/roles/saved-role'
const deleteRoleUrl = 'auth/roles'
const getRoleFiltersUrl = 'auth/roles/distinct/filter'
const getEmpByFiltersUrl = 'auth/roles/by-emp'
const getRoleFiltersByCompanyUrl = 'auth/roles/company/filter'
const getRoleFiltersByLocationUrl = 'auth/roles/location/filter'
const getRoleFiltersByBranchUrl = 'auth/roles/branch/filter'
const getRoleFiltersByDepartmentUrl = 'auth/roles/department/filter'

export const getAllRoles = async (query: string): Promise<RoleResponse> => {
    try {
        const response = await BaseApi.get(`${allRoleUrl}?${query}`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ?? 'Error fetching all roles',
        )
    }
}

export const getRoleById = async (roleId: string) => {
    try {
        const response = await BaseApi.get(`${getRoleByIdUrl}/${roleId}`)


        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ??
                `Error fetching role with id ${roleId}`,
        )
    }
}

export const deleteRoleById = async (roleId: string) => {
    try {
        const response = await BaseApi.delete(`${deleteRoleUrl}/${roleId}`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ??
                `Error deleting role with id ${roleId}`,
        )
    }
}

export const getRoleDynamicMenu = async (query: string) => {
    try {
        const response = await BaseApi.get(`${roleDynamicMenuUrl}?${query}`)

        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ??
                'Error fetching role dynamic menus',
        )
    }
}

export const getVEmployee = async (query: string) => {
    try {
        const response = await BaseApi.get(`${vEmployeeUrl}?${query}`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ?? 'Error fetching v-employee list',
        )
    }
}

export const createRole = async (payload: any) => {
    try {
        const response = await BaseApi.post(saveRole, payload)
        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ?? 'Error creating all role',
        )
    }
}

export const editRole = async ({
    payload,
    roleId,
}: {
    payload: any
    roleId: string
}) => {
    try {
        const response = await BaseApi.patch(
            `${editRoleUrl}/${roleId}`,
            payload,
        )
        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ?? `Error editing role - ${roleId}`,
        )
    }
}

export const getRoleFilters = async () => {
    try {
        const response = await BaseApi.get(`${getRoleFiltersUrl}`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ?? 'Error at getting role filters',
        )
    }
}

export const getRoleFiltersByCompany = async ({
    company_id,
}: {
    company_id: number | string
}) => {
    const query = queryStringGenerator({ company_id })

    try {
        const response = await BaseApi.get(
            `${getRoleFiltersByCompanyUrl}?${query}`,
        )
        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ?? 'Error at getting role filters',
        )
    }
}

export const getRoleFiltersByLocation = async ({
    company_id,
    location_id,
}: {
    company_id?: number | string
    location_id: number | string
}) => {
    const query = queryStringGenerator({
        company_id,
        location_id,
    })
    try {
        const response = await BaseApi.get(
            `${getRoleFiltersByLocationUrl}?${query}`,
        )
        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ?? 'Error at getting role filters',
        )
    }
}

export const getRoleFiltersByBranch = async ({
    company_id,
    location_id,
    branch_id,
}: {
    company_id?: number | string
    location_id?: number | string
    branch_id: number | string
}) => {
    const query = queryStringGenerator({
        company_id,
        location_id,
        branch_id,
    })
    try {
        const response = await BaseApi.get(
            `${getRoleFiltersByBranchUrl}?${query}`,
        )
        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ?? 'Error at getting role filters',
        )
    }
}

export const getRoleFiltersByDepartment = async ({
    company_id,
    location_id,
    branch_id,
    department_id,
}: {
    company_id?: number | string
    location_id?: number | string
    branch_id?: number | string
    department_id: number | string
}) => {
    const query = queryStringGenerator({
        company_id,
        location_id,
        branch_id,
        department_id,
    })
    try {
        const response = await BaseApi.get(
            `${getRoleFiltersByDepartmentUrl}?${query}`,
        )
        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ?? 'Error at getting role filters',
        )
    }
}

export const getEmployeeByFilters = async (query: string) => {
    try {
        const response = await BaseApi.get(`${getEmpByFiltersUrl}?${query}`)
        return response.data
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ?? 'Error at getting role filters',
        )
    }
}
