import { cn } from '@/lib/utils'
import { SVGElementProps } from '@/types/svg-element-interface'
import React from 'react'

export function BellIcon(props: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            fill="none"
            viewBox="0 0 25 24"
            {...props}
            className={cn('group', props.className)}
        >
            <path
                stroke={props.stroke ?? '#817F9B'}
                className={props.className}
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M12.877 2.91c-3.31 0-6 2.69-6 6v2.89c0 .61-.26 1.54-.57 2.06l-1.15 1.91c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96 1.44 13.27 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06V8.91c0-3.3-2.7-6-6-6z"
            ></path>
            <path
                stroke={props.stroke ?? '#817F9B'}
                className={props.className}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M14.727 3.2a6.754 6.754 0 00-3.7 0c.29-.74 1.01-1.26 1.85-1.26.84 0 1.56.52 1.85 1.26z"
            ></path>
            <path
                stroke={props.stroke ?? '#817F9B'}
                className={props.className}
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M15.877 19.06c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.12-.88a3.01 3.01 0 01-.88-2.12"
            ></path>
        </svg>
    )
}