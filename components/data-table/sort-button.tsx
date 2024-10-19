import { ArrowDownUp, ArrowUpDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { MouseEvent } from 'react'
import { parseAsString, useQueryStates } from 'nuqs'
import { SortButtonProps } from '@/types/common'

function SortButton<TData, TValue>({
    column,
    className,
    columnName,
    onClick,
    ...rest
}: SortButtonProps<TData, TValue>) {
    const [sortings, setSorting] = useQueryStates({
        sort_by: parseAsString,
        order_by: parseAsString,
    })
    const { order_by, sort_by } = sortings

    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
        const noDir = order_by !== 'asc' && order_by !== 'desc'
        setSorting({
            order_by: noDir ? 'desc' : order_by === 'asc' ? 'desc' : 'asc',
            sort_by: columnName,
        })
    }

    const arrowDir =
        sort_by === columnName && (order_by === 'asc' || order_by === 'desc')

    return (
        <Button
            type={'button'}
            variant="ghost"
            className={cn('p-1', className)}
            onClick={handleOnClick}
            {...rest}
        >
           
            {arrowDir ? (
                <ChevronUp
                    className={cn(
                        'transition-all duration-300 h-5 w-5 text-zinc-500',
                        {
                            '-rotate-180': order_by === 'desc',
                        },
                    )}
                />
            ) : (
              <ArrowDownUp className='w-4 h-4 font-bold'/>
            )}
        </Button>
    )
}

export default SortButton
