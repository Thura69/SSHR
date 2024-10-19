'use client'
import useUserCookie from '@/hooks/use-user'
import React, { useEffect, useMemo } from 'react'
import { useBoolean } from 'usehooks-ts'
import useMenu from '@/state/zustand/menu'
import { getAudit } from '@/lib/audit-trail-api'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { useTranslation } from 'react-i18next'
import TableFrame from '@/components/common/table/table-frame'
import { DataTable } from '@/components/data-table/data-table-two'
import { columns } from './column-def'
import Paging from '@/components/common/pagers/pagination'
import CodeGeneratorModal from './code-generator-modal'
import { useGetAllCodeGenerators } from '@/service/query-hooks/setting/use-codeGenerator'
import { CodeGeneratorType } from '@/types/setting/code-generator-type'

const CodeGeneratorList = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const user = useUserCookie()
    const { selectedMenuId, selectedMenu, selectedGrandSubMenu } = useMenu()
    const { data: codeGeneratorData, isLoading } = useGetAllCodeGenerators()
    const { t } = useTranslation('codeGenerator')

    console.log({ codeGeneratorData })

    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.employee_name!,
    //     Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
    //     Parent_Menu_ID: selectedMenuId!,
    //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
    //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    // }

    const memeData = useMemo(() => codeGeneratorData, [codeGeneratorData])

    // useEffect(() => {
    //     if (codeGeneratorData?.data) {
    //         getAudit({
    //             ...auditPayload,
    //             Detail: codeGeneratorData.data,
    //             Record_Name: selectedGrandSubMenu?.menu_name!,
    //         })
    //     }
    // }, [memeData]);

    const meta = codeGeneratorData?.meta
    const modifiedData = memeData?.data.map(
        (codeGeneratorTypeData: CodeGeneratorType) => {
            return {
                id: codeGeneratorTypeData?.prefix_id,
                positionType: codeGeneratorTypeData?.type,
                serialNo: codeGeneratorTypeData?.serial_no,
                prefix: codeGeneratorTypeData?.prefix,
                format: codeGeneratorTypeData?.format,
                generateCode: codeGeneratorTypeData?.generate_new_code,
                remark: codeGeneratorTypeData?.remark,
                employeeStatue: codeGeneratorTypeData?.employment_statuses,
                employeeStatusName:
                    codeGeneratorTypeData?.employment_status_name,
            }
        },
    )

    const hideActionBtn =
        selectedGrandSubMenu?.is_edit && selectedGrandSubMenu?.is_delete

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
                modalTrue={() => setTrue()}
                language="codeGenerator"
            />
            <DataTable
                className={'with-action-column'}
                columns={columns}
                loading={isLoading}
                data={modifiedData || []}
            />
            {meta?.totalCount > 0 && memeData?.data?.length !== 0 && (
                <Paging
                    currentPage={meta?.current_page}
                    perPage={meta?.per_page}
                    totalCount={meta?.total_count}
                />
            )}
            <CodeGeneratorModal
                title={`${t('modalTitle')}`}
                toggle={toggle}
                open={value}
            />
        </section>
    )
}

export default CodeGeneratorList
