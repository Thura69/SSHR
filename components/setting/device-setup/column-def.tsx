import { DeviceSetUpColumnDefType } from '@/types/setting/device-setup-types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { useTranslation } from 'react-i18next'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { ChangeEvent, useState } from 'react'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import SortButton from '@/components/data-table/sort-button'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import CellAction from '@/components/common/table/cell-action'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import { useDeleteCurrency } from '@/service/query-hooks/setting/use-currency'
import useToast from '@/hooks/use-toast'
import { useBoolean } from 'usehooks-ts'
import useUserCookie from '@/hooks/use-user'
import { deleteAudit } from '@/lib/audit-trail-api'
import useMenu from '@/state/zustand/menu'
import { useRouter } from 'next/navigation'
import { useDeleteDeviceSetup } from '@/service/query-hooks/setting/use-deviceSetup'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import MultiFilter from '../common/multi-filter'
import { autoCompleteOptions, baudRateOptions, connectionType, modeOptions } from '@/app/settings/device-setup/utils'
import { StatusFilter } from '../status-filter'
import { ASK_LABELS, STATUS_LABELS, cn } from '@/lib/utils'
import { useEffect } from 'react'
import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'

export const columns: ColumnDef<DeviceSetUpColumnDefType>[] = [
    {
        id: 'select',
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) =>    <SelectCell row={row} />,
    },
    {
        accessorKey: 'deviceName',
        header: ({ column }) => {
            const { t } = useTranslation('deviceSetup')
            const { value, setFalse, setTrue } = useBoolean(true)

            //search filter
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

            return (
                <section className="flex min-w-[200px]  justify-start items-center gap-2">
                    <SortButton column={column} columnName='name' />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('deviceName') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchNameHandler}
                        defaultValue={name}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'deviceNo',
        header: ({ column }) => {
            const { t } = useTranslation('deviceSetup')
            const { value, setFalse, setTrue } = useBoolean(true)

            //search filter
            const [name, setName] = useQueryState('device_no', {
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
                <section className="flex justify-start min-w-[200px] items-center gap-2">
                    <SortButton column={column} columnName='device_no' />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('deviceNo') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchNameHandler}
                        defaultValue={name}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'model',
        header: ({ column }) => {
            const { t } = useTranslation('deviceSetup')
            const [modelValue,setModelValue] = useState([]);

            //search filter
            const [name, setName] = useQueryState('model', {
                defaultValue: '',
                clearOnDefault: true,
            });

            useEffect(()=>{
                setName(modelValue.join(','))
            },[modelValue])
            

            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setName, 500)
            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex justify-start items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName='model' />
                    <MultiFilter 
                     title={t('modalForm')}
                     translation='deviceSetup'
                     value={modelValue}
                     width='w-full'
                     setValue={setModelValue}
                     column={column}
                     options={autoCompleteOptions}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'mode',
        header: ({ column }) => {
            const { t } = useTranslation('deviceSetup')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [mode,setMode] = useState([]);
            //search filter
            const [name, setName] = useQueryState('mode', {
                defaultValue: '',
                clearOnDefault: true,
            })

            useEffect(()=>{
                setName(mode.join(','))
            },[mode])

            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setName, 500)
            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex justify-start items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName='mode' />
                    <MultiFilter 
                     title={t('mode')}
                     translation='deviceSetup'
                     width='w-full'
                     value={mode}
                     setValue={setMode}
                     column={column}
                     options={modeOptions}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'connectionType',
        header: ({ column }) => {
            const { t } = useTranslation('deviceSetup')
            const [conType,setConType] = useState([]);

            const [name, setName] = useQueryState('connection_type', {
                defaultValue: '',
                clearOnDefault: true,
            });

            useEffect(()=>{
                setName(conType.join(','))
            },[conType])

            //search filter

            return (
                <section className="flex justify-start items-center gap-2 min-w-[250px]">
                <SortButton column={column} columnName='connection_type' />
                    <MultiFilter 
                     title={t('connectionType')}
                     translation='deviceSetup'
                     width='w-full'
                     value={conType}
                     setValue={setConType}
                     column={column}
                     options={connectionType}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'baudRate',
        header: ({ column }) => {
            const { t } = useTranslation('deviceSetup')
            const { value, setFalse, setTrue } = useBoolean(true);
            const [baudRate,setBaudRate] = useState([]);

            //search filter
            const [name, setName] = useQueryState('baud_rate', {
                defaultValue: '',
                clearOnDefault: true,
            });


            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setName, 500)
            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            };

            useEffect(()=>{
                setName(baudRate.join(','))
            },[baudRate])

            return (
                <section className="flex justify-start items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName='baud_rate' />
                    <MultiFilter 
                     title={t('baudRate')}
                     translation='deviceSetup'
                     width='w-full'
                     value={baudRate}
                     setValue={setBaudRate}
                     column={column}
                     options={baudRateOptions}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'ipAddress',
        header: ({ column }) => {
            const { t } = useTranslation('deviceSetup')
            const { value, setFalse, setTrue } = useBoolean(true)

            //search filter
            const [name, setName] = useQueryState('ip_address', {
                defaultValue: '',
                clearOnDefault: true,
            });

            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setName, 500)
            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex justify-start items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName='ip_address' />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('ipAddress') : ''}
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
        accessorKey: 'portNumber',
        header: ({ column }) => {
            const { t } = useTranslation('deviceSetup')
            const { value, setFalse, setTrue } = useBoolean(true)

            //search filter
            const [name, setName] = useQueryState('port_number', {
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
                <section className="flex justify-start items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName='port_number' />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        width={'full'}
                        placeholder={value ? t('portNo') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchNameHandler}
                        defaultValue={name}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'interval',
        header: ({ column }) => {
            const { t } = useTranslation('deviceSetup')
            const { value, setFalse, setTrue } = useBoolean(true)

            //search filter
            const [name, setName] = useQueryState('interval', {
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
                <section className="flex justify-start items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName='interval' />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('interval') : ''}
                        containerClassName={'flex-1'}
                        width={'w-full'}
                        onChange={searchNameHandler}
                        defaultValue={name}
                    />
                </section>
            )
        },
    },
    // {
    //     accessorKey: 'allowMealAllowance',
    //     header: ({ column }) => {
    //         const { t } = useTranslation('deviceSetup')
    //         const { value, setFalse, setTrue } = useBoolean(true)

    //         //search filter
    //         const [name, setName] = useQueryState('allowMealAllowance', {
    //             defaultValue: '',
    //             clearOnDefault: true,
    //         })

    //         const [_, setPage] = useQueryState('page', parseAsInteger)
         

    //         return (
    //     <section className="flex justify-start items-center gap-2 ">
    //      <SortButton column={column} columnName='meal_allowance' />
    //     <div className='border px-2 p-1 rounded-lg'>
    //     <StatusFilter
    //     align="left"
    //     options={ASK_LABELS}
    //     filterField='meal_allowance'
    //     column={column}
    //     className='w-full'
    //     title={t('allowMeal')}/>
    //     </div>
    //             </section>
    //         )
    //     },
    //     cell: ({ row }) => {
    //         const status = row.getValue('allowMealAllowance') as string
    //         return <div className='text-center'>{status ? <h3>Yes</h3> : <h3>No</h3>}</div>
    //     },
    // },
    {
        accessorKey: 'isActive',
        enableHiding: true,
        header: ({ column }) => {
            const { t } = useTranslation('contractType')
            const { selectedGrandSubMenu } = useMenu()

            return (
                <section
                    className={cn(
                        'flex justify-start items-center gap-2',
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
            const status = row.getValue('isActive') as string
            return <>{status ? <ActiveBadge /> : <InactiveBadge />}</>
        },
    },
    {
        accessorKey: 'action',
        header: () => {
            const { t } = useTranslation('deviceSetup')

            return (
                <div className="h-full bg-zinc-50 w-[80px]  flex items-center justify-center">
                <p className="font-bold text-zinc-500 text-center">
                    {t('action')}
                </p>
            </div>
            )
        },
        cell: ({ row }) => {
            const { deletebyId, isError, isPending } = useDeleteDeviceSetup()
            const { showNotification } = useToast()
            const [deleteData, setDeleteData] = useState<any>()
            const { value, toggle, setTrue } = useBoolean(false)
            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)
            const [singleCurrency, setSingleCurrency] = useState<any>()
            const { selectedMenuId, selectedSubMenuId, selectedGrandSubMenu } =
                useMenu()
            const { t } = useTranslation('deviceSetup')
            const user = useUserCookie()
            const router = useRouter()

            const auditPayload = {
                Is_Mobile: false,
                Emp_Name: user?.employee_name!,
                Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
                Parent_Menu_ID: selectedMenuId!,
                Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
                Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
            }
            

            const handleDelete = (row: any) => {
                const rowData = singleCurrency.original.id // This gives you the user data of the selected row
                deletebyId(rowData, {
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
                            ValueBefore: singleCurrency.original!,
                            Record_Name: singleCurrency.original.deviceName,
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
                router.push(
                    `/settings/device-setup/device-setup-setting/${row.original.id}`,
                )
                const rowData = row.original
                setSingleCurrency(rowData)
                setTrue()
            }

            return (
                <>
                    <CellAction
                        language="deviceSetup"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setSingleCurrency}
                        handleDelete={() => dToggle()}
                        handleEdit={handleEdit}
                        row={row}
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

