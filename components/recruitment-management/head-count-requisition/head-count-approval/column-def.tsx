import {
    cn,
    HEADCOUNT_STATUS,
    JOB_LOCATION_TYPES,
    URGENCY_LEVEL,
    formatDate as formatDateUtil,
    capitalizeFirstLetter,
} from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import { parseAsInteger, useQueryState } from 'nuqs'
import { DEFAULT_PAGE } from '@/constants/pagination'
import SortButton from '@/components/data-table/sort-button'
import { StatusFilter } from '@/components/setting/status-filter'
import { useGetAllEmpStatus } from '@/service/query-hooks/setting/useEmploymentStatus'
import {
    ApprovalList,
    TblHeadCountRequest,
} from '../head-count-request/types/head-count-request-types'
import HeadCountStatusBadge, {
    head_count_request_approve_status,
} from '@/components/common/head-count-status-badge'
import HeadCountUrgencyBadge, {
    urgency_level_enum,
} from '@/components/common/head-count-urgency-badge'
import { format } from 'date-fns'
import CalendarRangeFilter from '@/components/setting/common/calendar-range-filter'
import { DateRange } from 'react-day-picker'
import HeadCountPersonalStatus from './head-count-personal-status'
import HeadCountCellAction from '../head-count-cell-action'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import HCDetailForm from './detail-form'
import HCApproveForm from './approve-form'
import HCCancelForm from './cancel-form'
import HeadCountPositionStatus from '../head-count-position-status'

