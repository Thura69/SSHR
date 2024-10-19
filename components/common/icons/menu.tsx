import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function MenuIcon({
    active,
    activeColor,
    defaultColor,
    ...props
}: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="41"
            fill="none"
            viewBox="0 0 40 41"
        >
            <rect
                width="15"
                height="2"
                x="13"
                y="15"
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#1A1A1A'
                }
                rx="1"
            ></rect>
            <rect
                width="15"
                height="2"
                x="13"
                y="25"
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#1A1A1A'
                }
                rx="1"
            ></rect>
            <rect
                width="11"
                height="2"
                x="15"
                y="20"
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#1A1A1A'
                }
                rx="1"
            ></rect>
        </svg>
    )
}
