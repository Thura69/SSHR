import BaseApi from '@/service/axios'

const getHierarchicalUrl = 'main/organization'
const getRequestTypeUrl = 'main/organization/request-type'
const getJobGradeUrl = 'main/organization/job-grade'
const getPositionListUrl = 'main/organization/position-list'
const postHierarchicalReportUrl = 'main/organization'
const getHierarchicalByIdUrl = 'main/organization'
const deleteHierarchicalReportUrl = 'main/organization'
const updateHierarchicalReportUrl = 'main/organization'
const getCCById = 'main/organization/cc'

export const getHierarchicalApi = async (query: string) => {
    try {
        const response = await BaseApi.get(`${getHierarchicalUrl}?${query}`)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching hierarchical list',
        )
    }
}

export const getHierarchicalByIdApi = async (
    id: string,
    type: 'INDIVIDUAL' | 'GROUP', 
) => {
    try {
        const response = await BaseApi.get(
            `${getHierarchicalByIdUrl}/${id}?type=${type}`,
        )
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching hierarchical list',
        )
    }
}

export const getCCByIdApi = async (
    request_id: string,
    type: 'INDIVIDUAL' | 'GROUP',
) => {
    try {
        const response = await BaseApi.get(
            `${getCCById}?request_id=${request_id}&type=${type}`,
        )
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching cc by id',
        )
    }
}

export const deleteHierarchicalReport = async (
    id: string,
    type: 'INDIVIDUAL' | 'GROUP',
    request_group_id: string,
) => {
    try {
        const response = await BaseApi.delete(
            `${deleteHierarchicalReportUrl}/${id}?type=${type}&request_group_id=${request_group_id}`,
        )
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ??
            'Error at deleting hierarchical report',
        )
    }
}

export const postHierarchicalReport = async (data: any) => {
    try {
        const response = await BaseApi.post(postHierarchicalReportUrl, data)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ??
            'Error at creating hierarchical report',
        )
    }
}

export const updateHierarchicalReport = async (id: string, payload: any) => {
    try {
        const response = await BaseApi.patch(
            `${updateHierarchicalReportUrl}/${id}`,
            payload,
        )
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ??
            'Error at updating hierarchical report',
        )
    }
}

export const getPositionListApi = async (query: string) => {
    try {
        const response = await BaseApi.get(`${getPositionListUrl}?${query}`)
        return response.data
    } catch (e: any) { 
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching position list',
        )
    }             
}

export const getRequestTypeApi = async () => {                                         
    try {
        const response = await BaseApi.get(getRequestTypeUrl)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching request type',
        )
    }
}

export const getJobGradeApi = async () => {
    try {
        const response = await BaseApi.get(getJobGradeUrl)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching job grades',
        )
    }
}
