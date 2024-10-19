import { FormInputs } from '@/components/setting/financial-year/financial-create-form'
import BaseApi from '@/service/axios'
import { format } from 'date-fns'

const url = '/common/financial-years'

export const getAllFinancialApi = async (query: string) => {
    try {
        const response = await BaseApi.get(`${url}?${query}`)
        return response.data
    } catch (error) {
        throw new Error('Error fetching users')
    }
};

export const getAllPureFinancialApi =  async()=>{
    try{
        const response = await BaseApi.get(`${url}?size=1000`)
        return response.data
    }catch(error){
        throw new Error("Error fetching users");
    }
}

export const createFinancialApi = async (data: FormInputs): Promise<any> => {
    try {
        const payload = {
            financial_year_name: data.financialYearName,
            calendar_year_from_date: format(
                data.calendarYearFrom!,
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
            ),
            calendar_year_to_date: format(
                data.calendarYearTo!,
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
            ),
            country_id: data.country,
            is_active: data.isActive,
            financial_year_from_date: format(
                data.payrollFromDate!,
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
            ),
            financial_year_to_date: format(
                data.payrollToDate!,
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
            ),
        
        }

        console.log({payload})

        const response = await BaseApi.post(url, payload)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const deleteFinancialYear = async (id: number): Promise<any> => {
    try {
        const response = await BaseApi.delete(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const updateFinancialYear = async (data: FormInputs): Promise<any> => {
    const { id } = data
    try {
        const payload = {
            financial_year_name: data.financialYearName,
            calendar_year_from_date: format(
                data.calendarYearFrom!,
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
            ),
            calendar_year_to_date: format(
                data.calendarYearTo!,
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
            ),
            country_id: data.country,
            is_active: data.isActive,
            financial_year_from_date: format(
                data.payrollFromDate!,
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
            ),
            financial_year_to_date: format(
                data.payrollToDate!,
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
            ),
        }

        const response = await BaseApi.patch(`${url}/${id}`, payload)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const getOneFinancialYear = async (id: number): Promise<any> => {
    try {
        const response = await BaseApi.get(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
