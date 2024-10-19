import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { queryStringGenerator } from '@/lib/utils'
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'

import {
    CreateSettingType,
    menuTypes,
    UpdateSettingType,
} from '@/types/setting'
import {
    createRecord,
    deleteRecord,
    getAllReocrds,
    updateRecord,
} from '@/service/apis/setting/setting-api'

// constants

const getAllFun = getAllReocrds
const createFun = createRecord
const updateFun = updateRecord
const deleteFun = deleteRecord

export const useCreateSetting = (queryKey: menuTypes) => {
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
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const {
        isPending,
        mutate: create,
        isSuccess,
    } = useMutation({
        mutationFn: (payload: CreateSettingType) => {
            return createFun(payload, queryKey)
        },
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

export const useGetAllSetting = (queryKey: menuTypes) => {
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
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

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
        queryFn: () => getAllFun(queryString, queryKey),
    })
    return { isLoading, data, isError }
}

// Update Employment Status

export const useUpdateSetting = (queryKey: menuTypes) => {
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
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const {
        isPending,
        mutate: update,
        isError,
    } = useMutation({
        mutationFn: (payload: UpdateSettingType) =>
            updateFun(payload, queryKey),
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
        update,
        isError,
    }
}

export const useDeleteSetting = (queryKey: menuTypes) => {
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
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const {
        isPending,
        mutate: deleteById,
        isError,
    } = useMutation({
        mutationFn: (id: number) => deleteFun(id, queryKey),
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
