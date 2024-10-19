import React, { forwardRef } from 'react'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import { cn } from '@/lib/utils'

interface LogoProps extends React.ComponentPropsWithRef<'div'> {}

// @ts-ignore
export const Logo: React.FC<LogoProps> = forwardRef<HTMLDivElement, LogoProps>(
    ({ className, ...rest }, ref) => {
        return (
            <div
                {...rest}
                ref={ref}
                className={cn('relative w-[75px] h-[57px]', className)}
            >
                <Image src={logo} fill alt="logo" />
            </div>
        )
    },
)
