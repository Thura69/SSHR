import BaseApi from '@/service/axios'
import { CreateVaccineType } from '@/types/setting/vaccine-type'

const url = 'main/vaccines'

export const getAllVaccine = async (query: string) => {
    try {
        const response = await BaseApi.get(`${url}?${query}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const createVaccine = async (data: CreateVaccineType): Promise<any> => {
    try {
        const payload = {
            vaccine_type_id: data.vaccineTypeId,
            vaccine_name: data.name,
            is_active: data.status,
            description: data.description,
        }

        const response = await BaseApi.post(url, payload)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const updateVaccine = async (data: CreateVaccineType): Promise<any> => {
    const { id } = data
    try {
        const payload = {
            vaccine_type_id: data.vaccineTypeId,
            vaccine_name: data.name,
            is_active: data.status,
            description: data.description,
        }

        const response = await BaseApi.patch(`${url}/${id}`, payload)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const deleteVaccine = async (id: number): Promise<any> => {
    try {
        const response = await BaseApi.delete(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
