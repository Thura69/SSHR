import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'

interface ArrayBadgeProps {
    data: string[]
    wrap?: boolean
}

const ArrayBadge: React.FC<ArrayBadgeProps> = ({ data, wrap = true }) => {
    const [showAll, setShowAll] = useState(false)
    const dataCount: number = data.length
    const visibleBadges = data.slice(0, 2)
    const additionalCount = dataCount > 2 ? dataCount - 2 : 0

    const handleBadgeClick = () => {
        setShowAll(!showAll)
    }

    return (
        <div
            className={cn(
                'flex flex-nowrap gap-[10px] w-[150px]',
                wrap && 'flex-wrap',
            )}
        >
            {(showAll ? data : visibleBadges).map(
                (item: string, index: number) => (
                    <Badge
                        className={cn(
                            'h-[30px] py-[7px] px-[9px] w-fit rounded-[9px] border-zinc-400 bg-arrayBadgeBg',
                        )}
                        variant={'outline'}
                        key={index}
                    >
                        <span className="text-sideMenuTextColor2">{item}</span>
                    </Badge>
                ),
            )}

            {additionalCount > 0 && !showAll && (
                <div className="group">
                    <Badge
                        className={cn(
                            'h-[30px] py-[7px] px-[9px] z-50 w-fit rounded-[9px] border-zinc-400 bg-arrayBadgeBg',
                            'flex-shrink-0', // Ensure this badge doesn't shrink
                            'cursor-pointer',
                            'group-hover:border-secondary-500',
                        )}
                        variant={'outline'}
                        onClick={handleBadgeClick}
                    >
                        <span className="text-sideMenuTextColor2 group-hover:text-secondary-500">
                            + {additionalCount}
                        </span>
                    </Badge>
                </div>
            )}
        </div>
    )
}

export default ArrayBadge
