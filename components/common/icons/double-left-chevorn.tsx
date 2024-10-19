import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function DoubleLeftChevornIcon(props: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="33"
            fill="none"
            viewBox="0 0 32 33"
            {...props}
        >
            <path
                stroke={props.stroke ?? '#000'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.667"
                d="M22.666 22.064l-5.333-5.334 5.333-5.333m-8 10.667L9.333 16.73l5.333-5.333"
            ></path>
        </svg>
    )
}
