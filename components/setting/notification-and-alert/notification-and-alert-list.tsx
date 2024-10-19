'use client'
import TableFrame from '@/components/common/table/table-frame'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import React, { useEffect, useMemo } from 'react'
import useMenu from '@/state/zustand/menu'
import NotificationAndAlertCards from './notification-and-alert-cards'
import { useGetAllNotification } from '@/service/query-hooks/setting/use-notificationAndAlert'
import useUserCookie from '@/hooks/use-user'
import { getAudit } from '@/lib/audit-trail-api'
import { Skeleton } from 'antd'

const NotificationAndAlertList = () => {
    const { selectedMenuId, selectedMenu, selectedGrandSubMenu } = useMenu()
    const { isLoading, data: notificationData } = useGetAllNotification()
    const user = useUserCookie()

    const memorizedData = useMemo(() => notificationData, [notificationData]);



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
                isWrite={false}
                subTitle={true}
                language="notificationAndAlert"
                modalTrue={() => {}}
            />
            {!isLoading ? (
                <NotificationAndAlertCards data={memorizedData?.data[0]} />
            ) : (
                <>
                    <Skeleton className="w-full h-[300px]" />
                    <Skeleton className="w-full h-[300px]" />
                </>
            )}
        </section>
    )
}

export default NotificationAndAlertList
