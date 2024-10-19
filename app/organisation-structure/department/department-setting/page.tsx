'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import TableFrame from '@/components/common/table/table-frame'
import DepartmentForm from '@/components/organisation-structure/department/department-form'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'


const page = () => {
    const {t} = useTranslation('department')
    const isMobile = useMediaQuery('(max-width:480px)')
    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
                  truncationLength={isMobile ? 4 : 0}
                segments={[
                    {
                        title: t('structure'),
                        href: '/organisation-structure',
                    },
                    {
                        title: t('title'),
                        href: '/organisation-structure/department',
                    },
                    {
                        title: t('newEntry'),
                        href: `/organisation-structure/department/department-setting`,
                    },
                ]}
            />
           <div className=" w-full max-w-full  overflow-auto  setting-data-table">
            <div className="flex   my-4 items-start justify-between">
                <div className="">
                    <h2 className="font-bold text-primary-500 text:xl sm:text-2xl">
                        {t('newEntry')}
                    </h2>
                </div>
            </div>
        </div>
            <DepartmentForm />
        </section>
    )
}

export default page
