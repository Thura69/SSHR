import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
import { queryStringGenerator } from '@/lib/utils'
import {
    createDepartments,
    deleteDepartment,
    getAllDepartments,
    getOneDepartmentSetup,
    updateDepartment,
} from '@/service/apis/organisation-structure/department-api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

// constants
const queryKey = 'departments'
const getAllFun = getAllDepartments
const createFun = createDepartments
const deleteFun = deleteDepartment
const getoneFun = getOneDepartmentSetup
const updateFun = updateDepartment

export const useGetAllDepartments = () => {
    const [page] = useQueryState<number>(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState<number>(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [color] = useQueryState('color', parseAsString.withDefault(''))
    const [probation] = useQueryState('probation', parseAsString.withDefault(''))

    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

    const queryClient = useQueryClient()
    const queryString = queryStringGenerator({
        page: page ?? DEFAULT_PAGE,
        size: size ?? DEFAULT_SIZE,
        is_active: active,
        name:name,
        color:color,
        probation:probation,
        sort_by:sortBy,
        order_by:orderBy,
    })
    const { isLoading, data, isError } = useQuery({
        queryKey: [
            `${queryKey}/page-${page}/sortBy-${sortBy}/orderBy-${orderBy}/size-${size}/name-${name}/active-${active}/color-${color}/probation=${probation}`,
        ],
        queryFn: () => getAllFun(queryString),
    })

    return { isLoading, data, isError }
}

export const useCreateDepartments = () => {
    const [page] = useQueryState<number>(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState<number>(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [color] = useQueryState('color', parseAsString.withDefault(''))
    const [probation] = useQueryState('probation', parseAsString.withDefault(''))
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

    const queryClient = useQueryClient()

    const {
        isPending,
        mutate: create,
        isSuccess,
    } = useMutation({
        mutationFn: createFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}}/sortBy-${sortBy}/orderBy-${orderBy}/size-${size}/name-${name}/active-${active}/color-${color}/probation=${probation}`,
                ],
            })
        },
    })

    return { isPending, create, isSuccess }
}

export const useUpdateDepartment = () => {
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [color] = useQueryState('color', parseAsString.withDefault(''))
    const [probation] = useQueryState('probation', parseAsString.withDefault(''))
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

    const queryClient = useQueryClient()

    const {
        isPending,
        mutate: update,
        isSuccess,
    } = useMutation({
        mutationFn: updateFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}/sortBy-${sortBy}/orderBy-${orderBy}/size-${size}/name-${name}/active-${active}/color-${color}/probation=${probation}`,
                ],
            })
        },
    })

    return { isPending, update, isSuccess }
}

export const useGetOneDepartment = () => {
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [color] = useQueryState('color', parseAsString.withDefault(''))
    const [probation] = useQueryState('probation', parseAsString.withDefault(''))
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

    const queryClient = useQueryClient()

    const {
        isPending,
        mutate: getById,
        isError,
    } = useMutation({
        mutationFn: getoneFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}/sortBy-${sortBy}/orderBy-${orderBy}/size-${size}/name-${name}/active-${active}/color-${color}/probation=${probation}`,
                ],
            })
        },
    })

    return { isPending, getById, isError }
}

export const useDeleteDepartment = () => {
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [color] = useQueryState('color', parseAsString.withDefault(''))
    const [probation] = useQueryState('probation', parseAsString.withDefault(''))
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

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
                    `${queryKey}/page-${page}/sortBy-${sortBy}/orderBy-${orderBy}/size-${size}/name-${name}/active-${active}/color-${color}/probation=${probation}`,
                ],
            })
        },
    })

    return { isError, isPending, deleteById }
}
