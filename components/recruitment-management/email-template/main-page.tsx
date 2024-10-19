                          'use client'

import React, { useState } from 'react'
import TableFrame from '@/components/common/table/table-frame'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
//@ts-ignore
import { DataTable } from '@/components/employee/forms/data-table-employee'
import { columns } from './column-def'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import EmailTemplateForm from './form'
import Paging from '@/components/common/pagers/pagination-v4'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { useRouter } from 'next/navigation'

const modifiedData = [
    {
        id: 1,
        templateName: 'Phone Conversation Request',
        templateType: 'HTML Template',
        status: false,
    },
    {
        id: 2,
        templateName: 'Invitation to Interview',
        templateType: 'HTML Template',
        status: true,
    },
    {
        id: 3,
        templateName: 'Regret to Inform',
        templateType: 'Plain Template',
        status: false,
    },
    {
        id: 4,
        templateName: 'Phone Conversation Request',
        templateType: 'Plain Template',
        status: true,
    },
    {
        id: 5,
        templateName: 'Invitation to Interview',
        templateType: 'Plain Template',
        status: true,
    },
]

const   MainPage = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('emailTemplate')
    const [data, setData] = useState(modifiedData)
    const router = useRouter()

    const handleClick = () => {
        router.push('/recruitment/email-template/add-email-template')
    }

    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
                segments={[
                    {
                        title: 'Recruitment',
                        href: `/recruitment`,
                    },
                    {
                        // @ts-ignore
                        title: 'Email Template',
                        href: '/email-template',
                    },
                ]}
            />
            <TableFrame
                isOutline
                isWrite
                subTitle={false}
                modalTrue={handleClick}
                language={'emailTemplate'}
            />

            <DataTable
                className={'with-action-employee-column'}
                data={data || []}
                height=""
                setData={setData}
                columns={columns}
                loading={false}
            />
            <Paging currentPage={1} perPage={8} totalCount={80} />
            {/* <EmployeeModal
                title={`${t('add')}`}
                modelRatio="  min-h-[400px] lg:w-[700px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<EmailTemplateForm toggle={toggle} />}
            /> */}
        </section>
    )
}

export default MainPage
