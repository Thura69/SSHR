import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
import { queryStringGenerator } from '@/lib/utils'
import {
    createFinancialApi,
    deleteFinancialYear,
    getAllFinancialApi,
    getAllPureFinancialApi,
    getOneFinancialYear,
    updateFinancialYear,
} from '@/service/apis/financial-year/financial-api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

//constants
const querykey = 'financial-years'
const getOneFun = getOneFinancialYear
const createFun = createFinancialApi
const deleteFun = deleteFinancialYear
const updateFun = updateFinancialYear
const pureAllFun = getAllPureFinancialApi

export const useCreateFinancialYear = () => {
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
    const [country] = useQueryState('country', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [calendarYearFrom] = useQueryState('calendar_year_from');
    const [calendarYearTo] = useQueryState('calendar_year_to');
    const [financial_year_from] = useQueryState('financial_year_from');
    const [financial_year_to] = useQueryState('financial_year_to');

    const {
        isPending,
        mutate: create,
        isSuccess,
    } = useMutation({
        mutationFn: createFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${querykey}/page-${page}/size-${size}/name-${name}/country-${country}/active-${active}/sortBy-${sortBy}/orderBy-${orderBy}/calendarYearFrom-${calendarYearFrom}/calendarYearTo-${calendarYearTo}/financialYearFrom-${financial_year_from}/financialYearTo-${financial_year_to}`,
                ],
            })
        },
    })

    return { create, isPending, isSuccess }
}

export const useGellAllPureFinancialYear = () => {
    const { isLoading, data, isError } = useQuery({
        queryKey: ['pure_financial'],
        queryFn: () => pureAllFun(),
    })

    return { data, isLoading, isError }
}

export const useGetAllFinancialYear = () => {
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
    const [country] = useQueryState('country', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [calendarYearFrom] = useQueryState('calendar_year_from');
    const [calendarYearTo] = useQueryState('calendar_year_to');
    const [financial_year_from] = useQueryState('financial_year_from');
    const [financial_year_to] = useQueryState('financial_year_to');

    const queryString = queryStringGenerator({
        page,
        size,
        is_active: active,
        name,
        country,
        sort_by:sortBy,
        order_by:orderBy,
        calendar_year_from:calendarYearFrom,
        calendar_year_to:calendarYearTo,
        financial_year_from,
        financial_year_to
    })

    // fetch get all query
    const { isLoading, data, isError } = useQuery({
        queryKey: [
            `${querykey}/page-${page}/size-${size}/name-${name}/country-${country}/active-${active}/sortBy-${sortBy}/orderBy-${orderBy}/calendarYearFrom-${calendarYearFrom}/calendarYearTo-${calendarYearTo}/financialYearFrom-${financial_year_from}/financialYearTo-${financial_year_to}`,
        ],
        queryFn: () => getAllFinancialApi(queryString),
    })

    return { isLoading, data, isError }
}

//Update Employment Status
export const useUpdateFinancialYear = () => {
    const queryClient = useQueryClient()
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [country] = useQueryState('country', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [calendarYearFrom] = useQueryState('calendar_year_from');
    const [calendarYearTo] = useQueryState('calendar_year_to');
    const [financial_year_from] = useQueryState('financial_year_from');
    const [financial_year_to] = useQueryState('financial_year_to');

    const {
        isPending,
        mutate: update,
        isError,
    } = useMutation({
        mutationFn: updateFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${querykey}/page-${page}/size-${size}/name-${name}/country-${country}/active-${active}/sortBy-${sortBy}/orderBy-${orderBy}/calendarYearFrom-${calendarYearFrom}/calendarYearTo-${calendarYearTo}/financialYearFrom-${financial_year_from}/financialYearTo-${financial_year_to}`,
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

export const useDeleteFinancialYear = () => {
    const queryClient = useQueryClient()
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [country] = useQueryState('country', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [calendarYearFrom] = useQueryState('calendar_year_from');
    const [calendarYearTo] = useQueryState('calendar_year_to');
    const [financial_year_from] = useQueryState('financial_year_from');
    const [financial_year_to] = useQueryState('financial_year_to');

    const {
        isPending,
        mutate: deleteById,
        isError,
    } = useMutation({
        mutationFn: deleteFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${querykey}/page-${page}/size-${size}/name-${name}/country-${country}/active-${active}/sortBy-${sortBy}/orderBy-${orderBy}/calendarYearFrom-${calendarYearFrom}/calendarYearTo-${calendarYearTo}/financialYearFrom-${financial_year_from}/financialYearTo-${financial_year_to}`,
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

export const useGetOneFinancialYear = () => {
    const queryClient = useQueryClient()
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))

    const {
        isPending,
        mutate: getOneFinan,
        isError,
    } = useMutation({
        mutationFn: getOneFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${querykey}/page-${page}/size-${size}/is_active/${active}`,
                ],
            })
        },
    })

    return {
        isPending,
        getOneFinan,
        isError,
    }
}
