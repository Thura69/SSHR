import { Menu } from '@/types/menu/menu'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State = {
    menuList: { data: Menu[] }
    selectedMenuId: number
    selectedMenu: Menu
    selectedSubMenuId: number
    selectedGrandSubMenuId: number
    selectedMenuNestedLevel: number
    firstChildOfSelectedParentMenu: Menu
    selectedSubMenu: Menu
    selectedGrandSubMenu: Menu
}

type Actions = {
    setSelectedMenuId: (id: number) => void
    setSelectedMenu: (menu: Menu) => void
    setSelectedMenuNestedLevel: (level: number) => void
    setMenuList: (data: Menu[]) => void
    setFirstChildOfSelectedParentMenu: (menu: Menu) => void
    setSelectedSubMenuId: (id: number) => void
    setSelectedSubMenu: (menu: Menu) => void
    setSelectedGrandSubMenuId: (id: number | undefined) => void
    setSelectedGrandSubMenu: (menu: Menu) => void
    clearMenus: () => void
}

const menuStore = create<Partial<State> & Actions>()(
    devtools(
        persist(
            (set) => ({
                //state
                menuList: undefined,
                selectedMenuId: undefined,
                selectedSubMenuId: undefined,
                selectedGrandSubMenuId: undefined,
                selectedMenuNestedLevel: undefined,
                selectedMenu: undefined,
                firstChildOfSelectedParentMenu: undefined,
                selectedSubMenu: undefined,
                selectedGrandSubMenu: undefined,

                //actions
                setSelectedMenuId: (id: number) => set({ selectedMenuId: id }),
                setMenuList: (data: any) => set({ menuList: data }),
                setSelectedMenuNestedLevel: (level: number) =>
                    set({ selectedMenuNestedLevel: level }),
                setSelectedMenu: (menu: any) => set({ selectedMenu: menu }),
                setFirstChildOfSelectedParentMenu: (menu: any) =>
                    set({ firstChildOfSelectedParentMenu: menu }),
                setSelectedSubMenuId: (id: number) =>
                    set({ selectedSubMenuId: id }),
                setSelectedSubMenu: (subMenu) =>
                    set({ selectedSubMenu: subMenu }),
                setSelectedGrandSubMenuId: (id: number | undefined) =>
                    set({ selectedGrandSubMenuId: id }),
                setSelectedGrandSubMenu: (grandSubMenu) =>
                    set({ selectedGrandSubMenu: grandSubMenu }),
                clearMenus: () =>
                    set({
                        selectedMenu: undefined,
                        selectedMenuId: undefined,
                        selectedSubMenu: undefined,
                        selectedSubMenuId: undefined,
                        selectedGrandSubMenu: undefined,
                        selectedGrandSubMenuId: undefined,
                        selectedMenuNestedLevel: undefined,
                    }),
            }),
            { name: 'menuStore' },
        ),
    ),
)

export default menuStore
