import BaseApi from '@/service/axios'

const url = '/common/departments'

export const getAllDepartments = async (query: string) => {
    try {
        const response = await BaseApi.get(`${url}?${query}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const createDepartments = async (payload: any) => {
    try {
        const response = await BaseApi.post(`${url}`, payload)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const deleteDepartment = async (id: number): Promise<any> => {
    try {
        const response = await BaseApi.delete(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const getOneDepartmentSetup = async (id: any) => {
    try {
        const response = await BaseApi.get(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new ErrorEvent(error.response.data.message)
    }
}

export const updateDepartment = async (data: any) => {
    try {
        const { id } = data

        const response = await BaseApi.patch(`${url}/${id}`, data)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
