import { useSortable } from '@dnd-kit/sortable'
import { Menu, Tally4 } from 'lucide-react'
import { COLORS } from '@/constants'
import { cn } from '@/lib/utils'

const RowDragHandleCell = ({
    rowId,
    value,
    disabled = false,
}: {
    rowId: string
    value: string
    disabled?: boolean
}) => {
    const { attributes, listeners } = useSortable({
        id: rowId,
    })

    return (
        // Alternatively, you could set these attributes on the rows themselves
        <button
            className={cn(
                ' cursor-all-scroll flex items-center text-sideMenuTextColor2 justify-between md:gap-4',
                disabled && ' cursor-not-allowed',
            )}
            {...attributes}
            {...listeners}
        >
            <Tally4
                className="w-[24px] rotate-90 h-[24px]"
                color={COLORS.secondaryText}
            />{' '}
            <p>{value}</p>
        </button>
    )
}

export default RowDragHandleCell
