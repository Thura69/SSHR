import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function TransferIcon({
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
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M12 2.46c4.714 0 7.071 0 8.535 1.466C22 5.389 22 7.746 22 12.46c0 4.714 0 7.07-1.465 8.536C19.072 22.46 16.714 22.46 12 22.46s-7.071 0-8.536-1.464C2 19.53 2 17.175 2 12.46 2 7.747 2 5.39 3.464 3.926c.974-.974 2.343-1.3 4.536-1.41"
            ></path>
            <path
                stroke={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.stroke ?? defaultColor ?? '#000'
                }
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7 14.46h10l-3.437 3m3.437-7H7l3.438-3"
            ></path>
        </svg>
    )
}
