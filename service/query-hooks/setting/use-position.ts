import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    parseAsInteger,
    parseAsString,
    useQueryState,
} from 'nuqs'
import { queryStringGenerator } from '@/lib/utils'
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
import {
    createPosition,
    deletePosition,
    getAllPosition,
    getOnePosition,
    updatePosition,
} from '@/service/apis/setting/position-api'

// constants
const queryKey = 'Position'
const getAllFun = getAllPosition
const createFun = createPosition
const updateFun = updatePosition
const deleteFun = deletePosition

export const useCreatePosition = () => {
    const queryClient = useQueryClient()
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
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const {
        isPending,
        mutate: create,
        isSuccess,
    } = useMutation({
        mutationFn: createFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/sortBy-${sortBy}/orderBy-${orderBy}`,
                ],
            })
        },
    })

    return { create, isPending, isSuccess }
}

export const useGetAllPosition = () => {
    const [page] = useQueryState<number>(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))

    // const [urlState] = useQueryStates({
    //     page: parseAsInteger.withDefault(DEFAULT_PAGE),
    //     size: parseAsInteger.withDefault(DEFAULT_SIZE),
    //     name: parseAsString.withDefault(''),
    //     is_active: parseAsString.withDefault(''),
    //     sort_by: parseAsString.withDefault(''),
    //     order_by: parseAsString.withDefault(''),
    // })

    const queryString = queryStringGenerator({
        page: page ?? DEFAULT_PAGE,
        size: size ?? DEFAULT_SIZE,
        name,
        is_active: active,
        sort_by: sortBy,
        order_by: orderBy,
    })

    // fetch get ALl query
    const { isLoading, data, isError } = useQuery({
        queryKey: [
            `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/sortBy-${sortBy}/orderBy-${orderBy}`,
        ],
        queryFn: () => getAllFun(queryString),
    })

    return { isLoading, data, isError }
}

// Update Employment Status

export const useUpdatePositon = () => {
    const queryClient = useQueryClient()
    const {
        isPending,
        mutate: update,
        isError,
    } = useMutation({
        mutationFn: updateFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries()
        },
    })

    return {
        isPending,
        update,
        isError,
    }
}

export const useDeletePosition = () => {
    const queryClient = useQueryClient()
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
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const {
        isPending,
        mutate: deleteById,
        isError,
    } = useMutation({
        mutationFn: deleteFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/sortBy-${sortBy}/orderBy-${orderBy}`,
                ],
            })
        },
    })

    return {
        isPending,
        deleteById,
        isError,
    }
}

export const useGetOnePosition = (id: number) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: [`${queryKey}/id-${id}`],
        queryFn: () => getOnePosition(id),
    })

    return { data, isError, isLoading }
}
