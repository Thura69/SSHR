'use client'
import TableFrame from '@/components/common/table/table-frame'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination'
import { DataTable } from '@/components/data-table/data-table-two'
import { useGetAllDepartments } from '@/service/query-hooks/organisation-structure/use-department'
import useMenu from '@/state/zustand/menu'
import React, { useEffect, useMemo } from 'react'
import { columns } from './column-def'
import { useRouter } from 'next/navigation'
import useUserCookie from '@/hooks/use-user'
import { getAudit } from '@/lib/audit-trail-api'

function DepartmentList() {
    const { isLoading, data: departmentDatas } = useGetAllDepartments()
    const user = useUserCookie()

    const { selectedGrandSubMenu,selectedMenu } =
        useMenu()
    const router = useRouter()

    const memorizedData = useMemo(
        () => departmentDatas?.data,
        [departmentDatas],
    )


    const meta = departmentDatas?.meta;

 


    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.employee_name!,
    //     Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
    //     Parent_Menu_ID: selectedMenuId!,
    //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
    //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    // };

    // useEffect(() => {
    //     if (departmentDatas?.data) {
           

    //         getAudit({
    //             ...auditPayload,
    //             Detail: departmentDatas?.data!,
    //             Record_Name: selectedGrandSubMenu?.menu_name!,
    //         })
    //     }
    // }, [memorizedData])

    const handleClick = () => {
        router.push('/organisation-structure/department/department-setting')
    };

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
                isWrite={selectedGrandSubMenu?.is_write!}
                subTitle={false}
                modalTrue={handleClick}
                language="department"
            />
            <DataTable
                className={'with-action-column'}
                columns={columns}
                loading={isLoading}
                data={departmentDatas?.data || []}
            />
           {(meta?.total_count > 0  && memorizedData?.length !== 0) && (
                <Paging
                    currentPage={meta?.current_page}
                    perPage={meta?.per_page}
                    totalCount={meta?.total_count}
                />
            )}
        </section>
    )
}

export default DepartmentList
