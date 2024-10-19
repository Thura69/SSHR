'use client'

import React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { useSideMenuContext } from '@/state/side-menu-context'
import { cn } from '@/lib/utils'

const SideMenuBackdrop = () => {
    const { setFalse, value: expended } = useSideMenuContext()
    const isMobile = useMediaQuery('(max-width:480px)')

    return (
        <div
            onClick={setFalse}
            className={cn(
                'hidden fixed top-0 left-0 bg-gray-100 h-full w-full z-20 backdrop-blur-md bg-opacity-30',
                {
                    block: isMobile && expended,
                },
            )}
        />
    )
}

export default SideMenuBackdrop
