import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function CrossCircle(props: SVGElementProps) {
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
                fill="#E03137"
                d="M8 1.333C4.327 1.333 1.333 4.328 1.333 8c0 3.674 2.994 6.667 6.667 6.667 3.673 0 6.667-2.993 6.667-6.667 0-3.673-2.994-6.667-6.667-6.667zm2.24 8.2a.503.503 0 010 .707.494.494 0 01-.707 0L8 8.707 6.467 10.24c-.1.1-.227.147-.354.147a.494.494 0 01-.353-.147.503.503 0 010-.707L7.293 8 5.76 6.467a.503.503 0 010-.707.503.503 0 01.707 0L8 7.294 9.533 5.76a.503.503 0 01.707 0 .503.503 0 010 .707L8.707 8l1.533 1.534z"
            ></path>
        </svg>
    )
}
