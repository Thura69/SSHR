'use client'

import isAuth from '@/components/auth/components/protected-route'
import FinancialModal from '@/components/setting/financial-year/financial-modal'
import { columns } from '@/components/setting/financial-year/financial-table-columns'
import TableFrame from '@/components/common/table/table-frame'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination'
import { DataTable } from '@/components/data-table/data-table-two'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'
import useUserCookie from '@/hooks/use-user'
import { getAudit } from '@/lib/audit-trail-api'
import { formatGivenDate } from '@/lib/utils'
import { useGetAllFinancialYear } from '@/service/query-hooks/setting/use-financial-year'
import useMenu from '@/state/zustand/menu'
import { financialYearType } from '@/types/setting/financial-year-type'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import EmployeeHeader from '@/components/employee/employee-header'

function Page() {
    const { value, toggle, setTrue } = useBoolean(false)

    const { data: financialYearData, isLoading } = useGetAllFinancialYear()

    const memorizedData = useMemo(() => financialYearData, [financialYearData])

    const { selectedMenuId, selectedMenu, selectedGrandSubMenu } = useMenu(
        (state) => state,
    )

    const pathname = usePathname()
    const realPathname = pathname

    // menu permission
    const currentGrandSubMenu = useLegitGrandSub(realPathname)

    const user = useUserCookie()

    const { t } = useTranslation('financialYear')

    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.employee_name!,
    //     Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
    //     Parent_Menu_ID: selectedMenuId!,
    //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
    //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    // }

    const handleModalOpen = () => {
        setTrue()
    }

    useEffect(() => {
        if (financialYearData?.data) {
            // getAudit({
            //     ...auditPayload,
            //     Detail: financialYearData.data,
            //     Record_Name: selectedGrandSubMenu?.menu_name!,
            // })
        }
    }, [memorizedData])

    const meta = financialYearData?.meta

    const modifiedData = financialYearData?.data.map(
        (financialYearData: financialYearType) => {
            return {
                id: financialYearData.financial_year_id,
                financial: financialYearData.financial_year_name,
                calendar: `From (${formatGivenDate(financialYearData.calendar_year_from_date)}) To (${formatGivenDate(financialYearData.calendar_year_to_date)})`,
                financialyear: `From (${formatGivenDate(financialYearData.financial_year_from_date)}) To (${formatGivenDate(financialYearData.financial_year_to_date)})`,
                country: financialYearData.country_id,
                financialYearName: financialYearData.financial_year_name,
                calendarYearFrom: financialYearData.calendar_year_from_date,
                calendarYearTo: financialYearData.calendar_year_to_date,
                payrollFromDate: financialYearData.financial_year_from_date,
                payrollToDate: financialYearData.financial_year_to_date,
                isActive: financialYearData.is_active,
            }
        },
    )

    return (
        <section className="w-full p-4 px-6 ">
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
                        title: selectedGrandSubMenu?.tbl_menu_language?.[0]
                            ? // @ts-ignore
                              selectedGrandSubMenu?.tbl_menu_language[0]
                                  ?.translated
                            : selectedGrandSubMenu?.menu_name,
                        href: '',
                    },
                ]}
            />
            <TableFrame
                // isWrite={currentGrandSubMenu?.is_write!}
                isWrite={true}
                subTitle={false}
                modalTrue={handleModalOpen}
                language="financialYear"
            />
            <DataTable
                className={'with-action-column'}
                columns={columns}
                loading={isLoading}
                data={modifiedData || []}
            />
            {meta?.totalCount > 0 && memorizedData?.data?.length !== 0 && (
                <Paging
                    currentPage={meta?.currentPage}
                    perPage={meta?.perPage}
                    totalCount={meta?.totalCount}
                />
            )}
            <FinancialModal
                title={`${t('modalTitle')}`}
                editMode={false}
                open={value}
                toggle={toggle}
            />
        </section>
    )
}

export default isAuth(Page)
