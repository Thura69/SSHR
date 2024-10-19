'use client'

import { ColumnDef } from '@tanstack/react-table'
import SortButton from '@/components/data-table/sort-button'
import InactiveBadge from '@/components/common/inactive-badge'
import ActiveBadge from '@/components/common/active-badge'
import { STATUS_LABELS, cn } from '@/lib/utils'
import useToast from '@/hooks/use-toast'
import { useBoolean } from 'usehooks-ts'

import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { deleteAudit } from '@/lib/audit-trail-api'
import useUserCookie from '@/hooks/use-user'
import useMenu from '@/state/zustand/menu'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { useDeleteVaccine } from '@/service/query-hooks/setting/use-vaccine'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import CellAction from '@/components/common/table/cell-action'
import MultiFilter from '../common/multi-filter'
import { useGetAllVaccineType } from '@/service/query-hooks/setting/use-vaccineType'
import { VaccineTypeType } from '@/types/setting/rvaccine-type'
import { StatusFilter } from '@/components/setting/common/status-filter'
import VaccineModal from '@/components/setting/vaccine/vaccine-modal'

export type Currency = {
    name: string
    description: string
    active: boolean
}

export const columns: ColumnDef<Currency>[] = [
    {
        id: 'select',
        header: ({ table }) =><SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            const { t } = useTranslation('vaccine')

            const [contractType, setContractType] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setContractType, 500)
            const { value, setFalse, setTrue } = useBoolean(true)

            const searchContractHandler = (
                e: ChangeEvent<HTMLInputElement>,
            ) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex justify-between items-center gap-2">
                    <SortButton column={column} columnName="name" />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('vaccine') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchContractHandler}
                        defaultValue={contractType}
                        className={'w-[120px] md:w-full'}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'vaccineTypeName',
        header: ({ column }) => {
            const { t } = useTranslation('vaccine')

            const [vacineType, setVaccineType] = useQueryState(
                'vaccine_type',
                {
                    defaultValue: '',
                    clearOnDefault: true,
                },
            )
            const [_, setPage] = useQueryState('page', parseAsInteger)

            const [countryValue, setCountryValue] = useState([])
            const {
                isError,
                isLoading: isVaccineTypeLoading,
                data: vaccineTypeData,
            } = useGetAllVaccineType({ allActive: true })

            const memorizedData = useMemo(
                () => vaccineTypeData?.data,
                [vaccineTypeData],
            );

            const autoCompleteOptions = memorizedData?.map(
                (vaccineType: VaccineTypeType) => {
                    return {
                        label: vaccineType.vaccine_type_name,
                        value: vaccineType.vaccine_type_name,
                    }
                },
            );

            useEffect(()=>{
                setVaccineType(countryValue.join(','))
            },[countryValue])


            return (
                <section className="flex justify-start  items-center gap-2">
                    <SortButton column={column} columnName="vaccine_type" />
                        <MultiFilter
                        title={t('vaccineType')}
                        translation="vaccine"
                        width='w-full lg:w-full'
                        loading={isVaccineTypeLoading}
                        value={countryValue}
                        setValue={setCountryValue}
                        column={column}
                        options={autoCompleteOptions}
                    />
                </section>
            )
        },
    },

    {
        accessorKey: 'status',
        enableHiding: true,
        header: ({ column }) => {
            const { t } = useTranslation('contractType')
            const { selectedGrandSubMenu } = useMenu()

            return (
                <section
                    className={cn(
                        'flex justify-center items-center gap-2  w-[200px]',
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
            const status = row.getValue('status') as string
            return <>{status ? <ActiveBadge /> : <InactiveBadge />}</>
        },
    },
    {
        accessorKey: 'action',
        enableHiding: true,
        header: () => {
            const { t } = useTranslation('financialYear')

            return (
                <div className="h-full bg-zinc-50  w-full px-2 flex items-center justify-center">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const { deleteById, isPending } = useDeleteVaccine()
            const [deleteData, setDeleteData] = useState<any>()
            const { showNotification } = useToast()
            const { value, toggle, setTrue } = useBoolean(false)
            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)
            const [singleCurrency, setSingleCurrency] = useState({
                currencyType: '',
                default: false,
                description: '',
                id: 0,
            })
            const { selectedMenuId, selectedGrandSubMenu } = useMenu()
            const { t } = useTranslation('vaccine')
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
                const rowData = deleteData.original.id // This gives you the user data of the selected row
                deleteById(rowData, {
                    onSuccess: (res) => {
                        showNotification({
                            message: res.message,
                            type: 'success',
                        })

                        dToggle()

                        //delete audit
                        deleteAudit({
                            ...auditPayload,
                            ValueBefore: row.original!,
                            Record_Name: row.original.name,
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

            const handleEdit = (row: any) => {
                const rowData = row.original
                setSingleCurrency(rowData)
                setTrue()
            }

            return (
                <div className={'flex justify-center   items-center'}>
                    <CellAction
                        language="vaccine"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setDeleteData}
                        handleDelete={() => dSetTrue()}
                        handleEdit={handleEdit}
                        row={row}
                    />
                    <VaccineModal
                        editData={singleCurrency}
                        editMode
                        title={`${t('modalEdit')}`}
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
