import { cn, getMenuName } from '@/lib/utils'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useSideMenuContext } from '@/state/side-menu-context'
import Image from 'next/image'
import { Tooltip } from 'react-tooltip'

const SideMenuItem = ({
    item,
    isActive,
}: {
    item: any
    isActive: (item: any) => boolean
}) => {
    const { value: expended } = useSideMenuContext()

    return (
        <div>
            <a id={'my-anchor-element' + item?.menu_id}>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'p-2 flex justify-start   items-center w-full text-sideMenuTextColor2 hover:bg-primary-50',
                    )}
                >
                    {item.original_icon ? (
                        <Image
                            className="w-[26px] h-[26px]"
                            src={
                                isActive(item)
                                    ? `/menu-svgs/${item.hover_icon}`
                                    : `/menu-svgs/${item.original_icon}`
                            }
                            width={26}
                            height={26}
                            alt={'icon'}
                        />
                    ) : null}

                    <div
                        className={cn(
                            'm-0 p-0 ml-2 text-[#52525B]  font-[500] text-sm',
                            {
                                'text-primary-500 font-bold': isActive(item),
                            },
                            expended ? 'menuNameIn' : 'menuNameOut hidden ',
                        )}
                    >
                        {getMenuName(item)}
                    </div>
                </Button>
            </a>
            {!expended ? (
                <Tooltip
                    style={{ zIndex: 1000 }}
                    anchorSelect={'#my-anchor-element' + item?.menu_id}
                    content={getMenuName(item)}
                />
            ) : null}
        </div>
    )
}
export default SideMenuItem
