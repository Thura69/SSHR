import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
import { queryStringGenerator } from '@/lib/utils'
import {
    createCurreniesApi,
    deleteCurrenciesApi,
    getAllCurrenciesApi,
    updateCurreniesApi,
} from '@/service/apis/setting/currency-api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'

//constants
const querykey = 'currencies'
const getAllFun = getAllCurrenciesApi
const deleteFun = deleteCurrenciesApi
const creatFun = createCurreniesApi
const updateFun = updateCurreniesApi

export const useCreateCurrency = () => {
    const queryClient = useQueryClient()
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )

    const {
        isPending,
        mutate: create,
        isSuccess,
    } = useMutation({
        mutationFn: creatFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [`${querykey}/page-${page}/size-${size}`],
            })
        },
    })

    return { create, isPending, isSuccess }
}

export const useGetAllCurrency = () => {
    const [page] = useQueryState<number>(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )

    const queryClient = useQueryClient()
    const queryString = queryStringGenerator({ page, size })

    //fetch all currency
    const { isLoading, data, isError } = useQuery({
        queryKey: [`${querykey}/page-${page}/size-${size}`],
        queryFn: () => getAllFun(queryString),
    })

    //prefetch query
    //prev page prefetch
    if (page > 1) {
        const prevQueryString = queryStringGenerator({ page: page - 1, size })
        queryClient.prefetchQuery({
            queryKey: [`${querykey}/page-${page - 1}/size-${size}`],
            queryFn: () => getAllFun(prevQueryString),
        })
    }

    //next page prefetch
    const nextQueryString = queryStringGenerator({
        page: page + 1,
        size,
    })
    queryClient.prefetchQuery({
        queryKey: [`${querykey}/page-${page + 1}/size-${size}`],
        queryFn: () => getAllFun(nextQueryString),
    })

    return { isLoading, data, isError }
}

export const useUpdateCurrency = () => {
    const queryClient = useQueryClient()
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )

    const {
        isPending,
        mutate: update,
        isError,
    } = useMutation({
        mutationFn: updateFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [`${querykey}/page-${page}/size-${size}`],
            })
        },
    })

    return {
        isPending,
        update,
        isError,
    }
}

export const useDeleteCurrency = () => {
    const queryClient = useQueryClient()
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const {
        isPending,
        mutate: deleteById,
        isError,
    } = useMutation({
        mutationFn: deleteFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [`${querykey}/page-${page}/size-${size}`],
            })
        },
    })

    return {
        isPending,
        deleteById,
        isError,
    }
}
