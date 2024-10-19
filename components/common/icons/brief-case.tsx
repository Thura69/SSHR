import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'
import React from 'react'

export function BriefCaseIcon({
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
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#000'
                }
                d="M16 22.75H8c-4.62 0-5.48-2.15-5.7-4.24l-.75-8.01c-.11-1.05-.14-2.6.9-3.76.9-1 2.39-1.48 4.55-1.48h10c2.17 0 3.66.49 4.55 1.48 1.04 1.16 1.01 2.71.9 3.77l-.75 7.99c-.22 2.1-1.08 4.25-5.7 4.25zm-9-16c-1.69 0-2.85.33-3.44.99-.49.54-.65 1.37-.52 2.61l.75 8.01c.17 1.58.6 2.89 4.21 2.89h8c3.6 0 4.04-1.31 4.21-2.9l.75-7.99c.13-1.25-.03-2.08-.52-2.62-.59-.66-1.75-.99-3.44-.99H7z"
            ></path>
            <path
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#000'
                }
                d="M16 6.75c-.41 0-.75-.34-.75-.75v-.8c0-1.78 0-2.45-2.45-2.45h-1.6c-2.45 0-2.45.67-2.45 2.45V6c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.8c0-1.76 0-3.95 3.95-3.95h1.6c3.95 0 3.95 2.19 3.95 3.95V6c0 .41-.34.75-.75.75zM12 16.75c-2.75 0-2.75-1.7-2.75-2.72V13c0-1.41.34-1.75 1.75-1.75h2c1.41 0 1.75.34 1.75 1.75v1c0 1.04 0 2.75-2.75 2.75zm-1.25-4v1.28c0 1.03 0 1.22 1.25 1.22s1.25-.16 1.25-1.23V13v-.25h-2.5z"
            ></path>
            <path
                fill={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.fill ?? defaultColor ?? '#000'
                }
                d="M14 14.77c-.37 0-.7-.28-.74-.66-.05-.41.24-.79.65-.84 2.64-.33 5.17-1.33 7.3-2.88.33-.25.8-.17 1.05.17.24.33.17.8-.17 1.05-2.34 1.7-5.1 2.79-8 3.16H14zM10 14.78h-.09c-2.74-.31-5.41-1.31-7.72-2.89a.753.753 0 01-.2-1.04c.23-.34.7-.43 1.04-.2 2.11 1.44 4.54 2.35 7.04 2.64.41.05.71.42.66.83-.03.38-.35.66-.73.66z"
            ></path>
        </svg>
    )
}