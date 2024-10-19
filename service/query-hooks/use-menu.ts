import { useQuery } from '@tanstack/react-query'
import {
    getChildMenuApi,
    getGrandChildMenuApi,
    getParentMenuApi,
} from '@/service/apis/menu'
import { AuditTrailHistoryQueryKeys } from '@/lib/query-keys'
import { useQueryState } from 'nuqs'

export const useGetParentMenu = ({
    transformer = (menu: any) => menu,
}: {
    transformer?: (menu: any) => Record<any, any>
}) => {
    const response = useQuery({
        queryKey: ['getParentMenuApi'],
        queryFn: getParentMenuApi,
        select: (data) => {
            return data?.data?.map(transformer)
        },
    })

    return response
}

export const useGetChildMenu = ({
    transformer = (menu: any) => menu,
}: {
    transformer?: (menu: any) => Record<any, any>
}) => {
    const [parentMenuId] = useQueryState(
        AuditTrailHistoryQueryKeys.parent_menu_id,
        {
            defaultValue: '',
            clearOnDefault: true,
        },
    )

    const response = useQuery({
        queryKey: ['getChildMenuApi', parentMenuId],
        queryFn: () => getChildMenuApi(parentMenuId),
        select: (data) => {
            return data?.data?.map(transformer)
        },
    })

    return response
}

export const useGetGrandChildMenu = ({
    transformer = (menu: any) => menu,
}: {
    transformer?: (menu: any) => Record<any, any>
}) => {
    const [childMenuId] = useQueryState(
        AuditTrailHistoryQueryKeys.child_menu_id,
        {
            defaultValue: '',
            clearOnDefault: true,
        },
    )

    const response = useQuery({
        queryKey: ['getGrandChildMenuApi', childMenuId],
        queryFn: () => getGrandChildMenuApi(childMenuId),
        select: (data) => {
            return data?.data?.map(transformer)
        },
    })

    return response
}
