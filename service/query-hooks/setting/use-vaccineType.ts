import { queryStringGenerator } from '@/lib/utils'
import { getAllVaccineType } from '@/service/apis/setting/vaccineType-api'
import { useQuery } from '@tanstack/react-query'


const getAllFun = getAllVaccineType

export const useGetAllVaccineType = ({ allActive }: { allActive: boolean }) => {
    const queryString = queryStringGenerator({
        is_active: true,
        size:10000
    });

    const { isLoading, data, isError } = useQuery({
        queryKey: [
            `get-all-vaccineType`,
        ],
        queryFn: () => getAllFun(queryString),
    })

    return { isLoading, data, isError }
}
