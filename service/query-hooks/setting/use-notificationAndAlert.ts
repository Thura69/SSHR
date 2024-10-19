import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
import { queryStringGenerator } from '@/lib/utils'
import {
    getAllNotificationAndAlert,
    updateAllNotificationAndAlert,
} from '@/service/apis/setting/notification-alert'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

const queryKey = 'notification-alerts'
const getAllFun = getAllNotificationAndAlert
const updateAllFun = updateAllNotificationAndAlert

export const useGetAllNotification = ()=>{
  const [page] = useQueryState<number>('page',parseAsInteger.withDefault(DEFAULT_PAGE));
  const [size] = useQueryState<number>('size',parseAsInteger.withDefault(DEFAULT_SIZE));
  const [name] = useQueryState('name',parseAsString.withDefault(''));
  const [active] = useQueryState('is_active',parseAsString.withDefault(''));

  const queryString = queryStringGenerator({
    page: page ?? DEFAULT_PAGE,
    size: size ?? DEFAULT_SIZE,
    name,
    is_active: active,
  });

  const {isLoading,data,isError} = useQuery({
    queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}`],
    queryFn:()=>getAllFun(queryString)
  });

  return {isLoading,data,isError};
};

export const useUpdateNotification = () => {
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

    const queryClient = useQueryClient()

    const {
        isPending,
        mutate: update,
        isError,
    } = useMutation({
        mutationFn: updateAllFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}`,
                ],
            })
        },
    })

    return { isPending, update, isError }
}
