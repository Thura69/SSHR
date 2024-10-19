'use client'
import TableFrame from '@/components/common/table/table-frame'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { DataTable } from '@/components/data-table/data-table-two'
import {
    useCreateManyPublicHoliday,
    useGetAllPublicHoliday,
} from '@/service/query-hooks/setting/use-publicHoliday'
import { columns } from './column-def'
import PublicHolidayModal from './public-holiday-modal'
import CopyFrame from './copy-frame'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Paging from '@/components/common/pagers/pagination'
import useMenu from '@/state/zustand/menu'
import useToast from '@/hooks/use-toast'
import useFormStore from '@/state/zustand/form-store'
import { Loader } from 'lucide-react'
import useUserCookie from '@/hooks/use-user'
import { getAudit } from '@/lib/audit-trail-api'
import { useQueryClient } from '@tanstack/react-query'
import { getCurrentPublicKey } from './libs'
import { DEFAULT_SIZE } from '@/constants/pagination'
import { GetFormatPayload } from './get-format-payload'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'

export type Payment = {
    id: string
    amount: number
    status: 'pending' | 'processing' | 'success' | 'failed'
    email: string
}

function PublicHolidayList() {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('publicHoliday')
    const {
        data,
        isError: getError,
        isLoading: loadError,
        refetch,
        isFetched,
    } = useGetAllPublicHoliday()
    const {
        createMany,
        isError: manyError,
        isPending: manyLoading,
    } = useCreateManyPublicHoliday()
    const { showNotification } = useToast()
    const {
        value: copy,
        setTrue: setCopyTru,
        setFalse: setCopyfal,
    } = useBoolean()
    const [con, setCon] = useQueryState('con', parseAsString.withDefault(''))
    const [name, setName] = useQueryState('name', parseAsString.withDefault(''))
    const [date_from] = useQueryState(
        'calendar_year_from',
        parseAsString.withDefault(''),
    )
    const [is_active] = useQueryState(
        'is_active',
        parseAsString.withDefault(''),
    )
    const [size, setSize] = useQueryState<number>(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [date_to] = useQueryState(
        'calendar_year_to',
        parseAsString.withDefault(''),
    )
    const [financialyear, setFinancialYear] = useQueryState(
        'financial_year_id',
        parseAsInteger,
    )
    const { activeFinancial, currentFinancial, isUpdate } = useFormStore()
    const [activeData, setActiveData] = useState(false)
    const queryClient = useQueryClient()
    const [load, setLoad] = useState(false)

    const [modifiedData, setModifiedData] = useState([])
    const [meta, setMeta] = useState<any>(undefined)
    const [success, setSuccess] = useState(false)
    const queryKey = getCurrentPublicKey()
    const pathname = usePathname()
    const currentGrandSubMenu = useLegitGrandSub(pathname)

    const {
        selectedMenuId,
        selectedMenu,
        selectedSubMenuId,
        selectedGrandSubMenu,
    } = useMenu((state) => state)
    const user = useUserCookie()

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

    
    console.log("Public holiday data",data);

    useEffect(() => {
        setCon(null)
    }, [])

    useEffect(() => {
        if (con) {
            setSize(1000)
        } else {
            setSuccess(false)
            setSize(DEFAULT_SIZE)
        }
    }, [con])

    useEffect(() => {
        if (name) {
            setActiveData(true)
        }
    }, [name])

    useEffect(() => {
        if (
            data?.message === 'Record not found' ||
            data?.message === 'ရှာဖွေနေသောမှတ်တမ်း မရှိပါ။'
        ) {
            // setCon(null)
            setCopyTru()
            if (name || date_from || date_to || is_active) {
                setActiveData(true)
            } else {
                setActiveData(false)
            }
        } else {
            setMeta(data?.meta)

            const result = data?.data?.map((publicHolidayType: any) => {
                return {
                    holiday_setting_id: publicHolidayType?.holiday_setting_id,
                    holiday_name: publicHolidayType?.holiday_name,
                    holiday_date: publicHolidayType?.holiday_date,
                    for_all: publicHolidayType?.for_all,
                    is_active: publicHolidayType?.is_active,
                    company_id: publicHolidayType?.company_id
                        ? publicHolidayType?.company_id
                        : [],
                    location_id: publicHolidayType?.location_id
                        ? publicHolidayType?.location_id
                        : [],
                    branch_id: publicHolidayType?.branch_id
                        ? publicHolidayType?.branch_id
                        : [],
                    department_id: publicHolidayType?.department_id
                        ? publicHolidayType?.department_id
                        : [],
                    position_id: publicHolidayType?.position_id
                        ? publicHolidayType?.position_id
                        : [],
                    is_pay_salary: publicHolidayType?.is_pay_salary,
                    financial_year_id: currentFinancial?.value,
                }
            })

            setModifiedData(result)

            setCopyfal()

            if (result) {
                getAudit({
                    ...auditPayload,
                    Detail: result,
                    Record_Name: selectedGrandSubMenu?.menu_name!,
                })
            }
        }

        setLoad(false)
    }, [data])

    const handleClick = () => {
        setCon(null)
        setFinancialYear(currentFinancial?.value!)
        setModifiedData(data?.data)
        setLoad(true)
    }

    const handleSave = () => {
        let payload = GetFormatPayload(modifiedData)
        payload = { data: payload }

        createMany(payload, {
            onSuccess: (res) => {
                showNotification({
                    message: res.data.message,
                    type: 'success',
                })

                setSuccess(true)
                setCon(null)
                setFinancialYear(currentFinancial?.value!)
                setModifiedData(data?.data)
            },
            onError: (error) => {
                showNotification({
                    message: error.message,
                    type: 'danger',
                })
            },
        })
        setLoad(true)
    }

    const handleRemove = (id: number) => {
        setModifiedData((prev: any) =>
            prev.filter((e: any) => e.Holiday_Setting_ID !== id),
        )
    }

    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
                segments={[
                    {
                        title: selectedMenu?.tbl_menu_language?.[0]
                            ? selectedMenu?.tbl_menu_language[0]?.translated
                            : selectedMenu?.menu_name!,
                        href: `/${selectedMenu?.menu_name.toLowerCase()}`,
                    },
                    {
                        //@ts-ignore
                        title: selectedGrandSubMenu?.tbl_Menu_Language?.[0]
                            ? // @ts-ignore
                              selectedGrandSubMenu?.tbl_Menu_Language[0]
                                  ?.Translated
                            : selectedGrandSubMenu?.menu_name,
                        href: '',
                    },
                ]}
            />

            <TableFrame
                showFi={true}
                isWrite={currentGrandSubMenu?.is_write!}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="publicHoliday"
            />

            {copy && !activeData ? (
                <CopyFrame load={load} />
            ) : (
                <>
                    <DataTable
                        className={'with-action-column'}
                        columns={columns}
                        handleRemoveClick={handleRemove}
                        loading={loadError}
                        data={modifiedData || []}
                        setData={setModifiedData}
                    />
                    {con === 'copied' && (
                        <div className="bordr-2 w-full flex  items-center justify-center gap-5 my-[30px]">
                            <Button
                                disabled={manyLoading}
                                variant={'primary'}
                                onClick={handleSave}
                            >
                                {manyLoading ? <Loader /> : 'Save'}
                            </Button>
                            <Button
                                disabled={manyLoading}
                                variant={'outline'}
                                onClick={handleClick}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}

                    {con !== 'copied' ? (
                        meta?.totalCount > 0 &&
                        modifiedData?.length !== 0 && (
                            <Paging
                                currentPage={meta?.currentPage}
                                perPage={meta?.perPage}
                                totalCount={meta?.totalCount}
                            />
                        )
                    ) : (
                        <div></div>
                    )}
                </>
            )}
            <PublicHolidayModal
                title={`${t('modalTitle')}`}
                toggle={toggle}
                open={value}
            />
        </section>
    )
}

export default PublicHolidayList
