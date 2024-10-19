import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeCellAction from '@/components/employee/forms/employee-cellaction'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import { cn, InterExter_LABELS, STATUS_LABELS } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import SkillSetForm from '../skill-sets/skill-set-form'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import { ChangeEvent, useMemo, useState } from 'react'
import HiringForm from './form'
import SortButton from '@/components/data-table/sort-button'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import { parseAsInteger, useQueryState } from 'nuqs'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { StatusFilter } from '@/components/setting/status-filter'
import MultiFilter from '@/components/setting/common/multi-filter'
import { useGetAllEmpStatus } from '@/service/query-hooks/setting/useEmploymentStatus'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'

export type ColumnDetails = {
    id: number
    name: string
    hiringRole: string
    interExter: string
    status: boolean
}
const headerTypo = 'text-[14px] w-[220px]  font-bold text-[#687588]'

export const columns: ColumnDef<ColumnDetails>[] = [
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
        accessorKey: 'name',
        header: ({ column }) => {
            const { t } = useTranslation('hiringManager')
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
                        placeholder={value ? t('name') : ''}
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
        accessorKey: 'hiringRole',
        header: ({ column }) => {
            const { t } = useTranslation('hiringManager')
            const { value, setFalse, setTrue } = useBoolean(true)

            const [hiringRole, setHiringRole] = useQueryState('hiringRole', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const [_, setPage] = useQueryState('page', parseAsInteger)

            const debouncedFun = useDebounceCallback(setHiringRole, 500)

            const [empStatus, setEmpStatus] = useState([])
            const { isLoading: empLo, data: EmpData } = useGetAllEmpStatus()

            const memorizedDta = useMemo(() => EmpData, [EmpData])

            const modifiedData = memorizedDta?.data?.map((empData: any) => {
                return {
                    value: empData.Employment_Status_ID,
                    label: empData.Employment_Status_Name,
                }
            })

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex justify-start  items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="status" />
                    <MultiFilter
                        title={t('hiringRole')}
                        translation="hiringManager"
                        width="w-full "
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
        accessorKey: 'interExter',
        header: ({ column }) => {
            const { t } = useTranslation('hiringManager')

            return (
                <section className="flex justify-start items-center min-w-[200px] gap-2">
                    <SortButton column={column} columnName="status" />
                    <div className="  w-full flex justify-start items-center p-1 rounded-lg">
                        <StatusFilter
                            align="left"
                            options={InterExter_LABELS}
                            filterField="otherServices"
                            column={column}
                            title={t('interExter')}
                            // isSingle={true}
                        />
                    </div>
                </section>
            )
        },
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
            const { t } = useTranslation('hiringManager')
            const [item, setItem] = useState([])
            const { value, toggle, setTrue } = useBoolean(false)
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
                setItem(rowData)
                toggle()
                DetailFalse()
            }

            const handleDetail = (row: any) => {
                const rowData = row.original
                setItem(rowData)
                toggle()
                DetailTrue()
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
                            <HiringForm
                                editMode={value}
                                detailValue={DetailValue}
                                editData={item}
                                toggle={toggle}
                            />
                        }
                    />
                </div>
            )
        },
    },
]
