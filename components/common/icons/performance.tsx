import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function PerformanceIcon({
    active,
    activeColor,
    defaultColor,
    ...props
}: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            fill="none"
            viewBox="0 0 24 25"
            {...props}
        >
            <g
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#000'
                }
                clipPath="url(#clip0_242_3496)"
            >
                <path d="M6 16.96a1.5 1.5 0 013 0v1.5a1.5 1.5 0 11-3 0v-1.5zm9-6a1.5 1.5 0 113 0v7.5a1.5 1.5 0 11-3 0v-7.5zm-4.5 3a1.5 1.5 0 113 0v4.5a1.5 1.5 0 11-3 0v-4.5z"></path>
                <path d="M6 2.71H4.5a3 3 0 00-3 3v15.75a3 3 0 003 3h15a3 3 0 003-3V5.71a3 3 0 00-3-3H18v1.5h1.5a1.5 1.5 0 011.5 1.5v15.75a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5V5.71a1.5 1.5 0 011.5-1.5H6v-1.5z"></path>
                <path d="M14.25 1.96a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-4.5A.75.75 0 019 4.21v-1.5a.75.75 0 01.75-.75h4.5zM9.75.46A2.25 2.25 0 007.5 2.71v1.5a2.25 2.25 0 002.25 2.25h4.5a2.25 2.25 0 002.25-2.25v-1.5A2.25 2.25 0 0014.25.46h-4.5z"></path>
            </g>
            <defs>
                <clipPath id="clip0_242_3496">
                    <path
                        fill="#fff"
                        d="M0 0H24V24H0z"
                        transform="translate(0 .46)"
                    ></path>
                </clipPath>
            </defs>
        </svg>
    )
}
