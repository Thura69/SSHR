import BaseApi from '@/service/axios'

const noti_end_point = 'main/notification-alerts/'

export const fetchAllNotifications = async (query: string) => {
    try {
        const { data: res } = await BaseApi.get(
            `${noti_end_point}notifications/?${query}`,
        )
        return res.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching all notifications',
        )
    }
}

export const readNotifications = async (Notification_ID: number[]) => {
    try {
        const { data: res } = await BaseApi.patch(
            `${noti_end_point}notifications-read`,
            { Notification_ID },
        )
        return res.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at update read notifications',
        )
    }
}
