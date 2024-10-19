import SelectCell from '@/components/data-table/select-cell'
import SelectHeader from '@/components/data-table/select-header'
import {
    BranchSetUpColumnDefType,
    filterKeys,
} from '@/types/organisation-structure/branch'
import { ColumnDef } from '@tanstack/react-table'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useTranslation } from 'react-i18next'
import { useDebouncedCallback } from 'use-debounce'
import { useBoolean } from 'usehooks-ts'
import { ChangeEvent, useState } from 'react'
import { DEFAULT_PAGE } from '@/constants/pagination'
import SortButton from '@/components/data-table/sort-button'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import useMenu from '@/state/zustand/menu'
import { cn, STATUS_LABELS } from '@/lib/utils'
import CellAction from '@/components/common/table/cell-action'
import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import { StatusFilter } from '@/components/setting/status-filter'
import MultiFilter from '@/components/setting/common/multi-filter'
import { additionalData } from '@/components/setting/code-generator/utils'
import SectionModel from '../section/section-model'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'


export const columns: ColumnDef<BranchSetUpColumnDefType>[] = [
    {
        id: 'select',
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'location_address',
        header: ({ column }) => {
            const { t } = useTranslation('branch')
            const { value, setFalse, setTrue } = useBoolean(true)

            //search filter
            const [name, setName] = useQueryState(filterKeys.location, {
                defaultValue: '',
                clearOnDefault: true,
            });

            const [location, setLocation] = useState([])

            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setName, 500)
            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }
            return (
                <section className="flex min-w-[200px]  justify-start items-center gap-2">
                    <SortButton column={column} columnName="name" />
                    <MultiFilter
                        title={t('location')}
                        translation="branch"
                        width="w-full"
                        value={location}
                        setValue={setLocation}
                        column={column}
                        options={additionalData}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'branch_name',
        header: ({ column }) => {
            const { t } = useTranslation('branch')
            const { value, setFalse, setTrue } = useBoolean(true)

            //search filter
            const [name, setName] = useQueryState(filterKeys.department, {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [departmentType, setDepartmentType] = useState([])

            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setName, 500)
            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }
            return (
                <section className="flex min-w-[200px]  justify-start items-center gap-2">
                    <SortButton column={column} columnName="name" />
                    <MultiFilter
                        title={t('department')}
                        translation="branch"
                        width="w-full"
                        value={departmentType}
                        setValue={setDepartmentType}
                        column={column}
                        options={additionalData}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'total_employee',
        header: ({ column }) => {
            const { t } = useTranslation('branch')
            const { value, setFalse, setTrue } = useBoolean(true)

            //search filter
            const [name, setName] = useQueryState(filterKeys.totalEmployee, {
                defaultValue: '',
                clearOnDefault: true,
            })

            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setName, 500)
            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }
            return (
                <section className="flex min-w-[200px]  justify-start items-center gap-2">
                    <SortButton column={column} columnName="name" />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('total_employess') : ''}
                        containerClassName={'flex-1'}
                        width={'w-full'}
                        onChange={searchNameHandler}
                        defaultValue={name}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'is_active',
        enableHiding: true,
        header: ({ column }) => {
            const { t } = useTranslation('contractType')
            const { selectedGrandSubMenu } = useMenu()

            return (
                <section
                    className={cn('flex justify-start items-center gap-2')}
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
            const status = row.getValue('Status') as string
            return <>{status ? <ActiveBadge /> : <InactiveBadge />}</>
        },
    },
    {
        accessorKey: 'action',
        header: () => {
            const { t } = useTranslation('branch')

            return (
                <div className="h-full bg-zinc-50 w-[80px]  flex items-center justify-center">
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
                const rowData = row.original;
                setSgSectionData(rowData);
                setTrue();
                
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
