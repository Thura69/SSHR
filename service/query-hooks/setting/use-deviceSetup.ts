import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
import { queryStringGenerator } from '@/lib/utils'
import {
    CreateDeviceSetup,
    DeleteDeviceSetup,
    GetAllDeviceSetUp,
    GetOneDeviceSetup,
    UpdateOneDeviceSetup,
} from '@/service/apis/setting/device-setup-api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

const queryKey = 'device-setup'
const getAllFun = GetAllDeviceSetUp
const deleteFun = DeleteDeviceSetup
const createFun = CreateDeviceSetup
const getOneFun = GetOneDeviceSetup
const updateFun = UpdateOneDeviceSetup

export const useGetAllDeviceSetups = () => {
    const [page] = useQueryState<number>(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState<number>(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [deviceNo] = useQueryState('device_no', parseAsInteger)
    const [model] = useQueryState('model', parseAsString)
    const [mode] = useQueryState('mode', parseAsString)
    const [connection] = useQueryState('connection_type')
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [budRate] = useQueryState('baud_rate', parseAsString.withDefault(''))
    const [ipAddress] = useQueryState(
        'ip_address',
        parseAsString.withDefault(''),
    )
    const [portNumber] = useQueryState(
        'port_number',
        parseAsString.withDefault(''),
    )
    const [mealAllowance] = useQueryState(
        'meal_allowance',
        parseAsString.withDefault(''),
    )
    const [interval] = useQueryState('interval', parseAsInteger)
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

    const queryString = queryStringGenerator({
        page: page ?? DEFAULT_PAGE,
        size: size ?? DEFAULT_SIZE,
        name,
        sort_by: sortBy,
        order_by: orderBy,
        is_active: active,
        device_no: deviceNo,
        baud_rate: budRate,
        ip_address: ipAddress,
        port_number: portNumber,
        interval: interval,
        mode: mode,
        model: model,
        connection_type:connection,
        meal_allowance: mealAllowance,
    })

    const { isLoading, data, isError } = useQuery({
        queryKey: [
            `${queryKey}/page-${page}/size-${size}/sortBy-${sortBy}/orderBy-${orderBy}/name-${name}/deviceNo-${deviceNo}/model-${model}/mode-${mode}/budRate-${budRate}/ipAddress-${ipAddress}portNumber-${portNumber}/connection-${connection}/meal_allowance-${mealAllowance}/interval-${interval}/active-${active}/all`,
        ],
        queryFn: () => getAllFun(queryString),
    })

    return { isLoading, data, isError }
}

export const useGetOneDeviceSetup = () => {
    const [page] = useQueryState<number>(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState<number>(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )

    const { id } = useParams()

    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [deviceNo] = useQueryState('device_no', parseAsInteger)
    const [model] = useQueryState('model', parseAsString)
    const [connection] = useQueryState('connection_type')
    const [mode] = useQueryState('mode', parseAsString)
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [budRate] = useQueryState('baud_rate', parseAsString.withDefault(''))
    const [ipAddress] = useQueryState(
        'ip_address',
        parseAsString.withDefault(''),
    )
    const [portNumber] = useQueryState(
        'port_number',
        parseAsString.withDefault(''),
    )
    const [interval] = useQueryState('interval', parseAsInteger)
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

    const {
        isLoading,
        data: deviceDatas,
        isError,
    } = useQuery({
        queryKey: [
            `${queryKey}/page-${page}/size-${size}/sortBy-${sortBy}/orderBy-${orderBy}/name-${name}/deviceNo-${deviceNo}/model-${model}/mode-${mode}/budRate-${budRate}/ipAddress-${ipAddress}portNumber-${portNumber}/connection-${connection}/interval-${interval}/active-${active}/all`,
        ],
        queryFn: () => getOneFun(id as string),
    })

    return { isLoading, deviceDatas, isError }
}

export const useCreateDeviceSetups = () => {
    const [page] = useQueryState<number>(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState<number>(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [deviceNo] = useQueryState('device_no', parseAsInteger)
    const [model] = useQueryState('model', parseAsString)
    const [mode] = useQueryState('mode', parseAsString)
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [budRate] = useQueryState('baud_rate', parseAsString.withDefault(''))
    const [ipAddress] = useQueryState(
        'ip_address',
        parseAsString.withDefault(''),
    )
    const [portNumber] = useQueryState(
        'port_number',
        parseAsString.withDefault(''),
    )
    const [mealAllowance] = useQueryState(
        'meal_allowance',
        parseAsString.withDefault(''),
    )
    const [connection] = useQueryState('connection_type')

    const [interval] = useQueryState('interval', parseAsInteger)
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
                    `${queryKey}/page-${page}/size-${size}/sortBy-${sortBy}/orderBy-${orderBy}/name-${name}/deviceNo-${deviceNo}/model-${model}/mode-${mode}/budRate-${budRate}/ipAddress-${ipAddress}portNumber-${portNumber}/meal_allowance-${mealAllowance}/connection-${connection}/interval-${interval}/active-${active}/all`,
                ],
            })
        },
    })

    return { isPending, create, isSuccess }
}

