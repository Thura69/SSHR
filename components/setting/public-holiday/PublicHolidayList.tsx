'use client'
// import TableFrame from '@/components/common/Table/table-frame'
import TableFrame from '@/components/common/table/table-frame'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { DataTable } from '@/components/data-table/data-table-two'
import {
    useGetAllPublicHoliday,
    useCreateManyPublicHoliday,
} from '@/service/query-hooks/setting/use-publicHoliday'
import { columns } from './column-def'
import PublicHolidayModal from './public-holiday-modal'
import CopyFrame from './CopyFrame'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Paging from '@/components/common/pagers/pagination'
import useMenu from '@/state/zustand/menu'
import useToast from '@/hooks/use-toast'
import { Loader } from 'lucide-react'
import useUserCookie from '@/hooks/use-user'
import { useQueryClient } from '@tanstack/react-query'
import { getCurrentPublicKey } from './libs'
import { DEFAULT_SIZE } from '@/constants/pagination'
import useFormStore from '@/state/zustand/form-store'
import { getAudit } from '@/lib/audit-trail-api'

export type Payment = {
    id: string
    amount: number
    status: 'pending' | 'processing' | 'success' | 'failed'
    email: string
}

const PublicHolidayList = () => {
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
    const {
        activeFinancial,
        currentFinancial,
        isUpdate,
        currentFinancialYear,
    } = useFormStore()
    const [activeData, setActiveData] = useState(false)
    const queryClient = useQueryClient()
    const [load, setLoad] = useState(false)

    const [modifiedData, setModifiedData] = useState([])
    const [meta, setMeta] = useState<any>(undefined)
    const [success, setSuccess] = useState(false)
    const queryKey = getCurrentPublicKey()

    const {
        selectedMenuId,
        selectedMenu,
        selectedSubMenuId,
        selectedGrandSubMenu,
    } = useMenu((state) => state)

    const router = useRouter()
    const user = useUserCookie()

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

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
                if (!con) {
                    return {
                        Holiday_Setting_ID:
                            publicHolidayType?.Holiday_Setting_ID,
                        Holiday_Name: publicHolidayType?.Holiday_Name,
                        Holiday_Date: publicHolidayType?.Holiday_Date,
                        ForAll: publicHolidayType?.ForAll,
                        IsActive: publicHolidayType?.IsActive,
                        Company_ID: publicHolidayType?.Company_ID
                            ? publicHolidayType?.Company_ID
                            : [],
                        Location_ID: publicHolidayType?.Location_ID
                            ? publicHolidayType?.Location_ID
                            : [],
                        Branch_ID: publicHolidayType?.Branch_ID
                            ? publicHolidayType?.Branch_ID
                            : [],
                        Department_ID: publicHolidayType?.Department_ID
                            ? publicHolidayType?.Department_ID
                            : [],
                        Position_ID: publicHolidayType?.Position_ID
                            ? publicHolidayType?.Position_ID
                            : [],
                        Pay_HolidayType: publicHolidayType?.Pay_HolidayType,
                        FinancialYear_ID: currentFinancial?.value,
                    }
                } else {
                    return {
                        Holiday_Setting_ID:
                            publicHolidayType?.Holiday_Setting_ID,
                        Holiday_Name: publicHolidayType?.Holiday_Name,
                        Holiday_Date: new Date(
                            publicHolidayType?.Holiday_Date,
                        ).setFullYear(Number(currentFinancialYear)),
                        ForAll: publicHolidayType?.ForAll,
                        IsActive: publicHolidayType?.IsActive,
                        Company_ID: publicHolidayType?.Company_ID
                            ? publicHolidayType?.Company_ID
                            : [],
                        Location_ID: publicHolidayType?.Location_ID
                            ? publicHolidayType?.Location_ID
                            : [],
                        Branch_ID: publicHolidayType?.Branch_ID
                            ? publicHolidayType?.Branch_ID
                            : [],
                        Department_ID: publicHolidayType?.Department_ID
                            ? publicHolidayType?.Department_ID
                            : [],
                        Position_ID: publicHolidayType?.Position_ID
                            ? publicHolidayType?.Position_ID
                            : [],
                        Pay_HolidayType: publicHolidayType?.Pay_HolidayType,
                        FinancialYear_ID: currentFinancial?.value,
                    }
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
            DataTable
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
        const payload = { data: modifiedData }

        console.log(payload)

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
                        // @ts-ignore
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
                isWrite={true}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="publicHoliday"
            />

            {copy && !activeData ? (
                <CopyFrame load={load} />
            ) : (
                <>
                    <DataTable
                        columns={columns}
                        loading={loadError}
                        handleRemoveClick={(id)=>{
                          console.log({id})
                        }}
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
