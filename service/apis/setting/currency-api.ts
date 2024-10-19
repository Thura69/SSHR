import BaseApi from '@/service/axios'
import { CreateCurrencyType } from '@/types/setting/currency'

const url = 'main/currencies'

export const createCurreniesApi = async (
    data: CreateCurrencyType,
): Promise<any> => {
    try {
        const payload = {
            CurrencyType: data.currencyType,
            Default_Currency: data.default,
            Description: data.description,
            IsActive: true,
        }
        const response = await BaseApi.post(url, payload)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const getAllCurrenciesApi = async (query: string) => {
    try {
        const response = await BaseApi.get(`main/currencies?&${query}`)
        return response.data
    } catch (error) {
        throw new Error('Error fetching currencies')
    }
}

export const updateCurreniesApi = async (
    data: CreateCurrencyType,
): Promise<any> => {
    const { id } = data

    const payload = {
        CurrencyType: data?.currencyType,
        Default_Currency: data?.default!,
        Description: data?.description,
    }

    try {
        const response = await BaseApi.patch(`${url}/${id}`, payload)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const deleteCurrenciesApi = async (id: number): Promise<any> => {
    try {
        const response = await BaseApi.delete(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
