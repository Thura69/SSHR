import Paging from '@/components/common/pagers/pagination'
import useUserCookie from '@/hooks/use-user'
import { getAudit } from '@/lib/audit-trail-api'
import useMenu from '@/state/zustand/menu'
import React, { useEffect, useMemo } from 'react'
import { DataTable } from '@/components/data-table/data-table-two'
import { columns } from '@/components/setting/common/column-def'
import { useGetAllSetting } from '@/service/query-hooks/setting/use-setting-api'
import { menuMapObj } from '@/service/apis/setting/setting-map-obj'
import { menuTypes } from '@/types/setting'

type Props = {
    menu: menuTypes
}

const SettingTablePagi: React.FC<Props> = ({ menu }) => {
    const { data: respData, isError, isLoading } = useGetAllSetting(menu)
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const user = useUserCookie()
    const memorizedData = useMemo(() => respData, [respData])



    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.employee_name!,
    //     Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
    //     Parent_Menu_ID: selectedMenuId!,
    //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
    //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    // }

    // useEffect(() => {
    //     if (respData) {
    //         getAudit({
    //             ...auditPayload,
    //             Detail: respData.data,
    //             Record_Name: selectedGrandSubMenu?.menu_name!,
    //         })
    //     }
    // }, [memorizedData])

    if (isError) return <div>Error ....</div>

    const meta = respData?.meta
    const fields = menuMapObj[menu]?.fields

    const sortedData = respData?.data

    const modifiedData = sortedData?.map((data: any) => {

        return {
            name: data[fields['name']],
            status: data[fields['isActive']],
            description: data[fields['description']],
            id: data[fields['id']],
        }
    });


    return (
        <>
            <DataTable
                columns={columns}
                data={modifiedData || []}
                loading={isLoading}
            />
            {meta?.total_count > 0 && memorizedData?.data?.length !== 0 && (
                <Paging
                currentPage={meta?.current_page}
                perPage={meta?.per_page}
                totalCount={meta?.total_count}
                />
            )}
        </>
    )
}

export default SettingTablePagi
