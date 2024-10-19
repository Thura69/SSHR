'use client'

import { ColumnDef } from '@tanstack/react-table'
import SortButton from '@/components/data-table/sort-button'
import InactiveBadge from '@/components/common/inactive-badge'
import ActiveBadge from '@/components/common/active-badge'
import { STATUS_LABELS, cn, formatDate } from '@/lib/utils'
import { useDeleteFinancialYear } from '@/service/query-hooks/setting/use-financial-year'
import useToast from '@/hooks/use-toast'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import FinancialModal from './financial-modal'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { deleteAudit } from '@/lib/audit-trail-api'
import useUserCookie from '@/hooks/use-user'
import useMenu from '@/state/zustand/menu'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import { StatusFilter } from '../status-filter'
import CellAction from '@/components/common/table/cell-action'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import { parseAsInteger, useQueryState } from 'nuqs'
import { DEFAULT_PAGE } from '@/constants/pagination'
import MultiFilter from '../common/multi-filter'
import React from 'react'
import { DateRange } from 'react-day-picker'
import CalendarRangeFilter from '../common/calendar-range-filter'

export type User = {
    name: string
    status: string
}

export const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'financial',
        header: ({ column }) => {
            const { t } = useTranslation('financialYear')
            const { value, setFalse, setTrue } = useBoolean(true)

            const [name, setName] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebounceCallback(setName, 500)

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex min-w-[150px] justify-between items-center gap-2">
                    <SortButton columnName="name" column={column} />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('financialYear') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchNameHandler}
                        defaultValue={name}
                        className={'w-full'}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'calendar',
        header: ({ column }) => {
            const { t } = useTranslation('financialYear')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [date, setDate] = React.useState<DateRange | undefined>({
                from: undefined,
                to: undefined,
            })

            const [_, setCalendarYear] = useQueryState('calendar_year_from')
            const [__, setCalendarTo] = useQueryState('calendar_year_to')

            useEffect(() => {
                if (date?.from && date?.to) {
                    const fromDate = formatDate(date?.from)
                    const toDate = formatDate(date?.to)

                    setCalendarYear(fromDate!)
                    setCalendarTo(toDate!)
                } else if (date === undefined) {
                    setCalendarYear(null)
                    setCalendarTo(null)
                }
            }, [date])

            return (
                <CalendarRangeFilter
                    columnName="calendar_year"
                    setDate={setDate}
                    setFromYear={setCalendarYear}
                    setToYear={setCalendarTo}
                    column={column}
                    date={date}
                    filter={t('clearFilter')}
                    title={t('calendarYearRange')}
                />
            )
        },
    },
    {
        accessorKey: 'financialyear',
        header: ({ column }) => {
            const { t } = useTranslation('financialYear')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [date, setDate] = React.useState<DateRange | undefined>({
                from: undefined,
                to: undefined,
            })

            const [_, setCalendarYear] = useQueryState('financial_year_from')
            const [__, setCalendarTo] = useQueryState('financial_year_to')

            useEffect(() => {
                if (date?.from && date?.to) {
                    const fromDate = formatDate(date?.from)
                    const toDate = formatDate(date?.to)

                    setCalendarYear(fromDate)
                    setCalendarTo(toDate)
                } else if (date === undefined) {
                    setCalendarYear(null)
                    setCalendarTo(null)
                }
            }, [date])

            return (
                <CalendarRangeFilter
                    columnName="financial_year"
                    setDate={setDate}
                    setFromYear={setCalendarYear}
                    setToYear={setCalendarTo}
                    filter={t('clearFilter')}
                    column={column}
                    date={date}
                    title={t('financialYearRange')}
                />
            )
        },
    },
    {
        accessorKey: 'country',
        header: ({ column }) => {
            const autoCompleteOptions = [
                { label: 'Myanmar', value: 'Myanmar' },
                { label: 'USA', value: 'USA' },
                { label: 'Japan', value: 'Japan' },
            ]
            const { t } = useTranslation('financialYear')
            const [countryValue, setCountryValue] = useState([])
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const [__, setCountry] = useQueryState('country', {
                defaultValue: '',
                clearOnDefault: true,
            })

            useEffect(() => {
                setCountry(countryValue.join(','))
            }, [countryValue])

            return (
                <div className="flex justify-center items-center gap-2">
                    <SortButton column={column} columnName="country" />
                    <MultiFilter
                        width="min-w-[200px]"
                        title={t('country')}
                        translation="financialYear"
                        value={countryValue}
                        setValue={setCountryValue}
                        column={column}
                        options={autoCompleteOptions}
                    />
                </div>
            )
        },
    },
    {
        accessorKey: 'isActive',
        enableHiding: true,
        header: ({ column }) => {
            const { t } = useTranslation('contractType')
            const { selectedGrandSubMenu } = useMenu()

            return (
                <section
                    className={cn('flex justify-start  items-center gap-2')}
                >
                    <SortButton column={column} columnName="status" />
                    <StatusFilter
                        align="center"
                        options={STATUS_LABELS}
                        column={column}
                        title={t('status')}
                        // isSingle={true}
                    />
                </section>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('isActive') as string
            return <>{status ? <ActiveBadge /> : <InactiveBadge />}</>
        },
    },
    {
        accessorKey: 'action',
        header: () => {
            const { t } = useTranslation('financialYear')

            return (
                <div className="h-full bg-zinc-50 w-[100px] px-2 flex items-center justify-center ">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const { deleteById, isPending } = useDeleteFinancialYear()
            const { showNotification } = useToast()
            const { value, toggle, setTrue } = useBoolean(false)
            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)

            const [singleFinancialYear, setSingleFinancialYear] = useState<any>(
                {
                    calendar: '',
                    calendarYearFrom: '',
                    calendarYearTo: '',
                    country: '',
                    financial: '',
                    financialYearName: '',
                    financialyear: '',
                    id: 0,
                    isActive: false,
                    payrollFromDate: '',
                    payrollToDate: '',
                },
            )

            const { selectedMenuId, selectedSubMenuId, selectedGrandSubMenu } =
                useMenu()
            const { t } = useTranslation('financialYear')
            const user = useUserCookie()

            // const auditPayload = {
            //     Is_Mobile: false,
            //     Emp_Name: user?.employee_name!,
            //     Page_Name: selectedGrandSubMenu?.menu_name + '  Page',
            //     Parent_Menu_ID: selectedMenuId!,
            //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
            //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
            // }

            const handleDelete = (row: any) => {
                const rowData = singleFinancialYear.original.id // This gives you the user data of the selected row
                deleteById(rowData, {
                    onSuccess: (res) => {
                        showNotification({
                            message: res.message,
                            type: 'success',
                        })

                        //dtoggle
                        dToggle()

                        //delete audit
                        // deleteAudit({
                        //     ...auditPayload,
                        //     ValueBefore: singleFinancialYear.original!,
                        //     Record_Name:
                        //         singleFinancialYear.original.financialYearName,
                        // })
                    },
                    onError: (error) => {
                        showNotification({
                            message: error.message,
                            type: 'danger',
                        })
                    },
                })
            }

            const handleEdit = (row: any) => {
                const rowData = row.original
                setSingleFinancialYear(rowData)
                setTrue()
            }

            return (
                <div className={'flex items-center justify-center '}>
                    <CellAction
                        language="financialYear"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setSingleFinancialYear}
                        handleDelete={() => dToggle()}
                        handleEdit={handleEdit}
                        row={row}
                    />
                    <FinancialModal
                        title={`${t('updateModalTitle')}`}
                        editData={singleFinancialYear}
                        editMode
                        open={value}
                        toggle={toggle}
                    />
                    <DeleteConfirm
                        message={t('deleteText')}
                        title={t('deleteTitle')}
                        isLoading={isPending}
                        toggle={dToggle}
                        open={dValue}
                        fun={handleDelete}
                    />
                </div>
            )
        },
    },
]
