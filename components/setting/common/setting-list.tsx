'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { PlusIcon } from 'lucide-react'
import SettingModal from '@/components/setting/common/setting-modal'
import { useBoolean } from 'usehooks-ts'
import './setting.css'
import { useTranslation } from 'react-i18next'
import useMenu from '@/state/zustand/menu'
import SettingTablePagi from '@/components/setting/common/setting-table-pagi'
import { urlMapObj } from '@/service/apis/setting/setting-map-obj'
import { menuTypes } from '@/types/setting'
import isAuth from '@/components/auth/components/protected-route'

type PropTypes = {}

const SettingList: React.FC<PropTypes> = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { selectedGrandSubMenu, selectedMenu } = useMenu((state) => state)
    const menu = urlMapObj[selectedGrandSubMenu?.web_url as menuTypes]
    const { t } = useTranslation(menu)

    const handleModalOpen = () => {
        setTrue()
    }

    return (
        <section className="w-full p-4 px-6">
            {/* <Breadcrumbs
                segments={[
                    // { title: 'Home', href: '/employee' },
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
            /> */}
            <div className="w-full  max-w-full overflow-auto setting-data-table">
                <div className="flex my-4 mb-5 justify-between">
                    <h2 className="font-bold text-primary-500 text:xl sm:text-2xl">
                        {t('title')}
                    </h2>
                    {selectedGrandSubMenu?.is_write && (
                        <Button
                            variant="primary"
                            className="font-normal gap-1 text-sm"
                            onClick={handleModalOpen}
                        >
                            <PlusIcon className="size-4" />
                            <span className="hidden sm:inline-block">
                                {t('addNew')}
                            </span>
                        </Button>
                    )}
                </div>
                <SettingTablePagi menu={menu} />
                <SettingModal
                    open={value}
                    title={`${t('newEntry')}`}
                    toggle={toggle}
                />
            </div>
        </section>
    )
}

export default isAuth(SettingList)
