import { SVGElementProps } from '@/types/svg-element-interface'
import React from 'react'

export function CrossIcon(props: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="none"
            viewBox="0 0 25 25"
            {...props}
        >
            <path
                stroke={props?.stroke ?? '#1CBCC8'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.023 6.577l-12 12M6.023 6.577l12 12"
            ></path>
        </svg>
    )
}
