import BaseApi from '@/service/axios'
import {
    CreatePositionType,
    UpdatePositionType,
} from '@/types/setting/position-type'

// const url = 'http://82.208.22.253:9000/api/v1.0/main/positions'
const url = 'main/positions'

export const getAllPosition = async (query: string) => {
    try {
        const response = await BaseApi.get(`${url}?${query}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const createPosition = async (
    data: CreatePositionType,
): Promise<any> => {
    const {
        name,
        isActive,
        jobCategory,
        benefits,
        description,
        remarks,
        specification,
        department,
    } = data
    try {
        const payload = {
            Position_Name: name,
            Job_Description: description,
            IsActive: isActive,
            JobCategory_ID: jobCategory,
            Job_Specifications: specification,
            Benefits: benefits,
            Remarks: remarks,
            Department_ID: department,
        }

        const response = await BaseApi.post(url, payload)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const updatePosition = async (
    data: UpdatePositionType,
): Promise<any> => {
    const {
        description,
        isActive,
        name,
        id,
        benefits,
        jobCategory,
        remarks,
        specification,
        department,
    } = data
    try {
        const payload = {
            Position_Name: name,
            Job_Description: description,
            IsActive: isActive,
            JobCategory_ID: jobCategory,
            Job_Specifications: specification,
            Benefits: benefits,
            Remarks: remarks,
            Department_ID: department,
        }
        const response = await BaseApi.patch(`${url}/${id}`, payload)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const deletePosition = async (id: number): Promise<any> => {
    try {
        const response = await BaseApi.delete(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const getOnePosition = async (id: number): Promise<any> => {
    try {
        const response = await BaseApi.get(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
