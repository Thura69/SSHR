'use client'
import menuStore from '@/state/zustand/menu'
import { StarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Menu } from '@/types/menu/menu'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import navbarStore from '@/state/zustand/navbar'

const RenderGrandchildMenuList = () => {
    const router = useRouter()
    const selectedMenuId = menuStore((state) => state.selectedMenuId)
    const selectedMenu = menuStore((state) => state.selectedMenu)

    const isInitialMenu = navbarStore((state) => state.isInitialMenu)
    const setIsInitialMenu = navbarStore((state) => state.setIsInitialMenu)

    const selectedMenuNestedLevel = menuStore(
        (state) => state.selectedMenuNestedLevel,
    )
    const setSelectedSubMenu = menuStore((state) => state.setSelectedSubMenu)
    const setSelectedSubMenuId = menuStore(
        (state) => state.setSelectedSubMenuId,
    )




    // useEffect(() => {
    //     if (
    //         selectedMenu &&
    //         selectedMenu?.children &&
    //         selectedMenuNestedLevel === 2 &&
    //         isInitialMenu
    //     ) {
    //         setSelectedSubMenu(selectedMenu.children[0])
    //         setSelectedSubMenuId(selectedMenu.children[0].menu_id)

    //         setIsInitialMenu(false)
    //         router.push('/' + selectedMenu.children[0].web_url)
    //     }
    // }, [selectedMenu?.menu_id, selectedMenuNestedLevel, isInitialMenu])

    const getMenuName = (item: Menu) => {
        if (item.tbl_menu_language) {
            return item.tbl_menu_language[0].translated
        } else {
            return item.menu_name
        }
    }

    return (
        <div className="p-4">
            <div className={'grid md:grid-cols-3 lg:grid-cols-4 gap-4'}>
                {selectedMenuNestedLevel === 3 &&
                    selectedMenuId &&
                    selectedMenu?.children &&
                    selectedMenu.children.map((menu: Menu, i: number) => {
                        return (
                            <div key={menu?.menu_id + i}>
                                <div className="h-[50px] bg-white shadow mb-3 flex w-full items-center rounded relative px-5">
                                    <p className="font-semibold text-sm line-clamp-1">
                                        {getMenuName(menu)}
                                    </p>
                                    <div className="absolute left-0 h-[25px] rounded-3xl w-[3px] bg-primary-500" />
                                </div>
                                <div className="h-[200px] md:h-[300px] overflow-y-auto shadow">
                                    {menu?.children ? (
                                        <>
                                            {menu?.children.map(
                                                (
                                                    childMenu: Menu,
                                                    index: number,
                                                ) => (
                                                    <Link
                                                        key={
                                                            menu?.menu_id +
                                                            index
                                                        }
                                                        href={`/${childMenu?.web_url}`}
                                                        onClick={() => {
                                                            setSelectedSubMenu(
                                                                menu,
                                                            )
                                                        }}
                                                        className="h-[50px] bg-white flex w-full items-center border-b last:border-0 gap-4 px-4 group"
                                                    >
                                                        <StarIcon
                                                            className={cn(
                                                                'text-neutral-500 stroke-1 group-hover:text-primary-500',
                                                            )}
                                                        />
                                                        <p
                                                            className={cn(
                                                                'text-sm group-hover:text-primary-500 line-clamp-2',
                                                            )}
                                                        >
                                                            {getMenuName(
                                                                childMenu,
                                                            )}
                                                        </p>
                                                    </Link>
                                                ),
                                            )}
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        )
                    })}
            </div>
            {selectedMenuNestedLevel === 2 ? (
                <div className={cn('grid-cols-2 gap-4 grid md:hidden ')}>
                    {selectedMenuId &&
                        selectedMenu &&
                        selectedMenu?.children &&
                        selectedMenu.children.map(
                            (menu: Menu, index: number) => {
                                return (
                                    <Link
                                        href={`/${menu.web_url}`}
                                        key={menu?.web_url + '_' + index}
                                        className=""
                                    >
                                        <div className="bg-white flex w-full items-center rounded relative px-5">
                                            <p className="text-sm line-clamp-1 hover:text-primary-500">
                                                {getMenuName(menu)}
                                            </p>
                                            <div className="absolute left-0 h-[25px] rounded-3xl w-[3px] bg-primary-500" />
                                        </div>
                                    </Link>
                                )
                            },
                        )}
                </div>
            ) : null}
        </div>
    )
}
export default RenderGrandchildMenuList
