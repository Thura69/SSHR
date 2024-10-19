import BaseApi from '@/service/axios'

export const GetAllDistinctCompany = async (query: string) => {
    try {
        const response = await BaseApi.get(`main/company/distinct`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const GetAllDistinctDepartment = async () => {
    try {
        const response = await BaseApi.get(`main/departments/distinct`)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const GetAllDistinctBranch = async (query: string) => {
    try {
        const response = await BaseApi.get(`main/branches/distinct`)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const GetAllDistinctLocation = async (query: string) => {
    try {
        const response = await BaseApi.get(`main/locations/distinct`)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const GetAllPostion = async (query: string) => {
    try {
        const response = await BaseApi.get('main/positions')

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const getJobCategoryDistinct = async () => {
    try {
        const response = await BaseApi.get(
            `main/job-categories/distinct?is_active=true`,
        )
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
