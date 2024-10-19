import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function UsersIcon({
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
            <path
                stroke={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.stroke ?? defaultColor ?? '#000'
                }
                className={props.className}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 19.46v-1.25c0-2.07-1.919-3.75-4.286-3.75H7.286C4.919 14.46 3 16.14 3 18.21v1.25m12.286-5h1.428c2.367 0 4.286 1.68 4.286 3.75v1.25M15 5.63a3 3 0 110 5.66m-4-2.83a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
        </svg>
    )
}
