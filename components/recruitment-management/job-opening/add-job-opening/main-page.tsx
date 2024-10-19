'use client'
import { Stepper } from '@/components/common/form/stepper'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { JobInformationForm } from './job-information-form'
import { JobDetailForm } from './job-detail-form'
import { HiringManagerForm } from './hiring-manager'
import { useSearchParams } from 'next/navigation'

export const MainPage = () => {
    const searchParams = useSearchParams()
    const detail = searchParams.get('detail')

    const tabs = [
        {
            value: 'jobInformation',
            label: 'Job Information',
            position: 'right',
        },
        { value: 'jobDetails', label: 'Job Details', position: 'middle' },
        {
            value: 'hiringInformation',
            label: 'Hiring Information',
            position: 'left',
        },
    ]

    const tabContentMapping = {
        jobInformation: <JobInformationForm detail={detail ? true : false} />,
        jobDetails: <JobDetailForm detail={detail ? true : false} />,
        hiringInformation: <HiringManagerForm />,
    }

    return (
        <section className="   p-4 px-6">
            <Breadcrumbs
                segments={[
                    {
                        title: 'Recruitment',
                        href: `/recruitment`,
                    },
                    {
                        // @ts-ignore
                        title: 'Job Opening',
                        href: '/recruitment/job-opening/',
                    },
                    {
                        // @ts-ignore
                        title: 'Job Opening Information',
                        href: '/job-opening-information',
                    },
                ]}
            />
            <Stepper tabContentMapping={tabContentMapping} tabs={tabs} />
        </section>
    )
}
