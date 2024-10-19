import { cn } from '@/lib/utils'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function SearchIcon(props: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            fill="none"
            viewBox="0 0 21 20"
            {...props}
            className={cn('group', props.className)}
        >
            <path
                fill="#817F9B"
                className={props.className}
                fillRule="evenodd"
                d="M10.234 2.94a6.865 6.865 0 100 13.73 6.865 6.865 0 000-13.73zM2.118 9.805a8.115 8.115 0 1116.231 0 8.115 8.115 0 01-16.23 0z"
                clipRule="evenodd"
            ></path>
            <path
                fill="#817F9B"
                className={props.className}
                fillRule="evenodd"
                d="M15.001 14.963a.625.625 0 01.884-.001l2.937 2.929a.625.625 0 01-.883.885l-2.937-2.93a.625.625 0 010-.883z"
                clipRule="evenodd"
            ></path>
        </svg>
    )
}