export const useUpdateDeviceSetup = () => {
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [deviceNo] = useQueryState('device_no', parseAsInteger)
    const [model] = useQueryState('model', parseAsString)
    const [mode] = useQueryState('mode', parseAsString)
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [budRate] = useQueryState('baud_rate', parseAsString.withDefault(''))
    const [ipAddress] = useQueryState(
        'ip_address',
        parseAsString.withDefault(''),
    )
    const [connection] = useQueryState('connection_type')

    const [portNumber] = useQueryState(
        'port_number',
        parseAsString.withDefault(''),
    )
    const [mealAllowance] = useQueryState(
        'meal_allowance',
        parseAsString.withDefault(''),
    )
    const [interval] = useQueryState('interval', parseAsInteger)
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

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
                    `${queryKey}/page-${page}/size-${size}/sortBy-${sortBy}/orderBy-${orderBy}/name-${name}/deviceNo-${deviceNo}/model-${model}/mode-${mode}/budRate-${budRate}/ipAddress-${ipAddress}portNumber-${portNumber}/meal_allowance-${mealAllowance}/connection-${connection}/interval-${interval}/active-${active}/all`,
                ],
            })
        },
    })

    return { isPending, update, isError }
}
export const useDeleteDeviceSetup = () => {
    const [page] = useQueryState<number>(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState<number>(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [deviceNo] = useQueryState('device_no', parseAsInteger)
    const [model] = useQueryState('model', parseAsString)
    const [mode] = useQueryState('mode', parseAsString)
    const [connection] = useQueryState('connection_type')
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [budRate] = useQueryState('baud_rate', parseAsString.withDefault(''))
    const [ipAddress] = useQueryState(
        'ip_address',
        parseAsString.withDefault(''),
    )
    const [portNumber] = useQueryState(
        'port_number',
        parseAsString.withDefault(''),
    )
    const [mealAllowance] = useQueryState(
        'meal_allowance',
        parseAsString.withDefault(''),
    )
    const [interval] = useQueryState('interval', parseAsInteger)
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

    const queryClient = useQueryClient()

    const {
        isPending,
        mutate: deletebyId,
        isError,
    } = useMutation({
        mutationFn: deleteFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}/size-${size}/sortBy-${sortBy}/orderBy-${orderBy}/name-${name}/deviceNo-${deviceNo}/model-${model}/mode-${mode}/budRate-${budRate}/ipAddress-${ipAddress}portNumber-${portNumber}/connection-${connection}/meal_allowance-${mealAllowance}/interval-${interval}/active-${active}/all`,
                ],
            })
        },
    })

    return { isPending, deletebyId, isError }
}
