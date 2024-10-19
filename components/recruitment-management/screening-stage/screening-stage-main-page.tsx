'use client'
import React, { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'
import TableFrame from '@/components/common/table/table-frame'
import { columns } from './screening-columndef'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import ScreenForm from './screen-form'
import { DataTable } from '@/components/employee/forms/data-expand-table'
import { ColorPicker } from 'antd'
import Paging from '@/components/common/pagers/pagination-v4'

// screenStaging

const modifiedData = [
    {
        id: 1,
        name: 'Phone Screening',
        color: '#1CBCC8',
        active: false,
        stages: [
            {
                id: 1.1,
                name: 'Phone Varient 1',
                color: null,
                active: false,
            },
            {
                id: 1.2,
                name: 'Phone Varient 2',
                color: null,
                active: false,
            },
            {
                id: 1.3,
                name: 'Phone Varient 3',
                color: null,
                active: false,
            },
        ],
    },
    {
        id: 2,
        name: 'Phone Screening',
        color: '#1CBCC8',
        active: true,
        stages: [
            {
                id: 2.1,
                name: 'Phone Varient 1',
                color: null,
                active: false,
            },
            {
                id: 2.2,
                name: 'Phone Varient 2',
                color: null,
                active: false,
            },
            {
                id: 2.3,
                name: 'Phone Varient 3',
                color: null,
                active: false,
            },
        ],
    },
    {
        id: 3,
        name: 'Phone Screening',
        color: '#1CBCC8',
        active: true,
        stages: [
            {
                id: 3.1,
                name: 'Phone Varient 1',
                color: null,
                active: false,
            },
            {
                id: 3.2,
                name: 'Phone Varient 2',
                color: null,
                active: false,
            },
            {
                id: 3.3,
                name: 'Phone Varient 3',
                color: null,
                active: false,
            },
        ],
    },
    {
        id: 4,
        name: 'Phone Screening',
        color: '#1CBCC8',
        active: false,
        stages: [
            {
                id: 4.1,
                name: 'Phone Varient 1',
                color: null,
                active: false,
            },
            {
                id: 4.2,
                name: 'Phone Varient 2',
                color: null,
                active: false,
            },
            {
                id: 4.3,
                name: 'Phone Varient 3',
                color: null,
                active: false,
            },
        ],
    },
    {
        id: 5,
        name: 'Phone Screening',
        color: '#1CBCC8',
        active: true,
        stages: [
            {
                id: 5.1,
                name: 'Phone Varient 1',
                color: null,
                active: false,
            },
            {
                id: 5.2,
                name: 'Phone Varient 2',
                color: null,
                active: false,
            },
            {
                id: 5.3,
                name: 'Phone Varient 3',
                color: null,
                active: false,
            },
        ],
    },
]

const Screenstagemain = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('screenStaging')
    const [data, setData] = useState(modifiedData)

    return (
        <section className="w-full p-4 px-6">
            <TableFrame
                isOutline
                isWrite
                subTitle={false}
                modalTrue={() => setTrue()}
                language="screenStaging"
            />
            <DataTable
                className={'with-action-employee-column'}
                data={modifiedData || []}
                setData={setData}
                columns={columns}
                loading={false}
            />
            <Paging currentPage={1} perPage={10} totalCount={30} />
            <EmployeeModal
                title={`${t('add')}`}
                modelRatio=""
                editMode={false}
                open={value}
                toggle={toggle}
                form={<ScreenForm toggle={toggle} />}
            />
        </section>
    )
}

export default Screenstagemain
