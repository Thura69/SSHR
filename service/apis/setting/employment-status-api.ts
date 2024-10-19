// createEmpStatus,
// deleteEmpStatus,
// getAllEmpStatuses,
// updateEmpStatus,

import BaseApi from "@/service/axios"

const url = '/common/employment-statues'

export const getAllEmpStatuses = async (query: string) => {
    try {
        const response = await BaseApi.get(`${url}?${query}`);
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}



// export const deleteEmpStatus = async()