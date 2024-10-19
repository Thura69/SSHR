'use client'
import TableFrame from '@/components/common/table/table-frame'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import useUserCookie from '@/hooks/use-user'
import { useGetAllDeviceSetups } from '@/service/query-hooks/setting/use-deviceSetup'
import React, { useEffect, useMemo } from 'react'
import useMenu from '@/state/zustand/menu'
import { getAudit } from '@/lib/audit-trail-api'
import {
    DeviceSetUpColumnDefType,
    DeviceSetUpType,
} from '@/types/setting/device-setup-types'
import Paging from '@/components/common/pagers/pagination'
import { DataTable } from '@/components/data-table/data-table-two'
import { columns } from './column-def'
import { usePathname, useRouter } from 'next/navigation'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'

function DeviceSetupList() {
    const { isLoading, data: devices, isError } = useGetAllDeviceSetups()
    const { selectedMenuId, selectedMenu, selectedGrandSubMenu } = useMenu()
    const user = useUserCookie()
    const router = useRouter()

    console.log("343434")
    console.log(devices)
    console.log("343434")


    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.employee_name!,
    //     Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
    //     Parent_Menu_ID: selectedMenuId!,
    //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
    //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    // }

    //permission
    const pathname = usePathname()

    //permission hook
    const currentGrandSubMenu = useLegitGrandSub(pathname)

    const memorizedData: any = useMemo(() => devices, [devices])

    console.log("1212")
    console.log(devices)
    console.log("1212")

    const hideActionBtn =
        currentGrandSubMenu?.is_edit && currentGrandSubMenu?.is_delete

    // useEffect(() => {
    //     if (devices?.data.length > 0) {
    //         getAudit({
    //             ...auditPayload,
    //             Detail: devices.data,
    //             Record_Name: selectedGrandSubMenu?.menu_name!,
    //         })
    //     }
    // }, [memorizedData])

    const meta = devices?.meta
    const modifiedData: DeviceSetUpColumnDefType[] =
        memorizedData?.data.length > 0 &&
        memorizedData?.data?.map((deviceSetup: DeviceSetUpType) => {
            return {
                id: deviceSetup.device_id,
                deviceName: deviceSetup.device_name,
                deviceNo: deviceSetup.device_number,
                model: deviceSetup.model,
                connectionType: deviceSetup.connection_type,
                baudRate: deviceSetup.baud_rate,
                ipAddress: deviceSetup.ip_address,
                isActive: deviceSetup.is_active,
                mode: deviceSetup.mode,
                portNumber: deviceSetup.port_number,
                interval: deviceSetup.interval,
                password: deviceSetup.password,
                allowMealAllowance: deviceSetup.allow_meal_allowance,
            }
        })

    const handleNavigateAddNew = () => {
        router.push('/settings/device-setup/device-setup-setting')
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
                isWrite={currentGrandSubMenu?.is_write!}
                subTitle={false}
                language="deviceSetup"
                modalTrue={handleNavigateAddNew}
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
        </section>
    )
}

export default DeviceSetupList
