import { Input } from '@/components/ui/input'
import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { TableHeaderInputProps } from '@/types/common'


const DataTableColumnInput = forwardRef<
    HTMLInputElement,
    TableHeaderInputProps
>(({ containerClassName, className, placeholder, ...props }, ref) => {
    const handleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation()
        props.onClick && props.onClick(event)
    }

    return (
        <div
            className={cn(
                'flex justify-center  items-center w-full',
                containerClassName,
            )}
        >
            <Input
                ref={ref}
                onClick={handleOnClick}
                className={cn(
                    'border-0 rounded ring-1 bg-transparent  ring-secondary-200   placeholder:text-zinc-500 ring-offset-0 p-0  ' +
                    'focus-within:ring-0  focus-visible:ring-zinc-200 px-2 focus-within:ring-offset-0 w-full mb-0 ' +
                    'placeholder:font-bold placeholder:text-sm line-clamp-1 min-w-[60px] focus:placeholder:text-transparent ',
                    className,
                )}
                placeholder={placeholder}
                {...props}
            />
        </div>
    )
})

export default DataTableColumnInput
