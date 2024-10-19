'use client'
import { useBoolean } from 'usehooks-ts'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import TableFrameFilter from '@/components/common/table/table-frame-filter'
import InterviewEvaluationFilter from './interviewEvaluationFilter'
import { DataTable } from '@/components/employee/forms/data-table-employee'
import Paging from '@/components/common/pagers/pagination'
import { columns } from './column-def'

const modifiedData = [
    {
        id: 1,
        jobTitle: 'UI/UX Designer',
        candidateName: 'Jaylon Gouse',
        screeningStage: 'Phone Screening',
        hiringManager: [
            {
                id: 1,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
            {
                id: 2,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
            {
                id: 3,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
        ],
        rating: 4,
        nextScreeningStage: 'Other Stage',
    },
    {
        id: 2,
        jobTitle: 'UI/UX Designer',
        candidateName: 'Jaylon Gouse',
        screeningStage: 'Phone Screening',
        hiringManager: [
            {
                id: 1,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
            {
                id: 2,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
            {
                id: 3,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
        ],
        rating: 4,
        nextScreeningStage: 'Other Stage',
    },
    {
        id: 3,
        jobTitle: 'UI/UX Designer',
        candidateName: 'Jaylon Gouse',
        screeningStage: 'Phone Screening',
        hiringManager: [
            {
                id: 1,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
            {
                id: 2,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
            {
                id: 3,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
        ],
        rating: 4,
        nextScreeningStage: 'Other Stage',
    },
    {
        id: 4,
        jobTitle: 'UI/UX Designer',
        candidateName: 'Jaylon Gouse',
        screeningStage: 'Phone Screening',
        hiringManager: [
            {
                id: 1,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
            {
                id: 2,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
            {
                id: 3,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
        ],
        rating: 4,
        nextScreeningStage: 'Other Stage',
    },
    {
        id: 5,
        jobTitle: 'UI/UX Designer',
        candidateName: 'Jaylon Gouse',
        screeningStage: 'Phone Screening',
        hiringManager: [
            {
                id: 1,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
            {
                id: 2,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
            {
                id: 3,
                img: 'https://images.unsplash.com/photo-1722570307342-fd87a3a5dbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D',
                status: 'fine',
            },
        ],
        rating: 4,
        nextScreeningStage: 'Other Stage',
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
                        title: 'Interview Evaluation',
                        href: '/recruitment/interview-evaluation',
                    },
                ]}
            />
            <TableFrameFilter
                isWrite={true}
                isOutline
                subTitle={false}
                download={true}
                modalTrue={handleClick}
                language="interviewEvaluation"
                setOpen={setOpen}
                open={open}
            />
            {/* <InterviewEvaluationFilter open={open} setOpen={setOpen} /> */}
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
