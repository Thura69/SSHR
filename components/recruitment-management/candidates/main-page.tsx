'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { useBoolean } from 'usehooks-ts'
import { useState } from 'react'
import TableFrameFilter from '@/components/common/table/table-frame-filter'
import CandidateFilter from './candidate-filter'
import { DataTable } from '@/components/employee/forms/data-table-employee'
import { columns } from './column-def'
import Paging from '@/components/common/pagers/pagination-v4'
import { useRouter } from 'next/navigation'


const modifiedData = [
    {
        id: 1,
        codeNo: 'EMP 123456',
        candidateName: 'Emily',
        jobTitle: 'UI/UX Designer',
        internalExternal: 'Internal',
        screeningStage: 'Phone Screening Stage',
        rating: 4,
        status: false,
    },
    {
        id: 2,
        codeNo: 'EMP 123456',
        candidateName: 'Emily',
        jobTitle: 'UI/UX Designer',
        internalExternal: 'Internal',
        screeningStage: 'Phone Screening Stage',
        rating: 4,
        status: false,
    },
    {
        id: 3,
        codeNo: 'EMP 123456',
        candidateName: 'Emily',
        jobTitle: 'UI/UX Designer',
        internalExternal: 'Internal',
        screeningStage: 'Phone Screening Stage',
        rating: 4,
        status: false,
    },
    {
        id: 4,
        codeNo: 'EMP 123456',
        candidateName: 'Emily',
        jobTitle: 'UI/UX Designer',
        internalExternal: 'Internal',
        screeningStage: 'Phone Screening Stage',
        rating: 4,
        status: false,
    },
    {
        id: 5,
        codeNo: 'EMP 123456',
        candidateName: 'Emily',
        jobTitle: 'UI/UX Designer',
        internalExternal: 'Internal',
        screeningStage: 'Phone Screening Stage',
        rating: 4,
        status: false,
    },
]

const MainPage = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const [open, setOpen] = useState('open')
    const router = useRouter()

    const handleClick = () => {
        router.push('/recruitment/candidates/add-candidates')
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
                        title: 'Candidate',
                        href: '/recruitment/candidates',
                    },
                ]}
            />

            <TableFrameFilter
                isWrite={true}
                isOutline
                subTitle={false}
                download={true}
                modalTrue={handleClick}
                language="candidates"
                setOpen={setOpen}
                open={open}
            />
            <CandidateFilter open={open} setOpen={setOpen} />

            <DataTable
                className={'with-action-employee-column'}
                columns={columns}
                height="h-auto"
                loading={false}
                data={modifiedData || []}
            />
            <Paging currentPage={1} perPage={8} totalCount={80} />
        </section>
    )
}

export default MainPage
