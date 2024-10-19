import BaseApi from '@/service/axios'

const url = 'common/public-holidays'

export const getAllPublicHoliday = async (query: string) => {
    try {
        const response = await BaseApi.get(`${url}?${query}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const createPublicHoliday = async (data: any) => {
    try {
        data['Active'] = true
        data['Pay_HolidayType'] = true

        const response = await BaseApi.post(`${url}`, data)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const getPublicHolidayCopy = async (payload: any): Promise<any> => {
    try {
        const { currentId, targetId } = payload
        const response = await BaseApi.get(
            `${url}/copy/${currentId}/${targetId}`,
        )
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const getPublicHolidayByFinancial = async (id: number): Promise<any> => {
    try {
        const response = await BaseApi.get(`${url}?financial_year_id=${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const updatePublicHoliday = async (data: any): Promise<any> => {
    const { id } = data

    try {
        const response = await BaseApi.patch(`${url}/${id}`, data)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const createMany = async (data: any): Promise<any> => {
    try {
        const response = await BaseApi.post(`${url}/create-many`, data)
        return response
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const deletePublicHoliday = async (id: number): Promise<any> => {
    try {
        const response = await BaseApi.delete(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
