'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import React from 'react'
import DeviceSetupForm from './components/device-setup-form'
import { useTranslation } from 'react-i18next'

const page = ()=> {
    const {t} = useTranslation('deviceSetup')
    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
                segments={[
                    { title: t('setting'), href: '/settings' },
                    { title: t('title'), href: '/settings/device-setup' },
                    {
                        title: t('modalTitle'),
                        href: '/settings/device-setup/device-setup-setting',
                    },
                ]}
            />
            
            <div className=" w-full max-w-full  overflow-auto  setting-data-table">
            <div className="flex   my-4 items-start justify-between">
                    <h2 className="font-bold text:xl sm:text-2xl">
                        {t('modalTitle')}
                    </h2>
                    </div>
        </div>

            <DeviceSetupForm editMode={false} />
        </section>
    )
}

export default page
