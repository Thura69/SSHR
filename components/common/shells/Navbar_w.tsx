'use client'

import Link from 'next/link'
import React, {
    startTransition,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useTransition,
} from 'react'
import { Button } from '../../ui/button'
import { MenuIcon, QuestionCircle, SearchIcon, SettingIcon } from '../icons'
import { ProfileDropdown } from '../../profile-dropdown'
import { cn } from '@/lib/utils'
import { useMediaQuery } from 'usehooks-ts'
import useDynamicMenu from '@/hooks/use-dynamic-menu'
import menuStore from '@/state/zustand/menu'

import { usePathname, useRouter } from 'next/navigation'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Menu } from '@/types/menu/menu'
import { useSideMenuContext } from '@/state/side-menu-context'
import { LogoutDropDown } from '@/components/auth/components/logout-menu'

import Notification from '@/components/notification'

const LeftArrowButton = () => {
    const { isFirstItemVisible, scrollPrev } =
        React.useContext(VisibilityContext)
    const pathname = usePathname()

    return (
        <>
            <Button
                key={pathname}
                variant={'ghost'}
                onClick={() => scrollPrev()}
                className={cn('ms-8 mr-1 p-0 visible hover:bg-white', {
                    visible: !false,
                })}
            >
                <ChevronLeft className={cn('w-5 h-5 text-zinc-500')} />
            </Button>
        </>
    )
}

function RightArrowButton() {
    const { isLastItemVisible, scrollNext, ...rest } =
        React.useContext(VisibilityContext)

    return (
        <Button
            variant={'ghost'}
            disabled={isLastItemVisible}
            onClick={() => scrollNext()}
            className={cn('p-2 invisible hover:bg-white', {
                visible: !isLastItemVisible,
            })}
        >
            <ChevronRight className="w-5 h-5 text-zinc-500" />
        </Button>
    )
}

export const Navbar = () => {
    const route = useRouter()
    const [_, startTransition] = useTransition()
    const { toggle } = useSideMenuContext()
    const isExtraSmall = useMediaQuery('(max-width:280px')
    const isMobile = useMediaQuery('(max-width:767px)')
    const { nestedMenuLevel, selectedMenu } = useDynamicMenu()
    const pathname = usePathname()

    const {
        setSelectedMenuId,
        setSelectedSubMenu,
        selectedSubMenuId,
        setSelectedSubMenuId,
        selectedMenuId,
        selectedGrandSubMenuId,
        setSelectedGrandSubMenuId,
    } = menuStore((state) => state)

    const selectedSubMenu = menuStore((state) => state.selectedSubMenu)

    const segmentCount = pathname.split('/').length

    const showMenus =
        nestedMenuLevel === 3 && segmentCount === 3
            ? selectedSubMenu?.children
            : selectedMenu?.children

    const SHOW_SUBMENUS =
        (selectedMenu?.Menu_Name === 'Organisation Structure'
            ? true
            : segmentCount === 3) &&
        selectedMenu &&
        !isMobile &&
        Array.isArray(showMenus) &&
        showMenus?.length > 0

    const handleSettingClick = () => {
        if (selectedMenuId !== 135) {
            setSelectedMenuId(135)
        }
        setTimeout(() => {
            route.push(`/setting`)
        }, 100)
    }

    const handleNavClick = (item: any) => {
        if (nestedMenuLevel === 3) {
            route.push(`/${item.Web_URL}`)
        } else {
            startTransition(() => {
                setSelectedSubMenu(item)
                setSelectedSubMenuId(item.Menu_ID)
                setSelectedGrandSubMenuId(undefined)

                setTimeout(() => {
                    route.push(`/${item.Web_URL}`)
                }, 10)
            })
        }
    }

    const getMenuName = (item: Menu) => {
        if (item?.tbl_menu_language) {
            return item?.tbl_menu_language[0].translated
        } else {
            return item?.menu_name
        }
    }

    return (
        <nav
            className={cn(
                'pr-4 bg-white lg:pr-6 h-[65px] before:contents-[``] before:w-full before:border-b before:absolute before:bottom-0 xl:before:left-4 relative w-full ms-auto flex items-center justify-between overflow-hidden child-menu',
            )}
        >
            <div className="h-full flex flex-col justify-center">
                {SHOW_SUBMENUS ? (
                    <ScrollMenu
                        LeftArrow={<LeftArrowButton />}
                        RightArrow={RightArrowButton}
                        wrapperClassName="w-[180px] md:w-[300px] lg:w-[500px] 2xl:w-[800px] h-full justify-center lg:-ml-5"
                        itemClassName="mr-4 flex items-center h-full"
                        noPolyfill
                    >
                        {showMenus?.map((item: Menu) => (
                            <div
                                id={`menu-${item.menu_id}`}
                                key={item.menu_id}
                                tabIndex={0}
                                onClick={() => handleNavClick(item)}
                                className={cn(
                                    'menu-child h-full flex items-center border-b-4 border-b-transparent mt-1 justify-center hover:cursor-pointer group',
                                    {
                                        ' border-primary-500':
                                            nestedMenuLevel === 3
                                                ? item.menu_id ===
                                                  selectedGrandSubMenuId
                                                : item.menu_id ===
                                                  selectedSubMenuId,
                                    },
                                )}
                            >
                                <div className="text-sm font-semibold  text-sideMenuActiveText hover:text-primary-500">
                                    <p
                                        className={cn(
                                            'text-nowrap line-clamp-1 group-hover:text-primary-500',
                                        )}
                                    >
                                        {getMenuName(item)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </ScrollMenu>
                ) : (
                    <div />
                )}

                {isMobile ? (
                    <Button
                        className="p-0 ms-4"
                        variant="ghost"
                        onClick={toggle}
                    >
                        <MenuIcon />
                    </Button>
                ) : null}

                {segmentCount !== 3 &&
                selectedMenu?.Menu_Name !== 'Organisation Structure' &&
                !isMobile ? (
                    <p key={nestedMenuLevel} className="ms-6">
                        {getMenuName(selectedMenu)}
                    </p>
                ) : null}
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center md:gap-1 -mr-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="group w-[30px] max-xs:hidden hover:bg-white"
                    >
                        <QuestionCircle
                            className={cn(
                                'group-hover:fill-primary-500 w-[21px]',
                                {
                                    'w-[20px]': isExtraSmall,
                                },
                            )}
                        />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="group w-[30px] hover:bg-white"
                    >
                        <SearchIcon
                            className={cn(
                                'group-hover:stroke-primary-500 w-[22px]',
                                {
                                    'w-[20px]': isExtraSmall,
                                },
                            )}
                        />
                    </Button>
                    <Notification />
                    <a onClick={handleSettingClick}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="group w-[30px] hover:bg-white"
                        >
                            <SettingIcon
                                className={cn(
                                    'group-hover:fill-primary-500  w-[22px]',
                                    {
                                        'w-[20px]': isExtraSmall,
                                    },
                                )}
                            />
                        </Button>
                    </a>
                </div>
                <div className="md:flex rounded-full bg-neutral-100 h-[40px] w-[40px] justify-center items-center hover:bg-neutral-200 hover:cursor-pointer group">
                    <LogoutDropDown />
                </div>
                <ProfileDropdown />
            </div>
        </nav>
    )
}
