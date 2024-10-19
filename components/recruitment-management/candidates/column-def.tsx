import { ColumnDef } from '@tanstack/react-table'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import { useTranslation } from 'react-i18next'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import { parseAsInteger, useQueryState } from 'nuqs'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { DEFAULT_PAGE } from '@/constants/pagination'
import SortButton from '@/components/data-table/sort-button'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import { useGetAllEmpStatus } from '@/service/query-hooks/setting/useEmploymentStatus'
import MultiFilter from '@/components/setting/common/multi-filter'
import { StatusFilter } from '@/components/setting/status-filter'
import { InterExter_LABELS, STATUS_LABELS, cn } from '@/lib/utils'
import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import EmployeeCellAction from '@/components/employee/forms/employee-cellaction'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import StarFieldSelect from '@/components/common/form/fields/star-field'
import StarRating from '@/components/common/star-rating'
import { useRouter } from 'next/navigation'


export type CandidateType = {
    id: number
    codeNo: string
    candidateName: string
    jobTitle: string
    internalExternal: string
    screeningStage: string
    rating: number
    status: boolean
}

const headerTypo = 'text-[14px] w-[220px]  font-bold text-[#687588]'


export const columns: ColumnDef<CandidateType>[] = [
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
            const { t } = useTranslation('candidates')
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
                <section className={cn(" text-start flex items-center justify-start gap-2",headerTypo)}>
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
        accessorKey: 'candidateName',
        header: ({ column }) => {
            const { t } = useTranslation('candidates')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [_, setPage] = useQueryState('page', parseAsInteger)

            const [name, setName] = useQueryState('candidateName', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const debouncedFun = useDebounceCallback(setName, 500)

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className={cn(" text-start flex items-center justify-start gap-2",headerTypo)}>
                    <SortButton columnName="candidateName" column={column} />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('candidateName') : ''}
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
            const { t } = useTranslation('candidates')
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
                <section className={cn(" text-start flex items-center justify-start gap-2",headerTypo)}>
                    <SortButton column={column} columnName="status" />
                    <MultiFilter
                        title={t('jobTitle')}
                        translation="candidates"
                        width="w-full"
                        value={empStatus}
                        loading={empLo}
                        setValue={setEmpStatus}
                        column={column}
                        options={modifiedData}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'internalExternal',
        header: ({ column }) => {
            const { t } = useTranslation('candidates')

            return (
                <section className="flex justify-start items-center min-w-[200px] gap-2">
                    <SortButton column={column} columnName="status" />
                    <div className="  w-full flex justify-start items-center p-1 rounded-lg">
                        <StatusFilter
                            align="left"
                            options={InterExter_LABELS}
                            filterField="otherServices"
                            column={column}
                            title={t('internalExternal')}
                            // isSingle={true}
                        />
                    </div>
                </section>
            )
        },
    },
    {
        accessorKey: 'screeningStage',
        header: ({ column }) => {
            const { t } = useTranslation('candidates')
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
                <section className="flex justify-start  items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="status" />
                    <MultiFilter
                        title={t('screeningStage')}
                        translation="candidates"
                        width="w-full"
                        value={empStatus}
                        loading={empLo}
                        setValue={setEmpStatus}
                        column={column}
                        options={modifiedData}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'screeningStage',
        header: ({ column }) => {
            const { t } = useTranslation('candidates')
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
                <section className="flex justify-start  items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="status" />
                    <MultiFilter
                        title={t('screeningStage')}
                        translation="candidates"
                        width="w-full"
                        value={empStatus}
                        loading={empLo}
                        setValue={setEmpStatus}
                        column={column}
                        options={modifiedData}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'rating',
        header: ({ column }) => {
            const { t } = useTranslation('candidates')
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
                <section className="flex justify-start  items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="status" />
                    <MultiFilter
                        title={t('rating')}
                        translation="candidates"
                        width="w-full"
                        value={empStatus}
                        loading={empLo}
                        setValue={setEmpStatus}
                        column={column}
                        options={modifiedData}
                    />
                </section>
            )
        },
        cell: ({ row }) => <StarRating/>,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            const { t } = useTranslation('hiringManager')

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
            const status = row.getValue('status') as string
            return (
                <div className="w-[100px]">
                    {status ? (
                        <ActiveBadge rounded />
                    ) : (
                        <InactiveBadge rounded />
                    )}
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
            const { t } = useTranslation('hiringSource')
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
                const rowData = row.original
                setItem(rowData)
                router.push('/recruitment/candidates/add-candidates')
            }

            const handleDetail = (row: any) => {
                router.push('/recruitment/candidates/add-candidates?detail=true')
                // toggle()
                // DetailTrue()
            }

            const handleDelete = () => {}
            const selectedGrandSubMenu = { IsEdit: true, IsDelete: true }
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
                        form={
                           <></>
                        }
                    />
                </div>
            )
        },
    },
]
