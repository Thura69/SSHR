import BaseApi from '@/service/axios'

const getEmployeeOrgchartUrl = 'main/org-chart/employee'

export const getEmployeeOrgchart = async (query: string) => {
    try {
        const response = await BaseApi.get(`${getEmployeeOrgchartUrl}?${query}`)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ??
                'Error at fetching employee orgchart data',
        )
    }
}
