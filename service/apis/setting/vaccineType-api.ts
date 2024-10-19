import BaseApi from '@/service/axios'

const url = 'http://82.208.22.253:9000/api/v1.0/main/vaccine-types'

export const getAllVaccineType = async (query: string) => {
    try {
        const response = await BaseApi.get(`${url}?${query}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
