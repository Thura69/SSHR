import { cn } from '@/lib/utils'
import * as React from 'react'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    endIcon?: React.ReactNode
    startIcon?: React.ReactNode
    inputClasses?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, endIcon, startIcon, inputClasses, ...props }, ref) => {
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
                            'w-full px-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                            inputClasses,
                        )}
                        {...props}
                    />
                    {endIcon}
                </div>
            )
        }
        if (startIcon) {
            return (
                <div
                    className={cn(
                        'flex h-10 items-center rounded-[10px] border border-input bg-white text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-primary-500',
                        className,
                    )}
                >
                    {startIcon}
                    <input
                        ref={ref}
                        className={cn(
                            'w-full px-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                            inputClasses,
                        )}
                        {...props}
                    />
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
            />
        )
    },
)
Input.displayName = 'Input'

// 36

export { Input }
