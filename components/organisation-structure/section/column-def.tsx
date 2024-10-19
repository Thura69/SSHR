import SelectCell from '@/components/data-table/select-cell'
import SelectHeader from '@/components/data-table/select-header'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { Section } from '@/types/org-structure'
import { ColumnDef } from '@tanstack/react-table'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useTranslation } from 'react-i18next'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import { ChangeEvent, useEffect, useState } from 'react'
import SortButton from '@/components/data-table/sort-button'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import { STATUS_LABELS, cn } from '@/lib/utils'
import { StatusFilter } from '@/components/setting/status-filter'
import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import useMenu from '@/state/zustand/menu'
import CellAction from '@/components/common/table/cell-action'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import MultiFilter from '@/components/setting/common/multi-filter'
import { additionalData } from '@/components/setting/code-generator/utils'
import SectionModel from './section-model'

export const columns: ColumnDef<Section>[] = [
    {
        id: 'select',
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'Department_Name',
        header: ({ column }) => {
            const { t } = useTranslation('section')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [empStatus, setEmpStatus] = useState([])

            const [department, setDepartment] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebounceCallback(setDepartment, 500)

            const [name, setName] = useQueryState('department_name', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const modifiedData = additionalData?.map((empData: any) => {
                return {
                    value: empData.value,
                    label: empData.label,
                }
            })
            useEffect(() => {
                setName(empStatus.join(','))
            }, [empStatus])

            return (
                <section className="flex justify-start  items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="department" />
                    <MultiFilter
                        title={t('departmentName')}
                        translation="section"
                        width="w-full"
                        value={empStatus}
                        loading={false}
                        setValue={setEmpStatus}
                        column={column}
                        options={modifiedData}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'section_name',
        header: ({ column }) => {
            const { t } = useTranslation('section')
            const { value, setFalse, setTrue } = useBoolean(true)

            const [department, setDepartment] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebounceCallback(setDepartment, 500)

            const searchContractHandler = (
                e: ChangeEvent<HTMLInputElement>,
            ) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex justify-start items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="name" />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('sectionName') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchContractHandler}
                        defaultValue={department}
                        className={'w-full'}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'Total_Employees',
        header: ({ column }) => {
            const { t } = useTranslation('section')
            const { value, setFalse, setTrue } = useBoolean(true)

            const [department, setDepartment] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebounceCallback(setDepartment, 500)

            const searchContractHandler = (
                e: ChangeEvent<HTMLInputElement>,
            ) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex justify-start items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="employee" />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('totalEmployee') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchContractHandler}
                        defaultValue={department}
                        className={'w-full'}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'Active',
        enableHiding: true,
        header: ({ column }) => {
            const { t } = useTranslation('section')
            const { selectedGrandSubMenu } = useMenu()

            return (
                <section
                    className={cn(
                        'flex justify-start  items-center gap-2',
                        !selectedGrandSubMenu?.is_edit && 'md:w-[100px]',
                    )}
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
            const status = row.getValue('is_active') as string
            return <>{status ? <ActiveBadge /> : <InactiveBadge />}</>
        },
    },
    {
        accessorKey: 'action',
        enableHiding: true,
        header: () => {
            const { t } = useTranslation('department')

            return (
                <div className="h-full bg-zinc-50  flex items-center justify-center">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const { selectedMenuId, selectedGrandSubMenu } = useMenu()
            const [deleteData, setDeleteData] = useState<any>()
            const { t } = useTranslation('section')
            const { value, toggle, setTrue } = useBoolean(false)
            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)
            const [sgSectionData, setSgSectionData] = useState<any>({})

            const handleEdit = (row: any) => {
                console.log(row.original)
                const rowData = row.original
                setSgSectionData(rowData)
                setTrue()
            }

            const handleDelete = () => {}

            return (
                <div className={'flex justify-center '}>
                    <CellAction
                        language="section"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setDeleteData}
                        handleDelete={() => dToggle()}
                        handleEdit={handleEdit}
                        row={row}
                    />
                    <SectionModel
                        title={`${t('modalEdit')}`}
                        editData={sgSectionData}
                        editMode
                        open={value}
                        toggle={toggle}
                    />
                    <DeleteConfirm
                        message={t('deleteText')}
                        title={t('deleteTitle')}
                        isLoading={false}
                        toggle={dToggle}
                        open={dValue}
                        fun={handleDelete}
                    />
                </div>
            )
        },
    },
]
