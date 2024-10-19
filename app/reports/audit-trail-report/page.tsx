'use client'

import 'react-vertical-timeline-component/style.min.css'
import VerticalSheet from '@/components/vertical-timeline/vertical-sheet'
import VerticalSidebar from '@/components/vertical-timeline/vertical-sidebar'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { useGetAllAuditTrail } from '@/service/query-hooks/use-audit-trails'
import { useCallback, useEffect, useRef } from 'react'
import useMenu from '@/state/zustand/menu'
import useUserCookie from '@/hooks/use-user'
import * as _ from 'lodash'
import VerticalTimelineElement from '@/components/vertical-timeline/vertical-timeline-element'
import isAuth from '@/components/auth/components/protected-route'
import { getAudit } from '@/lib/audit-trail-api'
import PageLoader from '@/components/common/loaders/page-loader'

const VerticalTimelinePage = () => {
    const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
        useGetAllAuditTrail()
    const observer = useRef<IntersectionObserver>()
    const selectedMenuId = useMenu((state) => state.selectedMenuId)
    const selectedSubMenu = useMenu((state) => state.selectedSubMenu)
    const selectedSubMenuId = useMenu((state) => state.selectedSubMenuId)
    const selectedGrandSubMenu = useMenu((state) => state.selectedGrandSubMenu)
    const user = useUserCookie()

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedSubMenuId!,
    }

    const flattenedAuditHistory = _.flatten(
        data?.pages?.map((page: any) => {
            return page?.data
        }),
    )

    useEffect(() => {
        if (data) {
            getAudit({
                ...auditPayload,
                Detail: data,
                Record_Name: selectedSubMenu?.menu_name!,
            })
        }
    }, [data])

    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isLoading) return

            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetching) {
                    fetchNextPage()
                }
            })

            if (node) observer.current.observe(node)
        },
        [fetchNextPage, hasNextPage, isFetching, isLoading],
    )

    return (
        <section
            className="grid grid-cols-1 lg:grid-cols-[6fr_2fr] "
            style={{ height: 'calc(100vh - 65px)' }}
        >
            <div>
                <div className="w-full p-4 px-6 ">
                    <Breadcrumbs
                        segments={[
                            {
                                title: 'Permission and Audit Report',
                                href: '/reports',
                            },
                            {
                                title: 'Audit Trail Report',
                                href: '/reports/audit-trail.ts-report',
                            },
                        ]}
                    />
                    <div className="pt-6 w-full max-w-full  overflow-auto  setting-data-table">
                        <div className="flex justify-between mb-4">
                            <div>
                                <h2 className="font-bold text-2xl">
                                    Audit Trail Report
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-4 p-4 lg:hidden">
                    <VerticalSheet />
                </div>

                <div>
                    {isLoading ? (
                        <PageLoader />
                    ) : (
                        <div
                            className={
                                'h-[calc(100vh_-_200px)] overflow-y-scroll'
                            }
                        >
                            {flattenedAuditHistory?.length > 0 ? (
                                flattenedAuditHistory.map(
                                    (item: any, index: number) => (
                                        <VerticalTimelineElement
                                            ref={lastElementRef}
                                            key={index}
                                            title={item?.Description}
                                            item={item}
                                        />
                                    ),
                                )
                            ) : (
                                <div className="flex justify-center mt-10">
                                    <p>No results.</p>
                                </div>
                            )}

                            {isFetching && (
                                <div>
                                    <p className={'text-center text-xs mt-4'}>
                                        Fetching more data...
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="overflow-y-hidden hidden lg:block">
                <VerticalSidebar />
            </div>
        </section>
    )
}

export default isAuth(VerticalTimelinePage)
