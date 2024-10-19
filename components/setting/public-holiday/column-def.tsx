'use client'

import { ColumnDef, RowData } from '@tanstack/react-table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CalendarIcon, CheckIcon, MoreHorizontal } from 'lucide-react'
import SortButton from '@/components/data-table/sort-button'
import { Button } from '@/components/ui/button'
import InactiveBadge from '@/components/common/inactive-badge'
import ActiveBadge from '@/components/common/active-badge'
import { STATUS_LABELS, cn, formatDate } from '@/lib/utils'
import useToast from '@/hooks/use-toast'
import { useBoolean } from 'usehooks-ts'

import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { deleteAudit } from '@/lib/audit-trail-api'
import useUserCookie from '@/hooks/use-user'
import useMenu from '@/state/zustand/menu'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { StatusFilter } from '../status-filter'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import ModalFrame from '@/components/common/modal/modal-frame'
import PublicHolidayForm from './public-holiday-form'
import { useDeletePublicHoliday } from '@/service/query-hooks/setting/use-publicHoliday'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/setting/public-holiday/modal/custome-calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { CaretSortIcon } from '@radix-ui/react-icons'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import AccordianDrop from '@/components/setting/public-holiday/modal/accordian-drop'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import CalendarRangeFilter from '../common/calendar-range-filter'
import { DateRange } from 'react-day-picker'

export type Currency = {
    name: string
    description: string
    active: boolean
    Branch_ID: []
    Company_ID: []
    Location_ID: []
    Position_ID: []
    Department_ID: []
    Holiday_Setting_ID: number
}

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (
            rowIndex: number,
            columnId: string,
            value: unknown,
            id: number,
        ) => void
        updateFun: () => void
        handleClick?: any
        handleRemoveClick: (id: number) => void
    }
}

type StateType = {
    Company_ID: number[]
    Location_ID: number[]
    Department_ID: number[]
    Position_ID: number[]
    Branch_ID: number[]
}

