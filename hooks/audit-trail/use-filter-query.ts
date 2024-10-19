import { parseAsString, useQueryState } from 'nuqs'
import { AuditTrailHistoryQueryKeys } from '@/lib/query-keys'
import { format, subDays } from 'date-fns'

export const useFilterQuery = () => {
    const today = new Date()
    const oneMonthAgo = subDays(today, 1)
    // const aMonthAgoformattedDate = format(oneMonthAgo, 'yyyy-MM-dd')
    const todayFormattedDate = format(today, 'yyyy-MM-dd')

    const [employeeName, setEmployeeName] = useQueryState(
        AuditTrailHistoryQueryKeys.employee_name,
        {
            defaultValue: '',
            clearOnDefault: true,
        },
    )
    const [parentMenuId, setParentMenuId] = useQueryState(
        AuditTrailHistoryQueryKeys.parent_menu_id,
        {
            defaultValue: '',
            clearOnDefault: true,
        },
    )
    const [childMenuId, setChildMenuId] = useQueryState(
        AuditTrailHistoryQueryKeys.child_menu_id,
        {
            defaultValue: '',
            clearOnDefault: true,
        },
    )

    const [grandChildMenuId, setGrandChildMenuId] = useQueryState(
        'grand_child_menu_id',
        {
            defaultValue: '',
            clearOnDefault: true,
        },
    )

    const [eventTypes, setEventTypes] = useQueryState(
        AuditTrailHistoryQueryKeys.event_type,
        {
            defaultValue: '',
            clearOnDefault: true,
        },
    )

    const [startDate, setStartDate] = useQueryState(
        AuditTrailHistoryQueryKeys.start_date,
        parseAsString.withDefault(todayFormattedDate),
    )
    const [endDate, setEndDate] = useQueryState(
        AuditTrailHistoryQueryKeys.end_date,
        parseAsString.withDefault(todayFormattedDate),
    )

    return {
        eventTypes,
        setEventTypes,
        childMenuId,
        setChildMenuId,
        grandChildMenuId,
        setGrandChildMenuId,
        employeeName,
        setEmployeeName,
        parentMenuId,
        setParentMenuId,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
    }
}
