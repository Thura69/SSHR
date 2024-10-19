import BaseApi from '@/service/axios'

const url = 'email-noti/notification-alerts'

export const getAllNotificationAndAlert = async (query: string) => {
    try {
        const response = await BaseApi.get(`${url}?${query}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const updateAllNotificationAndAlert = async (data: any) => {
    try {
        const { id } = data
        const response = await BaseApi.patch(`${url}`, data)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
