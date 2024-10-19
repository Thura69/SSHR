'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { PlusIcon } from 'lucide-react'
import '../setting.css'
import menuStore from '@/state/zustand/menu'
import PositionListPagi from './position-list-pagi'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

type PropTypes = {
    // title: string;
}

const PositionList: React.FC<PropTypes> = () => {
    const { t } = useTranslation('position');
    const router = useRouter()
    const { selectedGrandSubMenu, selectedMenu } = menuStore((state) => state)

    const routeToCreate = () => {
        router.push('/settings/position/create')
    }

    return (
        <section className="w-full p-4 px-6">
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
                        href: '',
                    },
                ]}
            />
            <div className="py-6 w-full max-w-full overflow-auto setting-data-table">
                <div className="flex justify-between mb-4">
                    <h2 className="font-bold text-2xl">{t('title')}</h2>
                    {selectedGrandSubMenu?.is_write && (
                        <Button
                            variant="primary"
                            className="font-normal gap-1 text-sm"
                            onClick={routeToCreate}
                        >
                            <PlusIcon className="size-4" />
                            <span className="hidden sm:inline-block">
                                {t('addNew')}
                            </span>
                        </Button>
                    )}
                </div>
                <PositionListPagi />
            </div>
        </section>
    )
}

export default PositionList
