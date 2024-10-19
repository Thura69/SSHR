import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function OffboardIcon({
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
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.5 7.922v7m0 0l-2.5-3m2.5 3l2.5-3m-9.5-4v7m0 0l-2.5-3m2.5 3l2.5-3"
            ></path>
            <path
                stroke={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.stroke ?? defaultColor ?? '#000'
                }
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M6 17.922h12"
            ></path>
            <path
                stroke={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.stroke ?? defaultColor ?? '#000'
                }
                strokeWidth="1.5"
                d="M12 22.922c-4.714 0-7.071 0-8.536-1.464C2 19.992 2 17.636 2 12.922 2 8.208 2 5.85 3.464 4.387 4.93 2.922 7.286 2.922 12 2.922c4.714 0 7.071 0 8.535 1.465C22 5.85 22 8.207 22 12.922c0 4.714 0 7.07-1.465 8.536-1.463 1.464-3.821 1.464-8.535 1.464z"
            ></path>
        </svg>
    )
}
