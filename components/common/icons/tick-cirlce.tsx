import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function TickCircle(props: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
            {...props}
        >
            <path
                fill="#3562D5"
                d="M8 1.333C4.327 1.333 1.333 4.328 1.333 8c0 3.674 2.994 6.667 6.667 6.667 3.673 0 6.667-2.993 6.667-6.667 0-3.673-2.994-6.667-6.667-6.667zm3.187 5.134l-3.78 3.78a.5.5 0 01-.707 0L4.813 8.36a.503.503 0 010-.706.503.503 0 01.707 0l1.533 1.533L10.48 5.76a.503.503 0 01.707 0 .503.503 0 010 .707z"
            ></path>
        </svg>
    )
}
