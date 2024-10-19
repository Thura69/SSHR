import { DEFAULT_PAGE } from '@/constants/pagination'
import { cn } from '@/lib/utils'
import { parseAsInteger, useQueryState } from 'nuqs'
import * as React from 'react'
import { useDebouncedCallback } from 'use-debounce'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    endIcon?: React.ReactNode
    inputClasses?: string
    columnName: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DebouncedInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, endIcon, inputClasses, columnName, ...props }, ref) => {
        const [value, setValue] = useQueryState(columnName)
        const [_, setPage] = useQueryState('page', parseAsInteger)
        const debounced = useDebouncedCallback(setValue, 500)

        // Handle onChange event
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            debounced(event.target.value || null) // Debounce value update
            setPage(DEFAULT_PAGE)
        }
        if (endIcon) {
            return (
                <div
                    className={cn(
                        'flex h-10 items-center rounded-[10px] border border-input bg-white text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-primary-500',
                        className,
                    )}
                >
                    <input
                        ref={ref}
                        className={cn(
                            'w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                            inputClasses,
                        )}
                        {...props}
                        onChange={handleChange}
                    />
                    {endIcon}
                </div>
            )
        }
        return (
            <input
                type={type}
                className={cn(
                    'flex h-[36px] w-full rounded-[10px] border border-input border-gray-400 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 ring-offset-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                ref={ref}
                {...props}
                onChange={handleChange}
                defaultValue={value || ''}
            />
        )
    },
)
DebouncedInput.displayName = 'Input'

export { DebouncedInput }
