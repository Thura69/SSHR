import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function SideMenuLoader() {
    return (
        <section className={cn('flex flex-col space-y-2')}>
            {Array(20)
                .fill(0)
                .map((item: any, index) => (
                    <Skeleton key={index} className="p-2 h-8 w-full" />
                ))}
        </section>
    )
}
