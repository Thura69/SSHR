import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function TrashIcon({
    active,
    activeColor,
    defaultColor,
    ...props
}: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 14 14"
            {...props}
        >
            <path
                fill={props.fill ?? defaultColor ?? '#000'}
                fillRule="evenodd"
                d="M6.267 2.56a.133.133 0 00-.133.134v1.2h2.4v-1.2a.133.133 0 00-.134-.133H6.267zM4.035 4.695l.497 5.967.002.033a.667.667 0 00.666.667h4.267a.667.667 0 00.668-.7l.497-5.967H4.035zm7.4 0l-.502 6.018a1.467 1.467 0 01-1.466 1.449H5.2a1.467 1.467 0 01-1.466-1.449l-.502-6.018h-.165a.4.4 0 010-.8h2.267v-1.2a.933.933 0 01.933-.933H8.4a.933.933 0 01.934.933v1.2H11.6a.4.4 0 010 .8h-.165zM6.267 6.027c.22 0 .4.18.4.4v3.2a.4.4 0 01-.8 0v-3.2c0-.22.18-.4.4-.4zm2.133 0c.221 0 .4.18.4.4v3.2a.4.4 0 01-.8 0v-3.2c0-.22.18-.4.4-.4z"
                clipRule="evenodd"
            ></path>
        </svg>
    )
}
