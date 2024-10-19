import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import React, { useEffect, useState } from 'react'
import {
    ControllerRenderProps,
    FieldValues,
    useFormContext,
} from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { cn, getMenuName, getNestedLevel } from '@/lib/utils'
import { useGetRoleDynamicMenu } from '@/service/query-hooks/use-roles'
import { Button } from '@/components/ui/button'
import ThreeUsers from '@/components/common/icons/three-users'
import TwoUsers from '@/components/common/icons/two-users'
import User from '@/components/common/icons/user'
import { COLORS } from '@/constants'
import FourUsers from '@/components/common/icons/four-users'
import { useTranslation } from 'react-i18next'
import { Menu } from '@/types/menu/menu'
import { CheckedState } from '@radix-ui/react-checkbox'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import useAuthStore from '@/state/zustand/auth-store'

const ModulePermissionForm = ({
    selectedMainMenus,
    setSelectedMainMenus,
}: {
    selectedMainMenus: any
    setSelectedMainMenus: any
}) => {
    const form = useFormContext()
    const { t } = useTranslation('roleCreate')
    const userData = useAuthStore((state) => state.userData)
    const { data: roleDynamicMenuList } = useGetRoleDynamicMenu({
        is_mobile: false,
        role_id: userData?.role_id,
        tenant_id: userData?.tenant_id,
    })



    const watchSearchInput = form.watch('module-search')
    const [searchedMenus, setSearchedMenus] = useState<any[]>([])

    const permissions = [
        {
            id: 'is_write',
            label: t('create'),
        },
        {
            id: 'is_read',
            label: t('read'),
        },
        {
            id: 'is_edit',
            label: t('update'),
        },
        {
            id: 'is_delete',
            label: t('delete'),
        },
        {
            id: 'is_import',
            label: t('import'),
        },
        {
            id: 'is_export',
            label: t('export'),
        },
        {
            id: 'is_grant',
            label: t('isGrant'),
        },
    ] as const



    
    function searchMenu(menu: any, searchInput: any) {
        // Check if the current menu matches the search input
        if (
            menu?.menu_name?.toLowerCase().includes(searchInput?.toLowerCase())
        ) {
            return menu
        }

        if (menu?.children) {
            // Recursively search through the nested children
            for (const child of menu?.children) {
                const result = searchMenu(child, searchInput)
                if (result !== null) {
                    return menu // Return the whole object if the result is from a child
                }
            }
        }

        // If no match found in children, return null
        return null
    }

    function updatedSearchFunction(
        roleDynamicMenuList: any,
        watchSearchInput: any,
    ) {
        const results = []
        for (const menu of roleDynamicMenuList.data) {
            const result = searchMenu(menu, watchSearchInput)
            if (result !== null) {
                results.push(result)
            }
        }

        return results
    }

    useEffect(() => {
        if (roleDynamicMenuList) {
            const result = updatedSearchFunction(
                roleDynamicMenuList,
                watchSearchInput,
            )
            setSearchedMenus(result)
        }
    }, [watchSearchInput, roleDynamicMenuList])

    const isPermissionCheckboxesShow = (menu: Menu) => {
        return selectedMainMenus.includes(menu?.menu_id) ?? false
    }

    const getNestedMenuLevel = (selectedMenu: Menu) =>
        selectedMenu && getNestedLevel(selectedMenu)

   


    const menus = watchSearchInput ? searchedMenus : roleDynamicMenuList?.data;


    const handleMainMenuCheck = (
        field: ControllerRenderProps<FieldValues, `ID-${string}`>,
        subChildMenu: Menu,
        checked: CheckedState,
    ) => {

       

        const menuId = subChildMenu?.menu_id
        field.onChange(checked)

        

        const isSelected = selectedMainMenus.includes(menuId)




        if (!isSelected) {
            setSelectedMainMenus((prev: any) => [...prev, menuId])
        }
        if (isSelected) {
            const updatedCheckedMainMenuIds = selectedMainMenus.filter(
                (mId: any) => mId !== menuId,
            )
 
            

            setSelectedMainMenus(updatedCheckedMainMenuIds)
        }
    }

    

    const watchIsAdmin = form.watch('setup-adm')

    return (
        <>
            <FormField
                control={form.control}
                name="module-search"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div className={'mb-6 '}>
                                <Input
                                    className="w-full"
                                    endIcon={
                                        <SearchIcon className="w-5 h-5 me-5 text-zinc-500" />
                                    }
                                    placeholder={t('module-search')}
                                    {...field}
                                />
                            </div>
                        </FormControl>
                    </FormItem>
                )}
            />
            

            {menus?.map((menu: Menu) => (
                <section
                    key={menu?.menu_id + JSON.stringify(roleDynamicMenuList)}
                >
                    <AccordionItem
                        key={watchIsAdmin + ''}
                        value={menu?.menu_name}
                        className=" bg-primary-50 border-t  border-t-primary-200 border-r-0 border-l-0 rounded-[6px] hover:no-underline mb-3 group"
                    >
                        <AccordionTrigger className="px-[16px] md:px-[40px]">
                            <span className="font-semibold flex items-center gap-2">
                                {getMenuName(menu)}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent
                            value="role"
                            key={watchIsAdmin + ''}
                            className="bg-white divide-y"
                        >
                            {getNestedMenuLevel(menu) === 1 ? (
                                <p className=' mt-5 text-center'>No subchild</p>
                            ) : null}

                            {getNestedMenuLevel(menu) === 2 ? (
                                <section>
                                    {menu?.children?.map(
                                        (subChildMenu: Menu) => (
                                            <section
                                                key={subChildMenu?.menu_id}
                                                className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-5 px-4"
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name={`ID-${String(subChildMenu?.menu_id)}`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <div className="flex items-center gap-4">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        key={
                                                                            watchIsAdmin +
                                                                            ''
                                                                        }
                                                                        checked={
                                                                            field.value
                                                                        }
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) => {
                                                                            handleMainMenuCheck(
                                                                                field,
                                                                                subChildMenu,
                                                                                checked,
                                                                            )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel>
                                                                    {getMenuName(
                                                                        subChildMenu,
                                                                    )}
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="flex items-center justify-start">
                                                    <div className="ms-5 mt-4 lg:ms-0  lg:mt-0 flex flex-wrap lg:justify-end">
                                                        {permissions.map(
                                                            (permission) => (
                                                                <RenderPermissionChecks
                                                                    key={
                                                                        permission.id
                                                                    }
                                                                    permission={
                                                                        permission
                                                                    }
                                                                    menu={
                                                                        subChildMenu
                                                                    }
                                                                    setCheckedMainMenus={
                                                                        setSelectedMainMenus
                                                                    }
                                                                    isPermissionCheckboxesShow={
                                                                        isPermissionCheckboxesShow
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </section>
                                        ),
                                    )}
                                </section>
                            ) : null}

                            {getNestedMenuLevel(menu) === 3 ? (
                                <section className="ps-6 pt-4">
                                    {menu?.children?.map(
                                        (subChildMenu: any) => (
                                            <AccordionItem
                                                key={subChildMenu?.menu_id}
                                                value={subChildMenu?.menu_name}
                                                className="border-0 bg-primary-50 border-t border-t-primary-200 border-r-0 border-l-0 rounded-[6px] hover:no-underline mb-3"
                                            >
                                                <AccordionTrigger className="px-[16px] md:px-[40px] rounded">
                                                    <span className="font-semibold">
                                                        {getMenuName(
                                                            subChildMenu,
                                                        )}
                                                    </span>
                                                </AccordionTrigger>
                                                <AccordionContent
                                                    value="role"
                                                    className="bg-white divide-y"
                                                >
                                                    {subChildMenu?.children?.map(
                                                        (grandChild: any) => (
                                                            <section
                                                                key={
                                                                    grandChild?.menu_id
                                                                }
                                                                className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-5 px-4"
                                                            >
                                                                <FormField
                                                                    control={
                                                                        form.control
                                                                    }
                                                                    name={`ID-${String(grandChild?.menu_id)}`}
                                                                    render={({
                                                                        field,
                                                                    }) => (
                                                                        <FormItem>
                                                                            <div className="flex items-center gap-4">
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={
                                                                                            field.value
                                                                                        }
                                                                                        onCheckedChange={(
                                                                                            checked,
                                                                                        ) => {
                                                                                            field.onChange(
                                                                                                checked,
                                                                                            )
                                                                                            handleMainMenuCheck(
                                                                                                field,
                                                                                                grandChild,
                                                                                                checked,
                                                                                            )
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel>
                                                                                    {getMenuName(
                                                                                        grandChild,
                                                                                    )}
                                                                                </FormLabel>
                                                                            </div>
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                <div
                                                                    className={
                                                                        'flex items-center'
                                                                    }
                                                                >
                                                                    <div className="ms-5 mt-4 flex flex-wrap lg:justify-end">
                                                                        {permissions.map(
                                                                            (
                                                                                permission,
                                                                            ) => (
                                                                                <RenderPermissionChecks
                                                                                    key={
                                                                                        permission.id
                                                                                    }
                                                                                    permission={
                                                                                        permission
                                                                                    }
                                                                                    menu={
                                                                                        grandChild
                                                                                    }
                                                                                    setCheckedMainMenus={
                                                                                        setSelectedMainMenus
                                                                                    }
                                                                                    isPermissionCheckboxesShow={
                                                                                        isPermissionCheckboxesShow
                                                                                    }
                                                                                />
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        ),
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ),
                                    )}
                                </section>
                            ) : null}
                        </AccordionContent>
                    </AccordionItem>
                </section>
            ))}
        </>
    )
}

const RenderPermissionChecks = ({
    menu,
    permission,
    setCheckedMainMenus,
    isPermissionCheckboxesShow,
}: {
    menu: any
    permission: { label: string; id: string }
    setCheckedMainMenus: React.Dispatch<React.SetStateAction<number[]>>
    isPermissionCheckboxesShow: (menu: Menu) => boolean
}) => {
    const { t } = useTranslation('rolePermission')
    const [countDirection] = useState<number>(1)
    const form = useFormContext()



    const hasEmployeePermission = 'is_employee_permission' in menu

    const handleEmployeePermissionCount = (controlName: string) => {
        const previousState = form.getValues(controlName) ?? 1

        if (countDirection === 1) {
            if (previousState < 4) {
                form.setValue(controlName, previousState + 1)
            }
            if (previousState === 4) {
                form.setValue(controlName, 1)
            }
        }
    }

    useEffect(() => {
        form.setValue(`ID-${String(menu?.menu_id)}` + '/is_read', true)
    }, [])

    menu['is_grant'] = true

    return (
        <div className="flex flex-row items-center space-x-2 py-2 last-of-type:me-5 w-fit">
            {menu[permission.id] ? (
                <div className="min-w-[100px] flex items-center">
                    {permission.id === 'is_read' ? (
                        <FormField
                            control={form.control}
                            name={
                                `ID-${String(menu?.menu_id)}` +
                                '/' +
                                permission.id
                            }
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <div className="flex items-center gap-3 ps-4">
                                            <FormControl>
                                                {isPermissionCheckboxesShow(
                                                    menu,
                                                ) ? (
                                                    <Checkbox
                                                        defaultChecked={true}
                                                    />
                                                ) : null}
                                            </FormControl>
                                            <FormLabel>
                                                <span
                                                    className={cn(
                                                        'mb-0 pb-0 font-medium',
                                                        {
                                                            'text-zinc-400':
                                                                !isPermissionCheckboxesShow(
                                                                    menu,
                                                                ),
                                                            'text-black':
                                                                isPermissionCheckboxesShow(
                                                                    menu,
                                                                ),
                                                        },
                                                    )}
                                                >
                                                    {permission.label}
                                                </span>
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )
                            }}
                        />
                    ) : (
                        <FormField
                            control={form.control}
                            name={
                                `ID-${String(menu?.menu_id)}` +
                                '/' +
                                permission.id
                            }
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <div className="flex items-center gap-3 ps-4">
                                            <FormControl>
                                                {isPermissionCheckboxesShow(
                                                    menu,
                                                ) ? (
                                                    <Checkbox
                                                        defaultChecked={false}
                                                        checked={field.value}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            field.onChange(
                                                                checked,
                                                            )
                                                            setCheckedMainMenus(
                                                                (prev) => [
                                                                    ...prev,
                                                                    menu?.menu_id,
                                                                ],
                                                            )
                                                        }}
                                                    />
                                                ) : null}
                                            </FormControl>
                                            <FormLabel>
                                                <span
                                                    className={cn(
                                                        'mb-0 pb-0 font-medium',
                                                        {
                                                            'text-zinc-400':
                                                                !isPermissionCheckboxesShow(
                                                                    menu,
                                                                ),
                                                            'text-black':
                                                                isPermissionCheckboxesShow(
                                                                    menu,
                                                                ),
                                                        },
                                                    )}
                                                >
                                                    {permission.label}
                                                </span>
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )
                            }}
                        />
                    )}

                    {/* လူပုံကိုနှိပ်တဲ့ အချိန် */}
                    {hasEmployeePermission &&
                    permission.id !== 'is_grant' &&
                    permission.id !== 'is_export' &&
                    permission.id !== 'is_import' ? (
                        <FormField
                            defaultValue={1}
                            control={form.control}
                            name={
                                `ID-${String(menu?.menu_id)}` +
                                '/' +
                                permission.id +
                                '_type'
                            }
                            render={({ field }) => {
                                const typeName =
                                    `ID-${String(menu?.menu_id)}` +
                                    '/' +
                                    permission.id +
                                    '_type'
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Button
                                                disabled={
                                                    !isPermissionCheckboxesShow(
                                                        menu,
                                                    )
                                                }
                                                type={'button'}
                                                variant="ghost"
                                                className="p-0 m-0 hover:cursor-pointer w-6 h-fit"
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    handleEmployeePermissionCount(
                                                        `ID-${String(menu?.menu_id)}` +
                                                            '/' +
                                                            permission.id +
                                                            '_type',
                                                    )
                                                }}
                                            >
                                                {form.watch(typeName) === 3 ? (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <ThreeUsers
                                                                    fill={
                                                                        COLORS.sideMenuActiveText
                                                                    }
                                                                />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>
                                                                    {t(
                                                                        'myself+other',
                                                                    )}
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                ) : null}
                                                {form.watch(typeName) === 2 ? (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <TwoUsers
                                                                    fill={
                                                                        COLORS.sideMenuActiveText
                                                                    }
                                                                />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                {t('other')}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                ) : null}
                                                {form.watch(typeName) ===
                                                    undefined ||
                                                form.watch(typeName) === 1 ? (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <User
                                                                    className="w-3 h-3"
                                                                    fill={
                                                                        COLORS.sideMenuActiveText
                                                                    }
                                                                />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                {t('myself')}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                ) : null}
                                                {form.watch(typeName) === 4 ? (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <FourUsers className="w-4 h-4 fill-sideMenuActiveText" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                {t('all')}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                ) : null}
                                            </Button>
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}

export default ModulePermissionForm