export const columns: ColumnDef<TblHeadCountRequest>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <div className="flex items-center  justify-center">
                <SelectHeader table={table} />
            </div>
        ),
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'job_location',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [_, setPage] = useQueryState('page', parseAsInteger)

            const [name, setName] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const debouncedFun = useDebounceCallback(setName, 500)

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className=" text-start flex items-center justify-start gap-2">
                    <SortButton columnName="job_location" column={column} />
                    <div className="  w-full flex justify-start items-center p-1 rounded-lg">
                        <StatusFilter
                            align="left"
                            options={JOB_LOCATION_TYPES}
                            filterField="otherServices"
                            column={column}
                            title={t('job_location')}
                            // isSingle={true}
                        />
                    </div>
                </section>
            )
        },
        cell: ({ row }) => {
            const { t } = useTranslation('common')
            const job_location = row.getValue('job_location') as string
            console.log(job_location, 'job_location')
            const finalValue =
                job_location === 'onsite' ? 'OnSite' : job_location
            const capitalizedFirstLetter = capitalizeFirstLetter(
                finalValue,
            ) as string

            return (
                <div className="flex justify-start">
                    {t(capitalizedFirstLetter)}
                </div>
            )
        },
    },
    {
        accessorKey: 'position',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            const [name, setName] = useQueryState('hiring_source', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [empStatus, setEmpStatus] = useState([])
            const { isLoading: empLo, data: EmpData } = useGetAllEmpStatus()

            const [_, setPage] = useQueryState('page', parseAsInteger)

            const memorizedDta = useMemo(() => EmpData, [EmpData])

            const modifiedData = memorizedDta?.data?.map((empData: any) => {
                return {
                    value: empData.Employment_Status_ID,
                    label: empData.Employment_Status_Name,
                }
            })

            useEffect(() => {
                setName(empStatus.join(','))
            }, [empStatus])

            return (
                <section className=" text-start flex items-center justify-start gap-2">
                    <SortButton columnName="position" column={column} />
                    <div className="  w-full flex justify-start items-center p-1 rounded-lg">
                        <StatusFilter
                            align="left"
                            options={JOB_LOCATION_TYPES}
                            filterField="otherServices"
                            column={column}
                            title={t('position_id')}
                            // isSingle={true}
                        />
                    </div>
                </section>
            )
        },
        cell: ({ row }) => {
            const position = row.getValue('tbl_position')
            console.log(position, 'position columndef')
            return (
            <div className="flex justify-start">
                <HeadCountPositionStatus
                            userImg="https://images.unsplash.com/photo-1720887237257-3d1ad1a06c8a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            status={
                                'WaitingApproval'
                            }
                            approver={{
                                branch_name:'branch',
                                company_name:'company',
                                department_name:'department',
                                location_name:'location',
                                position_name:"position",
                                section_name:'section',
                            }}
                        />
            </div>)
        },
    },
    {
        accessorKey: 'no_of_position',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')

            return (
                <p className="font-bold text-zinc-500 text-center">
                    {t('no_of_position')}
                </p>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('no_of_position') as string
            return <p className="text-center">{status}</p>
        },
    },
    {
        accessorKey: 'urgency_level',
        header: ({ column }) => {
            const { t } = useTranslation('headCountApproval')

            return (
                <section
                    className={cn('flex justify-start  items-center gap-2')}
                >
                    <SortButton column={column} columnName="Urgency Level" />
                    <StatusFilter
                        align="center"
                        options={URGENCY_LEVEL}
                        column={column}
                        title={t('urgency_level')}
                    />
                </section>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('urgency_level') as urgency_level_enum
            return (
                <div className="flex justify-center">
                    <HeadCountUrgencyBadge value={status} rounded={true} />
                </div>
            )
        },
    },
    {
        accessorKey: 'target_onboarding_date',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            const [date, setDate] = useState<DateRange | undefined>({
                from: undefined,
                to: undefined,
            })
            const [con, setCon] = useQueryState('con')

            const [_, setCalendarYear] = useQueryState('calendar_year_from')
            const [__, setCalendarTo] = useQueryState('calendar_year_to')

            useEffect(() => {
                if (date?.from && date?.to) {
                    const fromDate = formatDateUtil(date?.from)
                    const toDate = formatDateUtil(date?.to)

                    setCalendarYear(fromDate!)
                    setCalendarTo(toDate!)
                } else if (date === undefined) {
                    setCalendarYear(null)
                    setCalendarTo(null)
                }
            }, [date])

            return (
                <section
                    className="flex w-full justify-center items-center"
                    // className={cn(
                    //     '',
                    // )}
                >
                    <CalendarRangeFilter
                        diasble={con ? true : false}
                        columnName="date"
                        setDate={setDate}
                        setFromYear={setCalendarYear}
                        setToYear={setCalendarTo}
                        column={column}
                        date={date}
                        filter={t('clearFilter')}
                        title={t('target_onboarding_date')}
                    />
                </section>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue('target_onboarding_date') as Date
            const formattedDate = format(date, 'dd/MM/yyyy')
            return <p className="text-center">{formattedDate}</p>
        },
    },
    {
        accessorKey: 'approvers',
        header: ({ column }) => {
            const { t } = useTranslation('headCountApproval')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [_, setPage] = useQueryState('page', parseAsInteger)

            const [name, setName] = useQueryState('approvers', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const debouncedFun = useDebounceCallback(setName, 500)

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <p className="font-bold text-zinc-500 text-center">
                    {t('approvers')}
                </p>
            )
        },
        cell: ({ row }) => {
            const approvers = row.getValue('approvers') as ApprovalList[]
            return (
                <div className="flex justify-center items-center gap-[4px] flex-wrap ">
                    {approvers.map((approver) => (
                        <HeadCountPersonalStatus
                            userImg="https://images.unsplash.com/photo-1720887237257-3d1ad1a06c8a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            status={
                                approver.status as
                                    | 'WaitingApproval'
                                    | 'Accepted'
                                    | 'Denied'
                                    | 'Cancelled'
                            }
                            approver={approver}
                        />
                    ))}
                </div>
            )
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            const { t } = useTranslation('headCountApproval')

            return (
                <section
                    className={cn('flex justify-start  items-center gap-2')}
                >
                    <SortButton column={column} columnName="status" />
                    <StatusFilter
                        align="center"
                        options={HEADCOUNT_STATUS}
                        column={column}
                        title={t('status')}
                        // isSingle={true}
                    />
                </section>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue(
                'status',
            ) as head_count_request_approve_status
            return (
                <div className="flex items-center justify-center">
                    <HeadCountStatusBadge value={status} rounded={true} />
                </div>
            )
        },
    },
    {
        accessorKey: 'action',
        header: () => {
            const { t } = useTranslation('contractDetailJobs')

            return (
                <div className="h-full w-[100px] px-2 flex items-center justify-center ">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const { t } = useTranslation('headCountApproval')
            const [item, setItem] = useState([])
            const { value, toggle, setTrue } = useBoolean(false)
            const {
                value: cancelValue,
                toggle: cancelToggle,
                setTrue: cancelSetTrue,
            } = useBoolean(false)
            const {
                value: approveValue,
                toggle: approveToggle,
                setTrue: approveSetTrue,
            } = useBoolean(false)
            const {
                value: DetailValue,
                setFalse: DetailFalse,
                setTrue: DetailTrue,
            } = useBoolean(false)

            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)

            const handleEdit = (row: any) => {
                const rowData = row.original
                console.log(rowData, 'rowData')
                setItem(rowData)
                approveToggle()
                DetailFalse()
            }

            const handleDetail = (row: any) => {
                const rowData = row.original
                setItem(rowData)
                toggle()
                DetailTrue()
            }

            const handleCancel = (row: any) => {
                const rowData = row.original
                console.log(rowData, 'rowData')
                setItem(rowData)
                cancelToggle()
                DetailFalse()
            }
            const selectedGrandSubMenu = { IsEdit: true, IsDelete: true }
            return (
                <div className={'flex items-center justify-center '}>
                    <HeadCountCellAction
                        language="headCountApproval"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setItem}
                        handleDelete={handleCancel}
                        handleEdit={handleEdit}
                        handleDetail={handleDetail}
                        row={row}
                    />
                    <EmployeeModal
                        title={`${t(DetailValue ? 'detail' : 'approve')}`}
                        modelRatio="min-h-[550px]"
                        editMode={value}
                        open={value}
                        toggle={toggle}
                        form={
                            <HCDetailForm
                                editMode={value}
                                detailValue={DetailValue}
                                editData={item}
                                toggle={toggle}
                            />
                        }
                    />
                    <EmployeeModal
                        title={`${t(DetailValue ? 'detail' : 'approve')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={approveValue}
                        open={approveValue}
                        toggle={approveToggle}
                        form={
                            <HCApproveForm
                                editMode={approveValue}
                                detailValue={DetailValue}
                                editData={item}
                                toggle={approveToggle}
                            />
                        }
                    />

                    <EmployeeModal
                        title={`${t(DetailValue ? 'detail' : 'approve')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={cancelValue}
                        open={cancelValue}
                        toggle={cancelToggle}
                        form={
                            <HCCancelForm
                                editMode={cancelValue}
                                detailValue={DetailValue}
                                editData={item}
                                toggle={cancelToggle}
                            />
                        }
                    />
                </div>
            )
        },
    },
]
