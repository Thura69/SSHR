import BaseApi from '@/service/axios'

const getDepartmentOrgchartUrl = 'main/org-chart/department'

export const getDepartmentOrgchart = async (query: string) => {
    try {
        const response = await BaseApi.get(
            `${getDepartmentOrgchartUrl}?${query}`,
        )
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ??
                'Error at fetching department orgchart data',
        )
    }
}
