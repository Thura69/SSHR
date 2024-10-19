'use client'
import CurrencyModalType from '@/components/setting/currency/currency-modal'
import { columns } from '@/components/setting/currency/currency-table-columns'
import TableFrame from '@/components/common/table/table-frame'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination'
import { DataTable } from '@/components/data-table/data-table'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'
import useUserCookie from '@/hooks/use-user'
import { getAudit } from '@/lib/audit-trail-api'
import { useGetAllCurrency } from '@/service/query-hooks/setting/use-currency'
import useMenu from '@/state/zustand/menu'
import { CurrencyType } from '@/types/setting/currency'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'

function page() {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('currency')
    const { data: currenciesData, isLoading } = useGetAllCurrency()

    const memorizedData = useMemo(() => currenciesData, [currenciesData])

    const { selectedMenuId,selectedGrandSubMenu,selectedMenu } = useMenu((state) => state)
    const pathname = usePathname()
    const realPathname = pathname

    // menu permission
    const currentGrandSubMenu = useLegitGrandSub(realPathname)

    const user = useUserCookie()

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

    const handleModalOpen = () => {
        setTrue()
    }

    useEffect(() => {
        if (currenciesData) {
            getAudit({
                ...auditPayload,
                Detail: currenciesData.data,
                Record_Name: selectedGrandSubMenu?.menu_name!,
            })
        }
    }, [memorizedData])

    const meta = currenciesData?.meta
    const modifiedData = currenciesData?.data.map(
        (currencyData: CurrencyType) => {
            return {
                id: currencyData.Currency_ID,
                currencyType: currencyData?.CurrencyType,
                description: currencyData?.Description,
                default: currencyData?.Default_Currency,
            }
        },
    )

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
                isWrite={currentGrandSubMenu?.is_write ?? false}
                subTitle={false}
                modalTrue={handleModalOpen}
                language="currency"
            />
            {/* <div className='py-6 w-full max-w-full overflow-auto setting-data-table'>
        <div className='flex justify-between mb-4'>
       <div>
       <h2 className="font-bold text-2xl">{t('title')}</h2>
          <p className='text-gray-400 text-sm'>{t('subTitle')}</p>
       </div>

       {
        currentGrandSubMenu?.IsWrite &&   <Button
        size={'md'}
        variant={'primary'}
        className='font-normal gap-1 text-sm'
        onClick={handleModalOpen}
        >
        <PlusIcon className='size-4'/>
        <span>{t('addNew')}</span>
        </Button>
       }
      
        </div>

        </div> */}
            <DataTable
                className={'with-select with-action-column'}
                columns={columns}
                loading={isLoading}
                data={modifiedData || []}
            />
            {meta?.totalCount > 0 && (
                <Paging
                    currentPage={meta?.currentPage}
                    perPage={meta?.perPage}
                    totalCount={meta?.totalCount}
                />
            )}

            <CurrencyModalType
                title={`${t('modalTitle')}`}
                toggle={toggle}
                open={value}
            />
        </section>
    )
}

export default page
