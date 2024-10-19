import {
    GetAllDistinctBranch,
    GetAllDistinctCompany,
    GetAllDistinctDepartment,
    GetAllDistinctLocation,
    GetAllPostion,
    getJobCategoryDistinct,
} from '@/service/apis/setting/distinct-api'
import { useQuery } from '@tanstack/react-query'

const getAllDistCompanyFun = GetAllDistinctCompany
const getAllDistDepartFun = GetAllDistinctDepartment
const getAllDistBranFun = GetAllDistinctBranch
const getAllDistLocaFun = GetAllDistinctLocation
const getAllPositionFun = GetAllPostion

export const useGetAllDistCompany = () => {
    const { isLoading, data, isError } = useQuery({
        queryKey: [`distinct/company`],
        queryFn: () => getAllDistCompanyFun(''),
    })

    return { isLoading, data, isError }
}

export const useGetAllDistDepart = () => {
    const { isLoading, data, isError } = useQuery({
        queryKey: [`distinct/department`],
        queryFn: () => getAllDistDepartFun(),
    })

    return { isLoading, data, isError }
}
export const useGetAllDistBranch = () => {
    const { isLoading, data, isError } = useQuery({
        queryKey: [`distinct/branch`],
        queryFn: () => getAllDistBranFun(''),
    })

    return { isLoading, data, isError }
}
export const useGetAllDistLocation = () => {
    const { isLoading, data, isError } = useQuery({
        queryKey: [`distinct/loccation`],
        queryFn: () => getAllDistLocaFun(''),
    })

    return { isLoading, data, isError }
}

export const useGetAllPostions = () => {
    const { isLoading, data, isError } = useQuery({
        queryKey: [`positions`],
        queryFn: () => getAllPositionFun(''),
    })

    return { isLoading, data, isError }
}

export const useGetAllJobCategoriesDistict = () => {
    const { isLoading, data, isError } = useQuery({
        queryKey: [`job-categories/distinct`],
        queryFn: () => getJobCategoryDistinct(),
        retry: 1,
    })

    return { isLoading, data, isError }
}
