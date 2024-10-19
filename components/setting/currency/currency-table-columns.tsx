'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import SortButton from '@/components/data-table/sort-button'
import { Button } from '@/components/ui/button'
import useToast from '@/hooks/use-toast'
import { useBoolean } from 'usehooks-ts'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { deleteAudit } from '@/lib/audit-trail-api'
import useUserCookie from '@/hooks/use-user'
import useMenu from '@/state/zustand/menu'
import CurrencyModalType from './currency-modal'
import { useDeleteCurrency } from '@/service/query-hooks/setting/use-currency'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'

export type Currency = {
    currencyType: string
    description: string
    default: string
}

export const columns: ColumnDef<Currency>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="border-neutral-300 mt-1"
            />
        ),
        cell: ({ row }) => (
            <div className=' text-center'>
            <Checkbox
               checked={row.getIsSelected()}
               onCheckedChange={(value) => row.toggleSelected(!!value)}
               aria-label="Select row"
               className="border-neutral-300  border-2 mt-1"
           />
          </div>
        ),
    },
    {
        accessorKey: 'currencyType',
        header: ({ column }) => {
            const { t } = useTranslation('currency');
            const {value,setFalse,setTrue} = useBoolean(true)

            return (
                <section className="flex justify-between items-center gap-2">
                    <DataTableColumnInput
                        onMouseDown={()=>setFalse()}
                        onMouseOut={()=>setTrue()}
                        placeholder={value ? t('currencyType') : '' }
                        containerClassName={'flex-1'}
                        className={'w-[120px] md:w-full'}
                    />
                    <SortButton column={column} />
                </section>
            )
        },
    },
    {
        accessorKey: 'description',
        header: ({ column }) => {
            const { t } = useTranslation('currency')

            return (
                <section className="flex justify-between items-center gap-2">
                    <DataTableColumnInput
                        placeholder={t('description')}
                        containerClassName={'flex-1'}
                        className={'w-[120px] md:w-full'}
                    />
                    <SortButton column={column} />
                </section>
            )
        },
    },
    {
        accessorKey: 'default',
        header: ({ column }) => {
            const { t } = useTranslation('currency')

            return (
                <section className="flex justify-between items-center gap-2">
                    <DataTableColumnInput
                        placeholder={t('default')}
                        containerClassName={'flex-1'}
                        className={'w-[120px] md:w-full'}
                    />
                    <SortButton column={column} />
                </section>
            )
        },
    },
    {
        accessorKey: 'action',
        header: () => {
            const { t } = useTranslation('financialYear')

            return (
                <div className="h-full bg-zinc-50 flex items-center justify-center">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const { deleteById, isError, isPending } = useDeleteCurrency()
            const { showNotification } = useToast()
            const [deleteData, setDeleteData] = useState<any>()
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
            const { selectedMenuId, selectedSubMenuId, selectedGrandSubMenu } =
                useMenu()
            const { t } = useTranslation('currency')
            const user = useUserCookie()

            const auditPayload = {
                Is_Mobile: false,
                Emp_Name: user?.employee_name!,
                Page_Name: 'Currency Page',
                Parent_Menu_ID: selectedMenuId!,
                Sub_Menu_ID: selectedSubMenuId!,
            }

            const handleDelete = (row: any) => {
                const rowData = deleteData.original.id // This gives you the user data of the selected row
                deleteById(rowData, {
                    onSuccess: (res) => {
                        showNotification({
                            message: res.message,
                            type: 'success',
                        })

                        //dtoggle
                        dToggle()

                        //delete audit
                        deleteAudit({
                            ...auditPayload,
                            ValueBefore: deleteData.original!,
                            Record_Name: deleteData.original.currencyType,
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
                <div className={'flex justify-center w-[80px]'}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="hover:">
                            <Button variant="primary" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4 rotate-90" />
                            </Button>
                        </DropdownMenuTrigger>

                        {(!selectedGrandSubMenu?.is_edit ||
                            !selectedGrandSubMenu?.is_delete) && (
                            <DropdownMenuContent align="end">
                                {!selectedGrandSubMenu?.is_edit && (
                                    <DropdownMenuItem
                                        onClick={() => handleEdit(row)}
                                    >
                                        {t('edit')}
                                    </DropdownMenuItem>
                                )}
                                {!selectedGrandSubMenu?.is_delete && (
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setDeleteData(row)
                                            dSetTrue()
                                        }}
                                    >
                                        {t('delete')}
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        )}
                    </DropdownMenu>
                    <CurrencyModalType
                        editData={singleCurrency}
                        editMode
                        title={`${t('modalTitle')}`}
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
