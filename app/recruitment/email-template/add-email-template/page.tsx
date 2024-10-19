'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import EmailTemplateForm from '@/components/recruitment-management/email-template/form'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

const Page = () => {
    const { id } = useParams()
    const { t } = useTranslation('emailTemplate')

    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
                segments={[
                    {
                        title: t('recruitment'),
                        href: '/organisation-structure',
                    },
                    {
                        title: t('emailTemplate'),
                        href: '/organisation-structure/department',
                    },
                    {
                        title: t('addEmailTemplate'),
                        href: `/organisation-structure/department/department-setting/${id}`,
                    },
                ]}
            />
            <div className=" w-full max-w-full  overflow-auto  setting-data-table">
                <div className="flex   my-4 items-start justify-between">
                    <div className="">
                    <h2 className="font-bold  text-primary-500 text:xl sm:text-2xl">
                        {t('add')}
                    </h2>
                    </div>
                </div>
            </div>
            {/* <EmailTemplateForm /> */}
        </section>
    )
}

export default Page
