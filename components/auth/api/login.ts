import BaseApi from '@/service/axios'

export const postLogin = async (data: {
    email: string
    password: string
    is_mobile: boolean
}): Promise<any> => {
    try {
       
        const response = await BaseApi.post('/auth/login', data)
        return response.data
    } catch (error: any) {
        throw error
    }
}

export const getRemainingDays = async () => {
    const response = await BaseApi.get('main/trial/remaining-days')
    return response.data
}
