import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ComponentProps, useState } from 'react'
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { DEFAULT_PAGE } from '@/constants/pagination'

interface SortButtonProps
    extends Omit<ComponentProps<typeof Button>, 'onClick'> {
    className?: string
    Sort_By: string
    sortDirection: 'asc' | 'desc' | null // New prop for sort direction
    onSortDirectionChange: (newDirection: 'asc' | 'desc') => void // Callback for sort direction change
}

function CardSortButton({
    className,
    Sort_By,
    sortDirection,
    onSortDirectionChange,
    ...rest
}: SortButtonProps) {
    // const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    //     null,
    // )

    const [sortBy, setSortBy] = useQueryState('sort_by', {
        defaultValue: '',
        clearOnDefault: true,
    })

    const [orderBy, setOrderBy] = useQueryState('order_by', {
        defaultValue: '',
        clearOnDefault: true,
    })

    const [page, setPage] = useQueryState('page', parseAsInteger)

    const toggleSortDirection = () => {
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
        setSortBy(Sort_By)
        setOrderBy(newSortDirection)
        setPage(page || DEFAULT_PAGE)
        // Notify parent component about the sort direction change
        onSortDirectionChange(newSortDirection)
    }

    return (
        <Button
            type="button"
            variant="ghost"
            className={cn('p-1', className)}
            onClick={toggleSortDirection}
            {...rest}
        >
            {sortDirection === 'asc' && (
                <ChevronUp className="h-4 w-4 text-zinc-500" />
            )}
            {sortDirection === 'desc' && (
                <ChevronDown className="h-4 w-4 text-zinc-500" />
            )}
            {sortDirection === null && (
                <ArrowUpDown className="h-4 w-4 text-zinc-500" />
            )}
        </Button>
    )
}

export default CardSortButton
