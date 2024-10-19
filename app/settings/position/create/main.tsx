'use client'

import PageLoader from '@/components/common/loaders/page-loader'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import {
    useGetAllDistDepart,
    useGetAllJobCategoriesDistict,
} from '@/service/query-hooks/setting/use-distnct'
import menuStore from '@/state/zustand/menu'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

const PositionForm = dynamic(
    () => import('@/components/setting/position/position-form'),
    {
        ssr: false,
        loading: () => <PageLoader />,
    },
)

const CreatePositionPage = () => {
    const {
        data: dept,
        isLoading: isLoadingDept,
        isError: isDeptErr,
    } = useGetAllDistDepart()

    const {
        data: jobCat,
        isLoading: isLoadingJob,
        isError: isJobErr,
    } = useGetAllJobCategoriesDistict()

    const { selectedGrandSubMenu, selectedMenu } = menuStore()
    const { t } = useTranslation('position')

    if (isDeptErr || isJobErr) {
        return <div>Error fetching dept or jobcat datas</div>
    }
    if (isLoadingDept || isLoadingJob) {
        return <PageLoader />
    }

    const depDatas = dept?.data?.map((dep: any) => ({
        value: dep.department_id,
        label: dep.department_name,
    }))

    const jobCatDatas = jobCat?.data?.map((job: any) => ({
        value: job.job_category_id,
        label: job.job_category_name,
    }))


    return (
        <div className=" p-4 px-6 space-y-4">
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
                        href: '/settings/position',
                    },
                    {
                        // @ts-ignore
                        title: t('newEntry'),
                        href: '',
                    },
                ]}
            />
            <h2 className="font-bold text-2xl">{t('newEntry')}</h2>
            <PositionForm depData={depDatas} jobCatData={jobCatDatas} />
        </div>
    )
}

export default CreatePositionPage
