import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import SelectCell from '@/components/data-table/select-cell'
import SelectHeader from '@/components/data-table/select-header'
import SortButton from '@/components/data-table/sort-button'
import EmployeeCellAction from '@/components/employee/forms/employee-cellaction'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import MultiFilter from '@/components/setting/common/multi-filter'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { cn, JOB_LOCATION_TYPES } from '@/lib/utils'
import { useGetAllEmpStatus } from '@/service/query-hooks/setting/useEmploymentStatus'
import { ColumnDef } from '@tanstack/react-table'
import { parseAsInteger, useQueryState } from 'nuqs'
import { ChangeEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import { useRouter } from 'next/navigation'

export type JobOpeningType = {
    id: number
    codeNo: string
    jobTitle: string
    noOfPosition: number
    positionFill: number
    targetHiring: string
    status: string
}

const headerTypo = 'text-[14px] w-[220px]  font-bold text-[#687588]'

export const columns: ColumnDef<JobOpeningType>[] = [
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
        accessorKey: 'codeNo',
        header: ({ column }) => {
            const { t } = useTranslation('jobOpening')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [_, setPage] = useQueryState('page', parseAsInteger)

            const [name, setName] = useQueryState('codeNo', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const debouncedFun = useDebounceCallback(setName, 500)

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section
                    className={cn(
                        ' text-start flex items-center justify-start gap-2',
                        headerTypo,
                    )}
                >
                    <SortButton columnName="codeNo" column={column} />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('codeNo') : ''}
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
        accessorKey: 'jobTitle',
        header: ({ column }) => {
            const { t } = useTranslation('jobOpening')
            const { value, setFalse, setTrue } = useBoolean(true)

            const [hiringRole, setHiringRole] = useQueryState('hiringRole', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const [_, setPage] = useQueryState('page', parseAsInteger)

            const debouncedFun = useDebounceCallback(setHiringRole, 500)

            const [empStatus, setEmpStatus] = useState([])
            // const { isLoading: empLo, data: EmpData } = useGetAllEmpStatus()

            // const memorizedDta = useMemo(() => EmpData, [EmpData])

            // const modifiedData = memorizedDta?.data?.map((empData: any) => {
            //     return {
            //         value: empData.Employment_Status_ID,
            //         label: empData.Employment_Status_Name,
            //     }
            // })

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex justify-start  items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="status" />
                    <MultiFilter
                        title={t('jobTitle')}
                        translation="jobOpening"
                        width="w-full "
                        value={empStatus}
                        loading={false}
                        setValue={setEmpStatus}
                        column={column}
                        options={JOB_LOCATION_TYPES}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'noOfPosition',
        header: () => {
            const { t } = useTranslation('jobOpening')

            return (
                <div className="h-full w-[150px] px-2 flex items-center justify-center ">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('noOfPosition')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('noOfPosition') as string

            return (
                <div className="text-center ">
                    <p className=" pr-[50px]">{status}</p>
                </div>
            )
        },
    },
    {
        accessorKey: 'positionFill',
        header: () => {
            const { t } = useTranslation('jobOpening')

            return (
                <div className="h-full w-[150px] px-2 flex items-center justify-center ">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('positionFill')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('positionFill') as string

            return (
                <div className="text-center ">
                    <p className=" pr-[50px]">{status}</p>
                </div>
            )
        },
    },
    {
        accessorKey: 'targetHiring',
        header: ({ column }) => {
            const { t } = useTranslation('jobOpening')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [_, setPage] = useQueryState('page', parseAsInteger)

            const [name, setName] = useQueryState('codeNo', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const debouncedFun = useDebounceCallback(setName, 500)

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section
                    className={cn(
                        ' text-start flex items-center justify-start gap-2',
                        headerTypo,
                    )}
                >
                    <SortButton columnName="targetHiringDate" column={column} />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('targetHiringDate') : ''}
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
        accessorKey: 'status',
        header: ({ column }) => {
            const { t } = useTranslation('jobOpening')
            const { value, setFalse, setTrue } = useBoolean(true)

            const [hiringRole, setHiringRole] = useQueryState('hiringRole', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const [_, setPage] = useQueryState('page', parseAsInteger)

            const debouncedFun = useDebounceCallback(setHiringRole, 500)

            const [empStatus, setEmpStatus] = useState([])
            // const { isLoading: empLo, data: EmpData } = useGetAllEmpStatus()

            // const memorizedDta = useMemo(() => EmpData, [EmpData])

            // const modifiedData = memorizedDta?.data?.map((empData: any) => {
            //     return {
            //         value: empData.Employment_Status_ID,
            //         label: empData.Employment_Status_Name,
            //     }
            // })

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex justify-start  items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="status" />
                    <MultiFilter
                        title={t('status')}
                        translation="jobOpening"
                        width="w-full "
                        value={empStatus}
                        loading={false}
                        setValue={setEmpStatus}
                        column={column}
                        options={JOB_LOCATION_TYPES}
                    />
                </section>
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
            const { t } = useTranslation('jobOpening')
            const [item, setItem] = useState([])
            const { value, toggle, setTrue } = useBoolean(false)
            const {
                value: DetailValue,
                setFalse: DetailFalse,
                setTrue: DetailTrue,
            } = useBoolean(false)
            const router = useRouter()

            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)

            const handleEdit = (row: any) => {
                // const rowData = row.original
                // setItem(rowData)
                // toggle()
                // DetailFalse()
                router.push('/recruitment/job-opening/add-job-opening')

            }

            const handleDetail = (row: any) => {
                router.push('/recruitment/job-opening/add-job-opening?detail=true')
                // toggle()
                DetailTrue()
            }

            const handleDelete = () => {}
            const selectedGrandSubMenu = {
                IsEdit: true,
                IsDelete: true,
                IsCopy: true,
            }
            return (
                <div className={'flex items-center justify-center '}>
                    <EmployeeCellAction
                        language="financialYear"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setItem}
                        handleDelete={() => dToggle()}
                        handleEdit={handleEdit}
                        handleDetail={handleDetail}
                        row={row}
                    />
                    <DeleteConfirm
                        message={t('deleteText')}
                        title={t('deleteTitle')}
                        isLoading={false}
                        toggle={dToggle}
                        open={dValue}
                        fun={handleDelete}
                    />
                    <EmployeeModal
                        title={`${t(DetailValue ? 'detail' : 'edit')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={value}
                        open={value}
                        toggle={toggle}
                        form={<></>}
                    />
                </div>
            )
        },
    },
]
