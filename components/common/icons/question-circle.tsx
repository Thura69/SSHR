import { cn } from '@/lib/utils'
import { SVGElementProps } from '@/types/svg-element-interface'

import React from 'react'

export function QuestionCircle(props: SVGElementProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
            className={cn('group', props.className)}
        >
            <path
                fill={props.fill ?? '#817F9B'}
                className={props.className}
                d="M12 1.5C6.202 1.5 1.5 6.202 1.5 12S6.202 22.5 12 22.5 22.5 17.798 22.5 12 17.798 1.5 12 1.5zm0 19.219A8.72 8.72 0 013.281 12 8.72 8.72 0 0112 3.281 8.72 8.72 0 0120.719 12 8.72 8.72 0 0112 20.719z"
            ></path>
            <path
                fill={props.fill ?? '#817F9B'}
                className={props.className}
                d="M14.616 7.423c-.704-.617-1.632-.954-2.616-.954-.984 0-1.912.34-2.616.954-.73.64-1.134 1.5-1.134 2.42v.179c0 .103.084.187.188.187h1.124a.188.188 0 00.188-.187v-.178c0-1.034 1.01-1.875 2.25-1.875s2.25.841 2.25 1.875c0 .729-.516 1.397-1.315 1.704a2.62 2.62 0 00-1.22.958c-.308.446-.467.98-.467 1.521v.504c0 .103.084.188.187.188h1.125a.188.188 0 00.188-.188V14a1.132 1.132 0 01.724-1.05c1.383-.532 2.276-1.75 2.276-3.105.002-.921-.401-1.781-1.132-2.421zm-3.553 9.733a.938.938 0 101.875 0 .938.938 0 00-1.876 0z"
            ></path>
        </svg>
    )
}
