import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function DocumentTwoIcon({
    active,
    activeColor,
    defaultColor,
    ...props
}: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            fill="none"
            viewBox="0 0 27 27"
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
                d="M24.368 11.745l-1.103 4.702c-.945 4.062-2.812 5.704-6.322 5.367a11.828 11.828 0 01-1.823-.304l-1.89-.45c-4.691-1.114-6.142-3.431-5.04-8.134l1.103-4.714c.225-.956.495-1.788.832-2.475 1.316-2.722 3.555-3.453 7.313-2.565l1.879.44c4.713 1.102 6.153 3.43 5.05 8.133z"
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
                d="M16.943 21.814c-.698.472-1.575.866-2.644 1.215l-1.778.585c-4.466 1.44-6.817.236-8.268-4.23l-1.44-4.444C1.373 10.474 2.565 8.11 7.03 6.67l1.778-.585c.461-.146.9-.27 1.316-.349-.337.687-.607 1.52-.832 2.475L8.19 12.926c-1.102 4.703.349 7.02 5.04 8.134l1.89.45c.653.157 1.26.259 1.823.304zM14.22 9.596l5.457 1.384M13.118 13.95l3.262.833"
            ></path>
        </svg>
    )
}
