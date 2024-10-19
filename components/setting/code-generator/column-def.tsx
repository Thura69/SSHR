'use client'

import { ColumnDef } from '@tanstack/react-table'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import SortButton from '@/components/data-table/sort-button'
import { useTranslation } from 'react-i18next'
import { parseAsInteger, useQueryState } from 'nuqs'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { CodeGeneratorColumnDefType } from '@/types/setting/code-generator-type'
import useToast from '@/hooks/use-toast'
import { useBoolean } from 'usehooks-ts'
import useUserCookie from '@/hooks/use-user'
import useMenu from '@/state/zustand/menu'
import CellAction from '@/components/common/table/cell-action'
import CodeGeneratorModal from './code-generator-modal'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import { useDeleteCodeGenerator } from '@/service/query-hooks/setting/use-codeGenerator'
import { deleteAudit } from '@/lib/audit-trail-api'
import { ASK_LABELS, STATUS_LABELS } from '@/lib/utils'
import { StatusFilter } from '../status-filter'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import { useGetAllEmpStatus } from '@/service/query-hooks/setting/useEmploymentStatus'
import MultiFilter from '../common/multi-filter'
import { additionalData } from './utils'

export type User = {
    name: string
    status: string
}

export const columns: ColumnDef<CodeGeneratorColumnDefType>[] = [
    {
        id: 'select',
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'positionType',
        header: ({ column }) => {
            const { t } = useTranslation('codeGenerator')

            const [name, setName] = useQueryState('type', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [posiType, setPosiType] = useState([])

            const [_] = useQueryState('page', parseAsInteger)

            useEffect(() => {
                setName(posiType.join(','))
            }, [posiType])

            return (
                <section className="flex justify-start items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="type" />
                    <MultiFilter
                        title={t('positionType')}
                        translation="deviceSetup"
                        width="w-full"
                        value={posiType}
                        setValue={setPosiType}
                        column={column}
                        options={additionalData}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'employeeStatue',
        header: ({ column }) => {
            const { t } = useTranslation('codeGenerator')
            const [name, setName] = useQueryState('emp_status', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [empStatus, setEmpStatus] = useState([])
            const { isLoading: empLo, data: EmpData } = useGetAllEmpStatus();

            const [_, setPage] = useQueryState('page', parseAsInteger)

            const memorizedDta = useMemo(() => EmpData, [EmpData])

            const modifiedData = memorizedDta?.data?.map((empData: any) => {
                return {
                    value: empData.employment_status_id,
                    label: empData.employment_status_name,
                }
            })

            useEffect(() => {
                setName(empStatus.join(','))
            }, [empStatus])

            return (
                <section className="flex justify-start  items-center gap-2 min-w-[200px]">
                    {/* <SortButton column={column} columnName="status" /> */}
                    {/* <div className='w-4 h-4'></div> */}
                    <MultiFilter
                        title={t('employeeStatus')}
                        translation="deviceSetup"
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
        cell: ({ row }) => {
            return (
                <div className="flex gap-2 flex-wrap  ">
                    {row.original.employeeStatue &&
                    Array.isArray(row.original.employeeStatue) &&
                    row.original.employeeStatue.length > 0
                        ? row.original.employeeStatue.length > 1
                            ? row.original.employeeStatue.map(
                                  (e: any, index: number) => (
                                      <p className="text-sm" key={index}>
                                          {e.employment_status_name}
                                          {index !==
                                          row.original.employeeStatue.length - 1
                                              ? ','
                                              : ''}
                                      </p>
                                  ),
                              )
                            : row.original.employeeStatue.map(
                                  (e: any, index: number) => (
                                      <p className="text-sm" key={index}>
                                          {e.employment_status_name}
                                      </p>
                                  ),
                              )
                        : null}
                </div>
            )
        },
    },
    {
        accessorKey: 'serialNo',
        header: ({ column }) => {
            const { t } = useTranslation('codeGenerator')
            const [name, setName] = useQueryState('serial_no', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setName, 500)
            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }
            const { value, setFalse, setTrue } = useBoolean(true)
            return (
                <section className="flex  min-w-[200px] justify-start items-center gap-2">
                    <SortButton column={column} columnName="serial_no" />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('serialNo') : ''}
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
        accessorKey: 'prefix',
        header: ({ column }) => {
            const { t } = useTranslation('codeGenerator')
            const [name, setName] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setName, 500)
            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }
            const { value, setFalse, setTrue } = useBoolean(true)
            return (
                <section className="flex  min-w-[200px] justify-start items-center gap-2">
                    <SortButton column={column} columnName="prefix" />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('prefix') : ''}
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
        accessorKey: 'format',
        header: ({ column }) => {
            const { t } = useTranslation('codeGenerator')
            const [name, setName] = useQueryState('format', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setName, 500)
            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }
            const { value, setFalse, setTrue } = useBoolean(true)
            return (
                <section className="flex  min-w-[200px] justify-start items-center gap-2">
                    <SortButton column={column} columnName="format" />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('format') : ''}
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
        accessorKey: 'generateCode',
        header: ({ column }) => {
            const { t } = useTranslation('codeGenerator')

            const { selectedGrandSubMenu } = useMenu()

            return (
                <section className="flex justify-start items-center min-w-[200px] gap-2">
                <SortButton column={column} columnName="status" />
                <div className="  w-full flex justify-start items-center p-1 rounded-lg">
                <StatusFilter
                align="left"
                options={ASK_LABELS}
                filterField="generate_new_code"
                column={column}
                title={t('generateNewCode')}
                // isSingle={true}
                />
                </div>
                </section>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('generateCode') as string
            return (
                <div className="text-center">
                    {status ? <h3>Yes</h3> : <h3>No</h3>}
                </div>
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
            const { showNotification } = useToast()
            const { isError, isPending, deletebyId } = useDeleteCodeGenerator()
            const { value, toggle, setTrue } = useBoolean(false)
            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)

            const [singleCodeGenerator, setSingleCodeGenerator] =
                useState<any>()
            const { selectedMenuId, selectedSubMenuId, selectedGrandSubMenu } =
                useMenu()
            const { t } = useTranslation('codeGenerator')
            const user = useUserCookie()

            const auditPayload = {
                Is_Mobile: false,
                Emp_Name: user?.employee_name!,
                Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
                Parent_Menu_ID: selectedMenuId!,
                Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
                Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
            }

            const handleDelete = (row: any) => {
                const rowData = singleCodeGenerator.original.id

                deletebyId(rowData, {
                    onSuccess: (res) => {
                        showNotification({
                            message: res.message,
                            type: 'success',
                        })

                        dToggle()

                        //delete audit
                        // deleteAudit({
                        //     ...auditPayload,
                        //     ValueBefore: singleCodeGenerator.original!,
                        //     Record_Name: singleCodeGenerator.original.prefix,
                        // })
                    },
                    onError: (error) => {
                        showNotification({
                            message: error.message,
                            type: 'danger',
                        })
                    },
                })

                dSetTrue()
            }

            const handleEdit = (row: any) => {
                const rowData = row.original
                setSingleCodeGenerator(rowData)
                setTrue()
            }

            return (
                <>
                    <CellAction
                        language="codeGenerator"
                        selectedGrandSubMenu={{ is_delete: selectedGrandSubMenu?.is_delete ,is_edit:selectedGrandSubMenu?.is_edit}}
                        setSingleCodeGenerator={setSingleCodeGenerator}
                        handleDelete={() => dToggle()}
                        handleEdit={handleEdit}
                        row={row}
                    />
                    <CodeGeneratorModal
                        editData={singleCodeGenerator}
                        editMode
                        open={value}
                        toggle={toggle}
                        title={`${t('editRecord')}`}
                    />
                    <DeleteConfirm
                        message={t('deleteText')}
                        title={t('deleteTitle')}
                        isLoading={isPending}
                        toggle={dToggle}
                        open={dValue}
                        fun={handleDelete}
                    />
                </>
            )
        },
    },
]
