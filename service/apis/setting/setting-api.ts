import BaseApi from '@/service/axios'
import {
    CreateSettingType,
    menuTypes,
    UpdateSettingType,
} from '@/types/setting'

import { menuMapObj } from './setting-map-obj'

const baseUrl = 'employee'

export const getAllReocrds = async (query: string, menuName: menuTypes) => {
    try {
        const endpoint = menuMapObj[menuName].endpoint
        const url = `${baseUrl}/${endpoint}`
        const response = await BaseApi.get(`${url}?${query}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const createRecord = async (
    data: CreateSettingType,
    menuName: menuTypes,
): Promise<any> => {
    try {
        const endpoint = menuMapObj[menuName].endpoint
        const url = `${baseUrl}/${endpoint}`
        const fields = menuMapObj[menuName].fields
        const { name, description, isActive } = data
        const payload = {
            [fields['name']]: name,
            [fields['description']]: description,
            [fields['isActive']]: isActive,
        }

        const response = await BaseApi.post(url, payload)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const updateRecord = async (
    data: UpdateSettingType,
    menuName: menuTypes,
): Promise<any> => {
    const endpoint = menuMapObj[menuName].endpoint
    const url = `${baseUrl}/${endpoint}`
    const fields = menuMapObj[menuName].fields
    const { description, isActive, name, id } = data
    try {
        const payload = {
            [fields['name']]: name,
            [fields['description']]: description,
            [fields['isActive']]: isActive,
        }
        const response = await BaseApi.patch(`${url}/${id}`, payload)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const deleteRecord = async (
    id: number,
    menuName: menuTypes,
): Promise<any> => {
    try {
        const endpoint = menuMapObj[menuName].endpoint
        const url = `${baseUrl}/${endpoint}`
        const response = await BaseApi.delete(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
