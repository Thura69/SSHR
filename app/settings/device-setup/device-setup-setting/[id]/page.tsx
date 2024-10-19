'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import React from 'react'
import DeviceSetupForm from '../components/device-setup-form'
import { useGetOneDeviceSetup } from '@/service/query-hooks/setting/use-deviceSetup'
import { Skeleton } from 'antd'
import { useTranslation } from 'react-i18next'


function page() {
    const {isLoading,deviceDatas} = useGetOneDeviceSetup()
    const {t} = useTranslation('deviceSetup')
        return <section className="w-full p-4 px-6">
        <Breadcrumbs
             segments={[
                { title: t('setting'), href: '/settings' },
                { title: t('title'), href: '/settings/device-setup' },
                {
                    title: t('editRecord'),
                    href: '/settings/device-setup/device-setup-setting',
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
        {
            !isLoading ? (
                <DeviceSetupForm
                editData={deviceDatas?.data || {}} 
                editMode={true}/>
            ):(
                <Skeleton/>
            )
        }
    </section>
    }


export default page
