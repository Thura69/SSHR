import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function DocumentIcon({
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
                strokeWidth="1.5"
                d="M3 10.46c0-3.77 0-5.656 1.172-6.827C5.343 2.46 7.229 2.46 11 2.46h2c3.771 0 5.657 0 6.828 1.172C21 4.803 21 6.69 21 10.46v4c0 3.77 0 5.657-1.172 6.828C18.657 22.46 16.771 22.46 13 22.46h-2c-3.771 0-5.657 0-6.828-1.172C3 20.118 3 18.232 3 14.46v-4z"
            ></path>
            <path
                stroke={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.stroke ?? defaultColor ?? '#000'
                }
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M8 10.46h8m-8 4h5"
            ></path>
        </svg>
    )
}
