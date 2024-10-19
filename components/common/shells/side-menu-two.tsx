'use client'

import React, { FC } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { Button } from '../../ui/button'
import { cn, parseMenuToHref } from '@/lib/utils'
import { useSideMenuContext } from '@/state/side-menu-context'
import menuStore from '@/state/zustand/menu'
import Image from 'next/image'
import Logo from '@/public/logo.svg'
import { DoubleLeftChevornIcon } from '@/components/common/icons'
import useDynamicMenu from '@/hooks/use-dynamic-menu'
import SideMenuItem from '@/components/common/shells/side-menu-item'
import SideMenuLoader from '@/components/common/loaders/side-menu'
import navbarStore from '@/state/zustand/navbar'
import { useRouter } from 'next/navigation'

export const SideMenuTwo = () => {
    const { value: expended, toggle, setFalse } = useSideMenuContext()
    const isTabletOrMobile = useMediaQuery('(max-width: 1224px)')
    const isMobile = useMediaQuery('(max-width: 850px)')

    const { menu, isLoading } = useDynamicMenu()
    const router = useRouter()
    const selectedMenuId = menuStore((state) => state.selectedMenuId)
    const setSelectedMenuId = menuStore((state) => state.setSelectedMenuId)
    const setSelectedMenu = menuStore((state) => state.setSelectedMenu)
    const setSelectedGrandSubMenuId = menuStore(
        (state) => state.setSelectedGrandSubMenuId,
    )
    const setIsInitialMenu = navbarStore((state) => state.setIsInitialMenu)

    console.log('232323')
    console.log(menu)
    console.log('232323')

    const isActive = (item: any) => item.menu_id === selectedMenuId

    const handleMenuClick = (item: any) => {
        const url = generateMenuUrl(item.menu_name)

        if (selectedMenuId === 135) {
            setTimeout(() => {
                router.push(url)
            }, 0)
        } else if (selectedMenuId === 336) {
            setTimeout(() => {
                router.push('/payroll')
            })
        } else {
            setTimeout(() => {
                router.push(url)
            }, 10)
        }

        setSelectedMenuId(item.menu_id)
        setSelectedMenu(item)
        setIsInitialMenu(true)
        setSelectedGrandSubMenuId(undefined)

        isTabletOrMobile && setFalse()
    }

    const isReportMenu = (menuName: string) => {
        const menuStr = parseMenuToHref(menuName)
        return menuStr === 'reports'
    }

    const isDashboard = (menuName: string) => {
        const menuStr = parseMenuToHref(menuName)
        return menuStr === 'dashboard'
    }

    const isPayroll = (menuName: string) => {
        const menuStr = parseMenuToHref(menuName)
        return menuStr === 'payroll'
    }

    const generateMenuUrl = (menuName: string) => {
        return isReportMenu(menuName) ||
            isDashboard(menuName) ||
            isPayroll(menuName)
            ? `/${parseMenuToHref(menuName)}`
            : `/_/${parseMenuToHref(menuName)}`
    }

    return (
        <div
            className={cn(
                'w-full md:border-r  md:relative',
                expended ? 'menuSidebar  ' : 'menuSideBarOut',
            )}
            // style={{
            //     height: expended
            //         ? isTabletOrMobile
            //             ? 'calc(100svh - 75px)'
            //             : 'calc(100svh - 102px)'
            //         : 'calc(100svh - 140px)',
            // }}
        >
            <div
                className={cn(
                    'flex items-start space-y-[10px]   origin-left px-5 pt-[10px]',
                    {
                        ' flex-col w-full  pb-[10px]': !expended,
                        'flex-col px-5   pb-[10px]': expended,
                        'pb-[10px] w-[250px]   pt-[10px]': isMobile && expended,
                        'pb-[10px] w-full': isTabletOrMobile && expended,
                        'w-fit': isTabletOrMobile && !expended,
                    },
                )}
            >
                <Image
                    src={Logo}
                    className="mt-2"
                    width={46}
                    height={36}
                    alt="logo"
                />

                <div
                    className={
                        expended
                            ? '  absolute right-[-20px] top-[63px]  '
                            : ' menuArrayOut'
                    }
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggle}
                        className="rounded-full  transition-all flex self-center m-0 bg-primary-500 hover:bg-primary-600 hover:rounded-full "
                    >
                        <DoubleLeftChevornIcon
                            className={cn(
                                expended
                                    ? 'menuIconRotate'
                                    : 'rotate-180  menuIconRotateOut',
                            )}
                            stroke={'#fff'}
                        />
                    </Button>
                </div>
            </div>

            <div
                className={cn(
                    'overflow-x-auto    w-full ',
                    expended && 'mt-[50px]',
                )}
                style={{
                    height: expended
                        ? isTabletOrMobile
                            ? 'calc(100svh - 85px)'
                            : 'calc(100svh - 85px)'
                        : 'calc(100svh - 140px)',
                }}
            >
                <section
                    className={cn(
                        'flex   realtive overflow-y-hidden flex-col',
                        {
                            'space-y-[0px]   items-center justify-center':
                                !expended,
                            'w-[250px] ': expended,
                            'w-full ps-4': isMobile && expended,
                            'w-fit': isMobile && !expended,
                        },
                    )}
                >
                    {!isLoading
                        ? menu?.data?.map((item: any) => (
                              <p
                                  key={item.menu_id}
                                  onClick={() => handleMenuClick(item)}
                                  data-id={item?.menu_id}
                                  className="min-w-fit w-full px-5"
                              >
                                  <SideMenuItem
                                      item={item}
                                      isActive={isActive}
                                  />
                              </p>
                          ))
                        : null}
                    {isLoading ? <SideMenuLoader /> : null}
                    <div className="absolute  left-0 right-0 bottom-[10px] pointer-events-none transition-all shadow-gray-400   bg-transparent duration-200 ease-out shadow-lg off-bottom"></div>
                </section>
            </div>
        </div>
    )
}