export const columns: ColumnDef<Currency>[] = [
    {
        id: 'select',
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'holiday_name',
        header: ({ column }) => {
            const { t } = useTranslation('publicHoliday')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [con, setCon] = useQueryState('con')

            const [contractType, setContractType] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setContractType, 500)
            const searchContractHandler = (
                e: ChangeEvent<HTMLInputElement>,
            ) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex min-w-[150px] justify-between items-center gap-2">
                    <SortButton
                        column={column}
                        disabled={con ? true : false}
                        columnName="name"
                    />
                    <DataTableColumnInput
                        readOnly={con ? true : false}
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('name') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchContractHandler}
                        defaultValue={contractType}
                        className={'w-full'}
                    />
                </section>
            )
        },
        cell: ({
            row: { index, original },
            getValue,
            column: { id },
            table,
        }) => {
            const [con] = useQueryState('con')
            const initialValue: any = getValue()
            const [value, setValue] = useState(initialValue)
            const { Holiday_Setting_ID } = original

            const onBlur = () => {
                table.options.meta?.updateData(
                    index,
                    id,
                    value,
                    Holiday_Setting_ID,
                )
            }

            useEffect(() => {
                setValue(initialValue)
            }, [initialValue])

            return (
                <>
                    {con === 'copied' ? (
                        <Input
                            className="border-gray-100 w-full "
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={onBlur}
                        />
                    ) : (
                        <p>{initialValue}</p>
                    )}
                </>
            )
        },
    },
    {
        accessorKey: 'holiday_date',
        header: ({ column }) => {
            const { t } = useTranslation('financialYear')
            const [date, setDate] = useState<DateRange | undefined>({
                from: undefined,
                to: undefined,
            })
            const [con, setCon] = useQueryState('con')

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
                <section className="flex min-w-[150px] justify-between items-center gap-2">
                    <CalendarRangeFilter
                        diasble={con ? true : false}
                        columnName="date"
                        setDate={setDate}
                        setFromYear={setCalendarYear}
                        setToYear={setCalendarTo}
                        column={column}
                        date={date}
                        filter={t('clearFilter')}
                        title={t('calendarYearRange')}
                    />
                </section>
            )
        },
        cell: ({
            row: { index, original },
            getValue,
            column: { id },
            table,
        }) => {
            const [con] = useQueryState('con')
            const { Holiday_Setting_ID } = original

            const initialValue: any = getValue()
            const [value, setValue] = useState(initialValue)

            useEffect(() => {
                table.options.meta?.updateData(
                    index,
                    id,
                    value,
                    Holiday_Setting_ID,
                )
            }, [value])

            useEffect(() => {
                setValue(initialValue)
            }, [initialValue])

            return (
                <>
                    {con === 'copied' ? (
                        <>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'w-full pl-3 text-left font-normal',
                                            !value && 'text-muted-foreground',
                                        )}
                                    >
                                        {value ? (
                                            format(value, 'PPP')
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        defaultMonth={value && new Date(value)}
                                        captionLayout="dropdown-buttons"
                                        selected={new Date(value)}
                                        onSelect={(e) => setValue(e)}
                                        fromYear={1960}
                                        toYear={2030}
                                    />
                                </PopoverContent>
                            </Popover>
                        </>
                    ) : (
                        <p> {value ? format(value, 'PPP') : ''}</p>
                    )}
                </>
            )
        },
    },
    {
        accessorKey: 'for_all',
        enableHiding: true,
        header: ({ column }) => {
            const { t } = useTranslation('publicHoliday')
            const [selectedAll, setSelectedAll] = useState()
            const [con, setCon] = useQueryState('con')
            const [value, setValue] = useState<StateType>({
                Company_ID: [],
                Location_ID: [],
                Department_ID: [],
                Position_ID: [],
                Branch_ID: [],
            })
            const [totalLength, setTotalLength] = useState(0)

            useEffect(() => {
                let totalLength = 0
                Object.values(value).forEach((array) => {
                    totalLength += array.length
                })

                setTotalLength(totalLength)
            }, [value])

            useEffect(() => {
                if (selectedAll === 'All selected') {
                    setValue({
                        Company_ID: [],
                        Location_ID: [],
                        Department_ID: [],
                        Position_ID: [],
                        Branch_ID: [],
                    })
                }
            }, [selectedAll])

            return (
                <section className="flex min-w-[150px] justify-start items-center gap-2">
                    <div className="w-4 h-4"></div>
                    <p className="font-bold">{t('applyfor')}</p>
                </section>
            )

            // return (
            //     <section
            //         className={cn(
            //             'flex justify-start  border rounded-lg items-start gap-2',
            //         )}
            //     >
            //         <Popover modal={true}>
            //             <PopoverTrigger asChild>
            //                 <div className=" space-y-2">
            //                     <Button
            //                         variant="ghost"
            //                         role="combobox"
            //                         className={cn(
            //                             `w-full min-w-[200px] hover:none  p-2 font-bold  justify-between  focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
            //                         )}
            //                     >
            //                        {
            //                         selectedAll ? selectedAll:  totalLength ? totalLength + " selected" : "Pick something"
            //                        }
            //                     </Button>
            //                 </div>
            //             </PopoverTrigger>
            //             <PopoverContent className={cn(` p-0`)}>
            //                 <AccordianDrop
            //                     setAll={setSelectedAll}
            //                     allValue = {selectedAll}
            //                     handleUpdate={updateStateArray}
            //                     value={value}
            //                 />
            //                 <Button
            //                     onClick={() => {
            //                       setValue({
            //                         Company_ID: [],
            //                         Location_ID: [],
            //                         Department_ID: [],
            //                         Position_ID: [],
            //                         Branch_ID: [],
            //                     })
            //                     }}
            //                     className="w-full py-2"
            //                     variant={'ghost'}
            //                 >
            //                     Clear Filters
            //                 </Button>
            //             </PopoverContent>
            //         </Popover>
            //         {/* <StatusFilter
            //             align="center"
            //             options={STATUS_LABELS}
            //             column={column}
            //             title={t('Apply For')}
            //             // isSingle={true}
            //         />
            //         <SortButton column={column} /> */}
            //     </section>
            // )
        },
        cell: ({
            row: { index, original },
            getValue,
            column: { id: columnId },
            table,
        }) => {
            const [con] = useQueryState('con')
            const [totalLength, setTotalLength] = useState(0)
            const [selectedAll, setSelectedAll] = useState()
            const { Holiday_Setting_ID } = original

            const [value, setValue] = useState<StateType>({
                Company_ID: original?.Company_ID ? original?.Company_ID : [],
                Location_ID: original?.Location_ID ? original?.Location_ID : [],
                Department_ID: original?.Department_ID
                    ? original?.Department_ID
                    : [],
                Position_ID: original?.Position_ID ? original?.Position_ID : [],
                Branch_ID: original?.Branch_ID ? original?.Branch_ID : [],
            })

            const updateStateArray = (idKey: keyof StateType, id: number) => {
                setSelectedAll(undefined)
                if (!value.hasOwnProperty(idKey)) {
                    console.error(`Invalid idKey: ${idKey}`)
                    return
                }

                setValue((prevState) => {
                    const currentIds = prevState[idKey]
                    const updatedIds = currentIds.includes(id)
                        ? currentIds.filter((item) => item !== id)
                        : [...currentIds, id]
                    return { ...prevState, [idKey]: updatedIds }
                })
                table.options.meta?.updateData(
                    index,
                    'for_all',
                    false,
                    Holiday_Setting_ID,
                )

                // table.options.meta?.updateData(index, idKey, value[idKey])
            }

            // table.options.meta?.updateData(index, id, value);

            useEffect(() => {
                // table.options.meta?.updateData(index, idKey, value[idKey])

                let totalLength = 0
                Object.values(value).forEach((array) => {
                    totalLength += array.length
                })

                setTotalLength(totalLength)

                for (const key in value) {
                    if (Object.prototype.hasOwnProperty.call(value, key)) {
                        // @ts-ignore
                        const values: number[] = value[key]

                        table.options.meta?.updateData(
                            index,
                            key,
                            values,
                            Holiday_Setting_ID,
                        )
                    }
                }
            }, [value])

            useEffect(() => {
                if (selectedAll === 'All selected') {
                    setValue({
                        Company_ID: [],
                        Location_ID: [],
                        Department_ID: [],
                        Position_ID: [],
                        Branch_ID: [],
                    })
                    table.options.meta?.updateData(
                        index,
                        'for_all',
                        true,
                        Holiday_Setting_ID,
                    )
                }
            }, [selectedAll])

            const status = getValue() as string

            if (con === 'copied')
                return (
                    <Popover modal={true}>
                        <PopoverTrigger asChild>
                            <div className=" space-y-2">
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        `w-full  p-2  justify-between  focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
                                    )}
                                >
                                    {totalLength ? totalLength : 'ALL'} Selected
                                    <CaretSortIcon className="ml-2  h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent
                            className={cn(
                                ` w-[200px] p-0 h-[170px] overflow-scroll`,
                            )}
                        >
                            <AccordianDrop
                                handleUpdate={updateStateArray}
                                value={value}
                                setAll={setSelectedAll}
                                allValue={selectedAll}
                            />
                        </PopoverContent>
                    </Popover>
                )
            return <>{status ? 'For All' : 'Some'}</>
        },
    },
    {
        accessorKey: 'is_active',
        enableHiding: true,
        header: ({ column }) => {
            const { t } = useTranslation('publicHoliday')
            const [con] = useQueryState('con')

            return (
                <section
                    className={cn('flex justify-center items-center gap-2')}
                >
                    <SortButton
                        disabled={con ? true : false}
                        column={column}
                        columnName="status"
                    />
                    <StatusFilter
                        disabled={con ? true : false}
                        align="center"
                        options={STATUS_LABELS}
                        column={column}
                        title={t('status')}
                        // isSingle={true}
                    />
                </section>
            )
        },
        cell: ({
            row: { index, original },
            getValue,
            column: { id },
            table,
        }) => {
            const status = getValue()
            const [con] = useQueryState('con')
            const [popoverOpen, setPopoverOpen] = useState(false)
            const [value, setValue] = useState(status)
            const { Holiday_Setting_ID } = original

            const autoCompleteOptions = [
                {
                    label: 'Active',
                    value: true,
                },
                { label: 'Inactive', value: false },
            ]

            if (con === 'copied')
                return (
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    ` w-auto  shrink-0  justify-between focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
                                    !status && 'text-muted-foreground',
                                    value ? 'bg-green-100' : 'bg-red-100',
                                )}
                            >
                                {value ? 'Active' : 'Inactive'}
                                <CaretSortIcon className="ml-2  h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className={cn(` w-[110px]   p-0`)}>
                            <Command>
                                <CommandList>
                                    <CommandEmpty>No item found.</CommandEmpty>
                                    <CommandGroup>
                                        {autoCompleteOptions.map((item) => (
                                            <CommandItem
                                                value={item.label}
                                                key={item.label}
                                                onSelect={() => {
                                                    setValue(item.value)
                                                    table.options.meta?.updateData(
                                                        index,
                                                        id,
                                                        item.value,
                                                        Holiday_Setting_ID,
                                                    )
                                                    setPopoverOpen(false)
                                                }}
                                            >
                                                {item.label}
                                                <CheckIcon
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        item.value === value
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                )

            return <>{status ? <ActiveBadge /> : <InactiveBadge />}</>
        },
    },
    {
        accessorKey: 'action',
        enableHiding: true,
        header: () => {
            const { t } = useTranslation('publicHoliday')

            return (
                <div className="h-full bg-zinc-50  w-full px-[10px] flex items-center justify-center">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({
            row: { index, original },
            getValue,
            column: { id: columnId },
            table,
        }) => {
            const { deleteById, isPending } = useDeletePublicHoliday()
            const [deleteData, setDeleteData] = useState<any>()
            const { showNotification } = useToast()
            const { value, toggle, setTrue } = useBoolean(false)
            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)
            const [singleData, setSingleData] = useState({})
            const { selectedMenuId, selectedGrandSubMenu } = useMenu()
            const { t } = useTranslation('publicHoliday')
            const [con, setCon] = useQueryState('con')
            const user = useUserCookie()

            const auditPayload = {
                Is_Mobile: false,
                Emp_Name: user?.employee_name!,
                Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
                Parent_Menu_ID: selectedMenuId!,
                Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
                Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
            }

            const handleDelete = () => {
                const rowData = deleteData.Holiday_Setting_ID // This gives you the user data of the selected row

                if (con) {
                    table.options.meta?.handleRemoveClick(rowData)
                } else {
                    deleteById(rowData, {
                        onSuccess: (res) => {
                            showNotification({
                                message: res.message,
                                type: 'success',
                            })

                            dToggle()

                            setCon(null)

                            //delete audit
                            deleteAudit({
                                ...auditPayload,
                                ValueBefore: deleteData!,
                                Record_Name: deleteData.holiday_name,
                            })
                        },
                        onError: (error) => {
                            showNotification({
                                message: error.message,
                                type: 'danger',
                            })
                        },
                    })
                }
            }

            const handleEdit = (row: any) => {
                const rowData = row
                setSingleData(rowData)
                setTrue()
            }
            const selectedGrandSubMenuu = { IsEdit: true, IsDelete: true }

            const hideActionBtn =
                !selectedGrandSubMenu?.is_edit && !selectedGrandSubMenu?.is_delete

            return (
                <div
                    className={`flex justify-center w-full ${hideActionBtn && 'cursor-not-allowed'} `}
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                            className={`${hideActionBtn && ' border-2  opacity-50 '} hover:`}
                        >
                            <Button
                                variant="primary"
                                className="h-8  bg-primary-600 hover:bg-primary-500 w-[1.75rem] rounded-[7px] p-0"
                                disabled={hideActionBtn}
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4 rotate-90" />
                            </Button>
                        </DropdownMenuTrigger>
                        {hideActionBtn ? (
                            ''
                        ) : (
                            // con !== 'copied'
                            <DropdownMenuContent align="end">
                                {selectedGrandSubMenu?.is_edit ? (
                                    con !== 'copied' ? (
                                        <DropdownMenuItem
                                            onClick={() => handleEdit(original)}
                                        >
                                            {t('edit')}
                                        </DropdownMenuItem>
                                    ) : (
                                        <></>
                                    )
                                ) : (
                                    <></>
                                )}
                                {/* {(con !== 'copied' ||
                                    selectedGrandSubMenuu?.IsEdit) && (
                                    <DropdownMenuItem
                                        onClick={() => handleEdit(original)}
                                    >
                                        {t('edit')}
                                    </DropdownMenuItem>
                                )} */}

                                {selectedGrandSubMenu?.is_delete && (
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setDeleteData(original)
                                            setDeleteData(original)
                                            dSetTrue()
                                        }}
                                    >
                                        {t('delete')}
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        )}
                    </DropdownMenu>

                    {/* <FinancialModal title={`${t("modalTitle")}`} editData={singleFinancialYear} editMode open={value} toggle={toggle}/> */}
                    <ModalFrame
                        title={`${t('editRecord')}`}
                        toggle={toggle}
                        open={value}
                    >
                        <PublicHolidayForm
                            editData={singleData}
                            editMode={true}
                            toggle={toggle}
                        />
                    </ModalFrame>

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
