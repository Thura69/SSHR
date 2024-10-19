import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function EmployeeTwoIcon({
    active,
    activeColor,
    defaultColor,
    ...props
}: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="none"
            viewBox="0 0 26 26"
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
                d="M9.923 11.776a1.957 1.957 0 00-.357 0 4.788 4.788 0 01-4.626-4.8 4.806 4.806 0 014.81-4.81 4.805 4.805 0 01.173 9.61zM17.778 4.333c2.101 0 3.791 1.701 3.791 3.792a3.797 3.797 0 01-3.65 3.792 1.228 1.228 0 00-.282 0M4.507 15.774c-2.622 1.755-2.622 4.615 0 6.359 2.979 1.993 7.865 1.993 10.844 0 2.622-1.755 2.622-4.615 0-6.36-2.968-1.982-7.854-1.982-10.844 0zM19.868 21.666c.78-.162 1.517-.476 2.123-.942 1.69-1.268 1.69-3.358 0-4.626-.595-.455-1.321-.758-2.09-.931"
            ></path>
        </svg>
    )
}
