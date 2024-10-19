import { getAllAuditTrail } from '@/service/apis/audit-trail'
import { queryStringGenerator } from '@/lib/utils'
import { useFilterQuery } from '@/hooks/audit-trail/use-filter-query'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetAllAuditTrail = () => {
    const {
        startDate,
        endDate,
        employeeName,
        parentMenuId,
        childMenuId,
        grandChildMenuId,
        eventTypes,
    } = useFilterQuery()

    function areDatesEqual(startDate: Date, endDate: Date) {
        return startDate.getTime() === endDate.getTime()
    }

    const isOneDay = areDatesEqual(new Date(startDate), new Date(endDate))

    const dateObj = isOneDay
        ? { create_date: startDate }
        : { start_date: startDate, end_date: endDate }

    const query = queryStringGenerator({
        ...dateObj,
        size: 50,
        employee_name: employeeName,
        parent_menu_id: parentMenuId,
        child_menu_id: childMenuId,
        grand_child_menu_id: grandChildMenuId,
        event_type: eventTypes,
        order_by: 'desc',
        sort_by: 'CreateDate',
    })

    const response = useInfiniteQuery({
        initialPageParam: 0,
        queryKey: [`audit-trails?${query}`],
        queryFn: ({ pageParam }) =>
            getAllAuditTrail(`${query}&page=${pageParam}`),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage?.data?.length > 0 && lastPage?.data?.length === 50
                ? allPages.length
                : undefined
        },
    })

    return response
}
