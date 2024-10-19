import React, { useEffect, useMemo } from 'react'
import { Checkbox } from '../ui/checkbox'
import Module from './module'
import { DateRangePicker } from '@/components/ui/custom/date-range-picker'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { useGetUsers } from '@/service/query-hooks/user-and-access/user/use-user'
import {
    useGetChildMenu,
    useGetGrandChildMenu,
    useGetParentMenu,
} from '@/service/query-hooks/use-menu'
import { AuditTrailEventTypes, cn, getNestedLevel } from '@/lib/utils'
import voca from 'voca'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import * as _ from 'lodash'
import { useFilterQuery } from '@/hooks/audit-trail/use-filter-query'
import menuStore from '@/state/zustand/menu'

interface DateRangeProp {
    range: DateRange
    rangeCompare?: DateRange | undefined
}

const fakeSelectOption = { value: 'NA', label: 'Unselect' }

const userTransformer = (user: any) => {
    if (user?.Employee_Name) {
        return {
            value: user.Employee_Name,
            label: user.Employee_Name,
        }
    }
}

const menuTransformer = (menu: any) => {
    return {
        value: menu.tbl_Menu.Menu_ID,
        label: menu.tbl_Menu.Menu_Name,
    }
}

function VerticalSidebar() {
    const {
        setEventTypes,
        setEndDate,
        setStartDate,
        setEmployeeName,
        setGrandChildMenuId,
        setChildMenuId,
        setParentMenuId,
        endDate,
        startDate,
        grandChildMenuId,
        parentMenuId,
        childMenuId,
        employeeName,
        eventTypes,
    } = useFilterQuery()
    const form = useForm()

    const { data: userList } = useGetUsers({ transformer: userTransformer })
    const { data: parentMenuList } = useGetParentMenu({
        transformer: menuTransformer,
    })
    const { data: childMenuList } = useGetChildMenu({
        transformer: menuTransformer,
    })
    const { data: grandChildMenuList } = useGetGrandChildMenu({
        transformer: menuTransformer,
    })

    const userListWithSelect = userList ? [fakeSelectOption, ...userList] : []
    const parentMenuListWithSelect = parentMenuList
        ? [fakeSelectOption, ...parentMenuList]
        : []
    const childMenuListWithSelect = childMenuList
        ? [fakeSelectOption, ...childMenuList]
        : []
    const grandChildMenuListWithSelect = grandChildMenuList
        ? [fakeSelectOption, ...grandChildMenuList]
        : []

    const handleOnDateRangeChange = (values: DateRangeProp) => {
        const strStartDate = String(values.range.from)
        const strEndDate = String(values.range.to)

        const formattedStartDate = format(strStartDate, 'yyyy-MM-dd')
        const formattedEndDate = format(strEndDate, 'yyyy-MM-dd')

        setStartDate(formattedStartDate)
        setEndDate(formattedEndDate)
    }

    const handleOnSelect = (user: any) => {
        if (user.value === 'NA') {
            setEmployeeName('')
            return
        }
        setEmployeeName(user.value)
    }

    const handleOnMainModuleSelect = (module: any) => {
        if (module.value === 'NA') {
            setParentMenuId('')
            setChildMenuId('')
            return
        }

        setParentMenuId(module.value)
        setChildMenuId('')
        setGrandChildMenuId('')
    }

    const handleOnChildModuleSelect = (module: any) => {
        if (module.value === 'NA') {
            setChildMenuId('')
            return
        }

        setChildMenuId(module.value)
        setGrandChildMenuId('')
    }

    const handleOnGrandChildModuleSelect = (module: any) => {
        if (module.value === 'NA') {
            setGrandChildMenuId('')
            return
        }

        setGrandChildMenuId(module.value)
    }

    const watchEventType = form.watch('event_type')

    useEffect(() => {
        if (watchEventType) {
            const joinedString = _.join(watchEventType, ',')
            setEventTypes(joinedString)
        } else {
            setEventTypes('')
        }
    }, [watchEventType])

    const menuList = menuStore(state=>state.menuList)

    const nestedMenuLevel = useMemo<any>(
        () => {
            const selectedMenu = parentMenuId && menuList?.data?.find(menu=> +menu.menu_id === +parentMenuId)
            return parentMenuId && selectedMenu && getNestedLevel(selectedMenu)
        },
        [parentMenuId],
    )

    return (
        <div className="overflow-y-auto h-full relative max-sm:text-sm bg-gray-50/20">
            <div className="max-sm:px-3 bg-gray-50/20 p-5">
                <h2 className="mb-2">Date</h2>
                <DateRangePicker
                    onUpdate={handleOnDateRangeChange}
                    initialDateFrom={startDate ?? undefined}
                    initialDateTo={endDate ?? undefined}
                    align="start"
                    locale="en-GB"
                    showCompare={false}
                    className={'w-full'}
                />
            </div>
            <Module
                title="User"
                placeHolder="Search User"
                data={userListWithSelect}
                selectedData={employeeName}
                setSelectedData={handleOnSelect}
            />
            <Module
                title="Main Module"
                placeHolder="Search Main Module"
                data={parentMenuListWithSelect}
                selectedData={+parentMenuId!}
                setSelectedData={handleOnMainModuleSelect}
            />
            <Module
                title="Sub Module"
                placeHolder="Search Sub Module"
                data={childMenuListWithSelect}
                selectedData={+childMenuId!}
                setSelectedData={handleOnChildModuleSelect}
            />
           <Module
                isGrandChild
                nestedMenuLevel={nestedMenuLevel}
                title="Grand Sub Module"
                placeHolder="Search Grand Sub Module"
                data={grandChildMenuListWithSelect}
                selectedData={+grandChildMenuId!}
                setSelectedData={handleOnGrandChildModuleSelect}
            />

            <div className="py-5 p-5">
                <h2 className=" mb-2">Events</h2>

                <Form {...form}>
                    <form className="">
                        <FormField
                            control={form.control}
                            name="event_type"
                            render={() => (
                                <FormItem
                                    className={
                                        'grid gap-2 grid-cols-2 space-y-0'
                                    }
                                >
                                    {Object.keys(AuditTrailEventTypes).map(
                                        (item) => (
                                            <FormField
                                                key={item}
                                                control={form.control}
                                                name="event_type"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={item}
                                                            className="flex flex-row items-center space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    className={
                                                                        'border-gray-600 w-4 h-4'
                                                                    }
                                                                    checked={field?.value?.includes(
                                                                        item,
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) => {
                                                                        return checked
                                                                            ? field.onChange(
                                                                                  [
                                                                                      ...(field.value
                                                                                          ? field.value
                                                                                          : []),
                                                                                      item,
                                                                                  ],
                                                                              )
                                                                            : field.onChange(
                                                                                  field.value?.filter(
                                                                                      (
                                                                                          value: any,
                                                                                      ) =>
                                                                                          value !==
                                                                                          item,
                                                                                  ),
                                                                              )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm">
                                                                {voca.capitalize(
                                                                    item,
                                                                    true,
                                                                )}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ),
                                    )}
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default VerticalSidebar
