import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function BuildingIcon({
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
                        : props.fill ?? '#000'
                }
                d="M6.25 12.46a.75.75 0 000 1.5h.5a.75.75 0 100-1.5h-.5zM5.5 9.71a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm.75-4.25a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM9 13.21a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm.75-4.25a.75.75 0 000 1.5h.5a.75.75 0 100-1.5h-.5zM9 6.21a.75.75 0 01.75-.75h.5a.75.75 0 110 1.5h-.5A.75.75 0 019 6.21zm4.25 6.25a.75.75 0 000 1.5h.5a.75.75 0 100-1.5h-.5zm-.75-2.75a.75.75 0 01.75-.75h.5a.75.75 0 110 1.5h-.5a.75.75 0 01-.75-.75zm.75-4.25a.75.75 0 100 1.5h.5a.75.75 0 100-1.5h-.5z"
            ></path>
            <path
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#000'
                }
                d="M2 20.46v-17a2 2 0 012-2h12a2 2 0 012 2v17c0 .174-.022.34-.063.5H20a.5.5 0 00.5-.5v-8a.5.5 0 00-.2-.4l-.5-.374a.75.75 0 01.9-1.2l.5.375c.504.378.8.97.8 1.6v8a2 2 0 01-2 2h-3.562a.76.76 0 01-.166-.018c-.089.012-.18.018-.272.018h-3.75a.75.75 0 01-.75-.75v-2.25h-3v2.25a.75.75 0 01-.75.75H4a2 2 0 01-2-2zm2 .5h3v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25h3a.5.5 0 00.5-.5v-17a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v17a.5.5 0 00.5.5z"
            ></path>
        </svg>
    )
}
