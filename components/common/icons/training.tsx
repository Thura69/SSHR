import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function TrainingIcon({
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
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#000'
                }
                d="M15.591 18.46l2.598 4.5h-1.731l-2.598-4.5h-3.711l-2.598 4.5H5.82l2.598-4.5H3.75a.75.75 0 01-.75-.75V4.96H1.5a.75.75 0 010-1.5h21a.75.75 0 110 1.5H21v12.75a.75.75 0 01-.75.75h-4.659zM19.5 4.96h-15v12h15v-12zm-11.25 6a.75.75 0 01.75.75v1.5a.75.75 0 11-1.5 0v-1.5a.75.75 0 01.75-.75zM12 9.46a.75.75 0 01.75.75v3a.75.75 0 11-1.5 0v-3a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 01.75.75v4.5a.75.75 0 11-1.5 0v-4.5a.75.75 0 01.75-.75z"
            ></path>
        </svg>
    )
}
