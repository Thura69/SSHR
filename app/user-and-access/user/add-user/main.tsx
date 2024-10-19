'use client'

import isAuth from '@/components/auth/components/protected-route'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { NewUserForm } from '@/components/common/templates'
import { useTranslation } from 'react-i18next'

const AddUser = () => {
    const { t } = useTranslation('user')
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
                        title: t('breadcrumb.register'),
                        href: '/user-and-access/user/add-user',
                    },
                ]}
            >
                {' '}
            </Breadcrumbs>
            <h1 className="text-2xl font-bold text-left pb-2">
                {t('register.title')}
            </h1>
            <NewUserForm />
        </section>
    )
}

export default isAuth(AddUser)
