import { cn } from '@/lib/utils'
import { SVGElementProps } from '@/types/svg-element-interface'
import React from 'react'

export function Dot(props: SVGElementProps) {
    return (
        <svg
            width="50px"
            height="50px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            {...props}
            className={cn('group', props.className)}
        >
            <path fill="#000000" d="M8 3a5 5 0 100 10A5 5 0 008 3z" />
        </svg>
    )
}
