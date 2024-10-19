import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function TrainingTwoIcon({
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
        >
            <path
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#000'
                }
                d="M18.1 17.75H5.9c-2.32 0-3.65-1.33-3.65-3.65V2c0-.41.34-.75.75-.75h18c.41 0 .75.34.75.75v12.1c0 2.32-1.33 3.65-3.65 3.65zm-14.35-15V14.1c0 1.49.66 2.15 2.15 2.15h12.19c1.49 0 2.15-.66 2.15-2.15V2.75H3.75z"
            ></path>
            <path
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#000'
                }
                d="M22 2.75H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h20c.41 0 .75.34.75.75s-.34.75-.75.75zM8 22.75c-.28 0-.54-.15-.67-.41a.745.745 0 01.34-1.01l3.58-1.79V17c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .28-.16.54-.42.67l-4 2c-.1.05-.22.08-.33.08z"
            ></path>
            <path
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#000'
                }
                d="M16 22.75c-.11 0-.23-.03-.33-.08l-4-2a.763.763 0 01-.34-1.01c.19-.37.64-.52 1.01-.34l4 2c.37.19.52.64.34 1.01a.77.77 0 01-.68.42zM7.5 11.75a.75.75 0 01-.48-1.33l3.15-2.63c.29-.24.66-.34 1.01-.28.36.06.67.28.86.6l1.05 1.75 2.93-2.44c.32-.26.79-.22 1.06.1s.22.79-.1 1.06l-3.15 2.63c-.29.24-.66.34-1.01.28-.36-.06-.67-.28-.86-.6l-1.05-1.75-2.93 2.44c-.14.11-.31.17-.48.17z"
            ></path>
        </svg>
    )
}
