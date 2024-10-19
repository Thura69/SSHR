'use client'
import { DataTable } from '@/components/data-table/data-table-two'
import { columns } from './column-def'
import Paging from '@/components/common/pagers/pagination'
import useUserCookie from '@/hooks/use-user'
import menuStore from '@/state/zustand/menu'

import { useEffect, useMemo } from 'react'
import { getAudit } from '@/lib/audit-trail-api'
import { useGetAllPosition } from '@/service/query-hooks/setting/use-position'

const PositionListPagi = () => {
    const { data: positionData, isError, isLoading } = useGetAllPosition()
    const { selectedMenuId, selectedGrandSubMenu } = menuStore((state) => state)
    const user = useUserCookie()
    const memorizedData = useMemo(() => positionData, [positionData])
    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: 'Position Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

    useEffect(() => {
        if (positionData) {
            getAudit({
                ...auditPayload,
                Detail: positionData.data,
                Record_Name: 'Positions',
            })
        }
    }, [memorizedData])

    if (isError) return <div>Error ....</div>

    const meta = positionData?.meta
    const modifiedData = positionData?.data?.map((position: any) => {
        return {
            name: position.position_name,
            status: position.is_active,
            id: position.position_id,
            totalEmployees: position.totalEmployees,
            jobCategory_Name: position.jobCategory,
        }
    })

    return (
        <>
            <DataTable
                columns={columns}
                data={modifiedData || []}
                loading={isLoading}
            />
            {meta?.totalCount > 0 && memorizedData?.data?.length !== 0 && (
                <Paging
                    currentPage={meta?.currentPage}
                    perPage={meta?.perPage}
                    totalCount={meta?.totalCount}
                />
            )}
        </>
    )
}

export default PositionListPagi

// Here
