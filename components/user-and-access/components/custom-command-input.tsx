import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '@/lib/utils'

const CustomCommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
    <div className="flex items-center" cmdk-input-wrapper="">
        {/* <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" /> */}
        <CommandPrimitive.Input
            ref={ref}
            className={cn(
                'flex h-[36px] w-full border-gray-600 rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400',
                className,
            )}
            {...props}
        />
    </div>
))

CustomCommandInput.displayName = CommandPrimitive.Input.displayName
export default CustomCommandInput
