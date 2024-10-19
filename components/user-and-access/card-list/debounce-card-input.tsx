import { Input } from '@/components/ui/input'
import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'

interface TableHeaderInputProps extends React.ComponentPropsWithRef<'input'> {
    containerClassName?: string
    placeholder: string
    columnName: string
}

const UserDataTableColumnInput = forwardRef<
    HTMLInputElement,
    TableHeaderInputProps
>(
    (
        { containerClassName, className, placeholder, columnName, ...props },
        ref,
    ) => {
        const [value, setValue] = useQueryState(columnName)
        const [_, setPage] = useQueryState('page', parseAsInteger)
        const debounced = useDebouncedCallback(setValue, 500)

        // Handle onChange event
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            debounced(event.target.value || null) // Debounce value update
            setPage(DEFAULT_PAGE)
        }

        const handleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
            event.stopPropagation()
            props.onClick && props.onClick(event)
        }

        return (
            <div
                className={cn(
                    'flex justify-center bg-gray-50 items-center w-full',
                    containerClassName,
                )}
            >
                <Input
                    ref={ref}
                    onClick={handleOnClick}
                    className={cn(
                        'border-0 rounded-md ring-1 bg-transparent  ring-gray-200 placeholder:text-zinc-500 ring-offset-0 p-0  ' +
                            'focus-within:ring-0  focus-visible:ring-zinc-200 px-2 focus-within:ring-offset-0 w-full mb-0 ' +
                            'placeholder:font-bold placeholder:text-sm line-clamp-1 min-w-[60px] ',
                        className,
                    )}
                    onChange={handleChange}
                    placeholder={placeholder}
                    {...props}
                />
            </div>
        )
    },
)

export default UserDataTableColumnInput
