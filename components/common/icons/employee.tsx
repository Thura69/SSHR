import { COLORS } from '@/constants'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function EmployeeIcon({
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
            <g
                stroke={
                    active
                        ? activeColor ?? COLORS.sideMenuActiveText
                        : props.stroke ?? defaultColor ?? '#000'
                }
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.714"
                clipPath="url(#clip0_242_3429)"
            >
                <path d="M6.909 8.175a3.429 3.429 0 100-6.857 3.429 3.429 0 000 6.857z"></path>
                <path d="M9.799 18.503l-.638 5.101H4.675l-.857-6.857H.907v-2.571a6 6 0 0111.9-1.087m2.923 2.952v-1.114a1.714 1.714 0 011.715-1.715h.706a1.714 1.714 0 011.714 1.715v1.114m-7.36 1.512c0-.835.678-1.512 1.513-1.512h7.563c.835 0 1.512.677 1.512 1.514v4.537a1.512 1.512 0 01-1.512 1.512h-7.563a1.512 1.512 0 01-1.512-1.512v-4.539z"></path>
            </g>
            <defs>
                <clipPath id="clip0_242_3429">
                    <path
                        fill="#fff"
                        d="M0 0H24V24H0z"
                        transform="translate(0 .461)"
                    ></path>
                </clipPath>
            </defs>
        </svg>
    )
}
