import React from 'react'
import { SVGElementProps } from '@/types/svg-element-interface'

export function PlusOutlineIcon(props: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="none"
            viewBox="0 0 21 21"
            {...props}
        >
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M10.333 3.794c.46 0 .834.373.834.833v11.667a.833.833 0 11-1.667 0V4.627c0-.46.373-.833.833-.833z"
                clipRule="evenodd"
            ></path>
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M3.667 10.46c0-.46.373-.833.833-.833h11.667a.833.833 0 110 1.667H4.5a.833.833 0 01-.833-.833z"
                clipRule="evenodd"
            ></path>
        </svg>
    )
}
