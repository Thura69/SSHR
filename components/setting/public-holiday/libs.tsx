import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
import { queryStringGenerator } from '@/lib/utils'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

export const getCurrentPublicKey = () => {
    const [page] = useQueryState<number>(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState<number>(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [con] = useQueryState('con', parseAsString.withDefault(''))
    const [active] = useQueryState('is_active', parseAsString.withDefault(''))
    const [financialYear] = useQueryState('financial_year_id', parseAsInteger)
    const [date_from] = useQueryState(
        'calendar_year_from',
        parseAsString.withDefault(''),
    )
    const [date_to] = useQueryState(
        'calendar_year_to',
        parseAsString.withDefault(''),
    )
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

    const queryKey = 'public-holidays'

    const queryString = queryStringGenerator({
        page: page ?? DEFAULT_PAGE,
        size: size ?? DEFAULT_SIZE,
        name,
        is_active: active,
        financial_year_id: financialYear,
        date_from,
        date_to,
        sort_by: sortBy,
        order_by: orderBy,
    })


    return  [`${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/financial_year_id-${financialYear}/con-${con}/date_from-${date_from}/date-to-${date_to}/sortBy-${sortBy}/orderBy-${orderBy}`]
}
