import BaseApi from '@/service/axios'

const ViewEmployeeUrl = 'auth/employee/v-employee'
const userRoleFilterUrl = 'auth/users/role'
const userUrl = 'auth/users'
const userFilterUrl = 'auth/roles/filter'
const getVUser = 'auth/users/v-user'

export interface CreateUserInterface {
    Role_ID?: number
    Employee_ID?: number
    Password?: string
    Description?: string
    IsActive?: boolean | undefined
    Company_ID?: number
}

export interface EditUserInterface extends CreateUserInterface {
    id?: number
}

export const getUserFilters = async (query: string): Promise<any> => {
    try {
        const response = await BaseApi.get(`${userFilterUrl}?${query}`)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching User options',
        )
    }
}

export const getUserRoleFilters = async (query: string) => {
    try {
        const response = await BaseApi.get(`${userRoleFilterUrl}?${query}`)
        return response.data
    } catch (error) {
        throw new Error('Error fetching users')
    }
}

export const getUsersApi = async (query: string) => {
    try {
        const response = await BaseApi.get(`${userUrl}?${query}`)
        return response.data
    } catch (error) {
        throw new Error('Error fetching users')
    }
}

export const getUserApi = async (query: string) => {
    try {

        console.log(query)

        const response = await BaseApi.get(`${ViewEmployeeUrl}?${query}`)
        return response.data
    } catch (error) {
        throw new Error('Error fetching users')
    }
};

export const editUserApi = async (payload: EditUserInterface): Promise<any> => {
    try {
        const response = await BaseApi.patch(
            `${userUrl}/${payload.id}`,
            payload,
        )
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const deleteUserApi = async (User_ID: string) => {
    try {
        const response = await BaseApi.delete(`${userUrl}/${User_ID}`)
        return response.data
    } catch (error) {
        throw new Error('Error deleting users')
    }
}

export const createUserApi = async (
    payload: CreateUserInterface,
): Promise<any> => {
    try {
        const response = await BaseApi.post(userUrl, payload)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const getAllVUsersApi = async () => {
    try {
        const response = await BaseApi.get(getVUser)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
