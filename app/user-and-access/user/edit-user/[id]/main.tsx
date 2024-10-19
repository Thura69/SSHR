'use client'

import isAuth from '@/components/auth/components/protected-route'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { EditUserForm } from '@/components/user-and-access/components/edit-user-form'
import { useFetchUser } from '@/service/query-hooks/user-and-access/user/use-user'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const EditUser = ({ params }: { params: { id: string } }) => {
    const { t } = useTranslation('user')
    
    const {
        data,
        isLoading: userFetchLoading,
    } = useFetchUser({ employee_id: params.id });


    const memorizedData = useMemo(
        () => data?.data,
        [data?.data, userFetchLoading],
    )


    console.log("this is data",data)

  
    return (
        <section className="p-4">
            <Breadcrumbs
                segments={[
                    {
                        title: t('breadcrumb.first'),
                        href: '/user-and-access/user',
                    },
                    {
                        title: t('breadcrumb.second'),
                        href: '/user-and-access/user',
                    },
                    {
                        title: t('breadcrumb.edit'),
                        href: '/user-and-access/user/edit-user',
                    },
                ]}
            >
                {' '}
            </Breadcrumbs>
            <h1 className="text-2xl font-bold text-left pb-2">Edit User</h1>
            <EditUserForm id={params.id} data={memorizedData} />
        </section>
    )
}

export default isAuth(EditUser)
