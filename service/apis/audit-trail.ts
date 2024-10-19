import BaseApi from '@/service/axios'

const getAllAuditTrailUrl = 'main/audit-trail'

export const getAllAuditTrail = async (query: string) => {
    try {
        const response = await BaseApi.get(`${getAllAuditTrailUrl}?${query}`)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching all audit trails',
        )
    }
}
