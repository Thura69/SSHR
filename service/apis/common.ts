import BaseApi from '@/service/axios'
import {
    DistinctBranch,
    DistinctCompany,
    DistinctDepartment,
    DistinctLocation,
} from '@/types/common'

const getBranchOptionsUrl = 'main/branches/distinct'
const getLocationOptionsUrl = 'main/locations/distinct'
const getCompanyOptionsUrl = 'main/company/distinct'

// TODO: add (s)
const getDepartmentOptionsUrl = 'main/departments/distinct'
const getPositionOptionsUrl = 'main/positions'
const getSectionOptionsUrl = 'main/section/distinct'


export const getBranchOptions = async (): Promise<DistinctBranch> => {
    try {
        const response = await BaseApi.get(getBranchOptionsUrl)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching branch options',
        )
    }
}

export const getSectionOptions = async (): Promise<any> => {
    try {
        const response = await BaseApi.get(getSectionOptionsUrl)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching section options',
        )
    }
}

export const getPositionOptions = async (): Promise<any> => {
    try {
        const response = await BaseApi.get(getPositionOptionsUrl)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching position options',
        )
    }
}

export const getLocationOptions = async (): Promise<DistinctLocation> => {
    try {
        const response = await BaseApi.get(getLocationOptionsUrl)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching location options',
        )
    }
}

export const getCompanyOptions = async (): Promise<DistinctCompany> => {
    try {
        const response = await BaseApi.get(getCompanyOptionsUrl)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching company options',
        )
    }
}

export const getDepartmentOptions = async (): Promise<DistinctDepartment> => {
    try {
        const response = await BaseApi.get(getDepartmentOptionsUrl)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ??
                'Error at fetching department options',
        )
    }
}
