'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import DepartmentForm from '@/components/organisation-structure/department/department-form'
import { useGetOneDepartment } from '@/service/query-hooks/organisation-structure/use-department'
import { useParams } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

const page = ()=> {
    const { isError, isPending, getById } = useGetOneDepartment()
    const { id } = useParams()
    const {t} = useTranslation('department')

    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
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
                        title: t('editRecord'),
                        href: `/organisation-structure/department/department-setting/${id}`,
                    },
                ]}
            />
            <div className=" w-full max-w-full  overflow-auto  setting-data-table">
            <div className="flex   my-4 items-start justify-between">
                <div className="">
                    <h2 className="font-bold text:xl sm:text-2xl">
                        {t('editRecord')}
                    </h2>
                </div>
            </div>
        </div>
            <DepartmentForm id={id} />
        </section>
    )
}

export default page
