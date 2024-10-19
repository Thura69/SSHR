'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn, truncate } from '@/lib/utils'
import navbarStore from '@/state/zustand/navbar'
import { BreadcrumbsProps } from '@/types/common'

export const Breadcrumbs = ({
    segments,
    separator,
    truncationLength = 0,
    className,
    ...props
}: BreadcrumbsProps) => {
    const setIsInitialMenu = navbarStore((state) => state.setIsInitialMenu)

    return (
        <nav
            aria-label="breadcrumbs"
            className={cn(
                'flex w-full items-center overflow-auto  font-medium text-muted-foreground',
                className,
            )}
            {...props}
        >
            {segments.map((segment, index) => {
                const isLastSegment = index === segments.length - 1
                const isFirstSegment = index === 0
                return (
                    <div
                        key={segment.href}
                        className="flex items-center"
                    >
                        {isLastSegment ? (
                            <span className="truncate  text-zinc-500 cursor-default">
                                {segment.title}
                            </span>
                        ) : (
                            <Link
                                aria-current={
                                    isLastSegment ? 'page' : undefined
                                }
                                href={segment.href}
                                onClick={() => {
                                    if (isFirstSegment) {
                                        setIsInitialMenu(true)
                                    }
                                }}
                                className={cn(
                                    'truncate transition-colors text-muted-foreground text-primary-500 hover:text-primary-300 font-bold',
                                )}
                            >
                                {truncationLength > 0 && segment.title
                                    ? truncate(segment.title, truncationLength)
                                    : segment.title}
                            </Link>
                        )}
                        {!isLastSegment ? (
                            <p
                                className="mx-2 text-zinc-500 text-lg"
                                aria-hidden={true}
                            >
                                /
                            </p>
                        ) : null}
                    </div>
                )
            })}
        </nav>
    )
}
