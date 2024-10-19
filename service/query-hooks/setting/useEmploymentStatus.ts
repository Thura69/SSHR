import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
   
    getAllEmpStatuses,
   
} from '@/service/apis/setting/employment-status-api'

import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { MAX_PAGE_SIZE, queryStringGenerator } from '@/lib/utils'
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'

const queryKey = 'EmpStatus'

// export const useCreateEmpStatus = () => {
//     const queryClient = useQueryClient()
//     const [page] = useQueryState('page', parseAsInteger.withDefault(1))
//     const [size] = useQueryState('size', parseAsInteger.withDefault(15))
//     const [name] = useQueryState('name', parseAsString.withDefault(''))
//     const [active] = useQueryState('is_active', parseAsString.withDefault(''))
//     const {
//         isPending,
//         mutate: create,
//         isSuccess,
//     } = useMutation({
//         mutationFn: createEmpStatus,
//         onSuccess: (data) => {
//             queryClient.invalidateQueries({
//                 queryKey: [
//                     `${queryKey}/page-${page}/size-${Math.min(size, MAX_PAGE_SIZE)}/name-${name}/active-${active}`,
//                 ],
//             })
//         },
//     })

//     return { create, isPending, isSuccess }
// }

export const useGetAllEmpStatus = () => {
    const [page] = useQueryState<number>(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))

    const [active] = useQueryState(
        'is_active',
        parseAsString.withDefault(''),
    )

    const queryString = queryStringGenerator({
        page:DEFAULT_PAGE,
        size: DEFAULT_SIZE,
        name,
        is_active: active,
    })

    // fetch get ALl query
    const { isLoading, data, isError, ...rest } = useQuery({
        queryKey: [
            `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}`,
        ],
        queryFn: () => getAllEmpStatuses(queryString),
    })

    return { isLoading, data, isError, ...rest }
}

// // Update Employment Status

// export const useUpdateEmpStatus = () => {
//     const queryClient = useQueryClient()
//     const [page] = useQueryState('page', parseAsInteger.withDefault(1))
//     const [size] = useQueryState('size', parseAsInteger.withDefault(15))
//     const [name] = useQueryState('name', parseAsString.withDefault(''))
//     const [active] = useQueryState('is_active', parseAsString.withDefault(''))
//     const {
//         isPending,
//         mutate: update,
//         isError,
//     } = useMutation({
//         mutationFn: updateEmpStatus,
//         onSuccess: (data) => {
//             queryClient.invalidateQueries({
//                 queryKey: [
//                     `${queryKey}/page-${page}/size-${Math.min(size, MAX_PAGE_SIZE)}/name-${name}/active-${active}`,
//                 ],
//             })
//         },
//     })

//     return {
//         isPending,
//         update,
//         isError,
//     }
// }

// export const useDeleteEmpStatus = () => {
//     const queryClient = useQueryClient()
//     const [page] = useQueryState('page', parseAsInteger.withDefault(1))
//     const [size] = useQueryState('size', parseAsInteger.withDefault(15))
//     const [name] = useQueryState('name', parseAsString.withDefault(''))
//     const [active] = useQueryState('is_active', parseAsString.withDefault(''))
//     const {
//         isPending,
//         mutate: deleteById,
//         isError,
//     } = useMutation({
//         mutationFn: deleteEmpStatus,
//         onSuccess: (data) => {
//             queryClient.invalidateQueries({
//                 queryKey: [
//                     `${queryKey}/page-${page}/size-${Math.min(size, MAX_PAGE_SIZE)}/name-${name}/active-${active}`,
//                 ],
//             })
//         },
//     })

//     return {
//         isPending,
//         deleteById,
//         isError,
//     }
// }
