import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function OnboardIcon({
    active,
    activeColor,
    defaultColor,
    ...props
}: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                stroke={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.stroke ?? defaultColor ?? '#000'
                }
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.5 17v-7m0 0L13 13m2.5-3l2.5 3m-9.5 4v-7m0 0L6 13m2.5-3l2.5 3"
            ></path>
            <path
                stroke={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.stroke ?? defaultColor ?? '#000'
                }
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M6 7h12"
            ></path>
            <path
                stroke={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.stroke ?? defaultColor ?? '#000'
                }
                strokeWidth="1.5"
                d="M12 2C7.286 2 4.929 2 3.464 3.464 2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2z"
            ></path>
        </svg>
    )
}
