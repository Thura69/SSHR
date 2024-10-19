'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination-v4'
import { DataTable } from '@/components/employee/forms/data-table-employee'
import { columns } from './column-def'
import TableFrameFilter from '@/components/common/table/table-frame-filter'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import JobOpeningFilter from './jobopening-filter'

const modifiedData = [
    {
        id: 1,
        codeNo: 'J123456',
        jobTitle: 'UI/UX Designer',
        noOfPosition: 20,
        positionFill: 5,
        targetHiring: '12/02/2024',
        status: 'Published',
    },
    {
        id: 2,
        codeNo: 'J123456',
        jobTitle: 'UI/UX Designer',
        noOfPosition: 20,
        positionFill: 5,
        targetHiring: '12/02/2024',
        status: 'Published',
    },
    {
        id: 3,
        codeNo: 'J123456',
        jobTitle: 'UI/UX Designer',
        noOfPosition: 20,
        positionFill: 5,
        targetHiring: '12/02/2024',
        status: 'Published',
    },
    {
        id: 4,
        codeNo: 'J123456',
        jobTitle: 'UI/UX Designer',
        noOfPosition: 20,
        positionFill: 5,
        targetHiring: '12/02/2024',
        status: 'Published',
    },
    {
        id: 5,
        codeNo: 'J123456',
        jobTitle: 'UI/UX Designer',
        noOfPosition: 20,
        positionFill: 5,
        targetHiring: '12/02/2024',
        status: 'Published',
    },
]

const MainPage = () => {
    const router = useRouter()
    const [open, setOpen] = useState('open')

    const handleClick = () => {
        router.push('/recruitment/job-opening/add-job-opening')
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
                        title: 'Job Opening',
                        href: '/recruitment/job-opening',
                    },
                ]}
            />
            <TableFrameFilter
                isWrite={true}
                isOutline
                viewCareers
                subTitle={false}
                embedCode
                download={false}
                modalTrue={handleClick}
                language="jobOpening"
                setOpen={setOpen}
                open={open}
            />
            <JobOpeningFilter open={open} setOpen={setOpen} />
            <DataTable
                className={'with-action-employee-column'}
                columns={columns}
                height=""
                loading={false}
                data={modifiedData || []}
            />
            <Paging currentPage={1} perPage={8} totalCount={80} />
        </section>
    )
}

export default MainPage
