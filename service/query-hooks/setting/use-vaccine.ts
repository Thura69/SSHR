import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
import { queryStringGenerator } from '@/lib/utils'
import {
    createVaccine,
    deleteVaccine,
    getAllVaccine,
    updateVaccine,
} from '@/service/apis/setting/vaccine-api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

//constants
const queryKey = 'vaccines'
const getAllFun = getAllVaccine
const deleteFun = deleteVaccine
const updateFun = updateVaccine
const createFun = createVaccine

export const useGetAllVaccine = () => {
    const [page] = useQueryState<number>(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState<number>(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''));
    const [vaccineType] = useQueryState('vaccine_type',parseAsString.withDefault(''));

    const queryString = queryStringGenerator({
        page: page ?? DEFAULT_PAGE,
        size: size ?? DEFAULT_SIZE,
        name,
        is_active: active,
        sort_by: sortBy,
        order_by: orderBy,
        vaccine_type:vaccineType
    })

    const { isLoading, data, isError } = useQuery({
        queryKey: [
            `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/sortBy-${sortBy}/orderBy-${orderBy}/vaccineType-${vaccineType}`,
        ],
        queryFn: () => getAllFun(queryString),
    })

    //prev page prefetch
    //   if(page>1){
    //     const prevQueryString = queryStringGenerator({page:page-1,size})
    //     querClient.prefetchQuery({
    //         queryKey:[
    //             `
    //             ${queryKey}/page-${
    //                 page -1
    //             }/size-${size}/name-${name}/active-${active}`
    //         ],
    //         queryFn:()=>getAllFun(prevQueryString)
    //     })
    // }

    //next page prefetch
    // const nextQueryString = queryStringGenerator({page:page + 1,size})
    // querClient.prefetchQuery({
    //     queryKey:[
    //         `${queryKey}/page-${page + 1}/size-${size}/name-${name}/active-${active}`
    //     ],
    //     queryFn:()=>getAllFun(nextQueryString),
    // })

    return { isLoading, data, isError }
}

export const useCreateVaccine = () => {
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [vaccineType] = useQueryState('vaccine_type',parseAsString.withDefault(''));
    const querClient = useQueryClient()

    const {
        isPending,
        mutate: create,
        isSuccess,
    } = useMutation({
        mutationFn: createFun,
        onSuccess: (data) => {
            querClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/sortBy-${sortBy}/orderBy-${orderBy}/vaccineType-${vaccineType}`,
                ],
            })
        },
    })

    return { isPending, create, isSuccess }
}

export const useDeleteVaccine = () => {
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [vaccineType] = useQueryState('vaccine_type',parseAsString.withDefault(''));

    const queryClient = useQueryClient()

    const {
        isPending,
        mutate: deleteById,
        isError,
    } = useMutation({
        mutationFn: deleteFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/sortBy-${sortBy}/orderBy-${orderBy}/vaccineType-${vaccineType}`,
                ],
            })
        },
    })

    return { isPending, deleteById, isError }
}

export const useUpdateVaccine = () => {
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [vaccineType] = useQueryState('vaccine_type',parseAsString.withDefault(''));
    const queryClient = useQueryClient()

    const {
        isPending,
        mutate: update,
        isError,
    } = useMutation({
        mutationFn: updateFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/sortBy-${sortBy}/orderBy-${orderBy}/vaccineType-${vaccineType}`,
                ],
            })
        },
    })

    return { isPending, update, isError }
}
