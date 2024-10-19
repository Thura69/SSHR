'use client'
import { columns } from '@/components/setting/vaccine/vaccine-columns'

import TableFrame from '@/components/common/table/table-frame'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination'
import { DataTable } from '@/components/data-table/data-table-two'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'
import useUserCookie from '@/hooks/use-user'
import { getAudit } from '@/lib/audit-trail-api'
import { useGetAllVaccine } from '@/service/query-hooks/setting/use-vaccine'
import useMenu from '@/state/zustand/menu'
import { VaccineType } from '@/types/setting/vaccine-type'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import isAuth from '@/components/auth/components/protected-route'
import VaccineModal from '@/components/setting/vaccine/vaccine-modal'

const page = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { data: vaccineData, isLoading } = useGetAllVaccine()
    const { selectedMenuId, selectedGrandSubMenu, selectedMenu } = useMenu(
        (state) => state,
    )

    //permission
    const pathname = usePathname()

    //permission hook
    const currentGrandSubMenu = useLegitGrandSub(pathname)

    const { t } = useTranslation('vaccine')
    const user = useUserCookie()

    const memorizedDta = useMemo(() => vaccineData, [vaccineData])

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
        if (vaccineData?.data) {
            getAudit({
                ...auditPayload,
                Detail: vaccineData.data,
                Record_Name: selectedGrandSubMenu?.menu_name!,
            })
        }
    }, [memorizedDta])

    useEffect(() => {
        if (vaccineData?.data) {
            getAudit({
                ...auditPayload,
                Detail: vaccineData.data,
                Record_Name: 'Vaccine',
            })
        }
    }, [memorizedDta])

    const meta = vaccineData?.meta
    const modifiedData = vaccineData?.data?.map(
        (vaccineTypeData: VaccineType) => {
            return {
                id: vaccineTypeData.vaccine_id,
                vaccineTypeId: vaccineTypeData.vaccine_type_id,
                name: vaccineTypeData.vaccine_name,
                description: vaccineTypeData.description,
                status: vaccineTypeData.is_active,
                vaccineTypeName: vaccineTypeData.vaccine_type_name,
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
                language="vaccine"
            />
            <DataTable
                className={'with-action-column'}
                columns={columns}
                loading={isLoading}
                data={modifiedData || []}
            />
            {meta?.totalCount > 0 && modifiedData && (
                <Paging
                    currentPage={meta?.currentPage}
                    perPage={meta?.perPage}
                    totalCount={meta?.totalCount}
                />
            )}
            <VaccineModal
                title={`${t('modalTitle')}`}
                toggle={toggle}
                open={value}
            />
        </section>
    )
}

export default isAuth(page)
