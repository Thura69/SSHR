import React from 'react'
import { SVGElementProps } from '@/types/svg-element-interface'

function User({
    active,
    activeColor,
    defaultColor,
    fill,
    ...props
}: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="none"
            viewBox="0 0 12 12"
            {...props}
        >
            <g clipPath="url(#clip0_2473_22054)">
                <path
                    fill={fill ?? '#A8A8A8'}
                    d="M6 6.75A3.375 3.375 0 106 0a3.375 3.375 0 000 6.75zm-2.22.75A3.78 3.78 0 000 11.28c0 .399.323.72.72.72h10.56a.72.72 0 00.72-.72A3.78 3.78 0 008.22 7.5H3.78z"
                ></path>
            </g>
            <defs>
                <clipPath id="clip0_2473_22054">
                    <path fill="#fff" d="M0 0H12V12H0z"></path>
                </clipPath>
            </defs>
        </svg>
    )
}

export default User
