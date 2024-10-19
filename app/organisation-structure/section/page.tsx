'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination'
import TableFrame from '@/components/common/table/table-frame'
import { DataTable } from '@/components/data-table/data-table-two'
import { columns } from '@/components/organisation-structure/section/column-def'
import SectionModel from '@/components/organisation-structure/section/section-model'
import FinancialModal from '@/components/setting/financial-year/financial-modal'
import useToast from '@/hooks/use-toast'
import { getMenuName } from '@/lib/utils'
import menuStore from '@/state/zustand/menu'
import { useTranslation } from 'react-i18next'
import { useBoolean, useMediaQuery } from 'usehooks-ts'

const Page = () => {
    const isMobile = useMediaQuery('(max-width:480px)')
    const { t } = useTranslation('section')
    const selectedMenu = menuStore((state) => state.selectedMenu)
    const selectedSubMenu = menuStore((state) => state.selectedSubMenu)
    const selectedGrandSubMenu = menuStore(
        (state) => state.selectedGrandSubMenu,
    )

    const { value, toggle, setTrue } = useBoolean(false)

    const { showNotification } = useToast()

    const handleClick = () => {
        setTrue()
    }

    return (
        <section className="p-4 md:px-6">
            <Breadcrumbs
                truncationLength={isMobile ? 6 : 0}
                segments={[
                    {
                        title: selectedMenu
                            ? getMenuName(selectedMenu)
                            : 'Organisation Structure',
                        href: '/organisation-structure',
                    },
                    {
                        title: selectedSubMenu
                            ? getMenuName(selectedSubMenu)
                            : 'Section',
                        href: '/organisation-structure/section',
                    },
                ]}
            />
            <TableFrame
                isWrite={selectedGrandSubMenu?.is_write!}
                subTitle={false}
                modalTrue={handleClick}
                language="section"
            />
            <DataTable
                className={'with-action-column'}
                columns={columns}
                loading={false}
                data={[
                    {
                        Total_Employees: 2,
                        Department_Name: 'Employee',
                        section_name: 'DDO',
                        description: 'What A lovely day',
                        is_active: true,
                    },
                    {
                        Total_Employees: 111,
                        Department_Name: 'Employee',
                        section_name: 'DDO',
                        description: 'What A lovely day',
                        is_active: true,
                    },
                    {
                        Total_Employees: 222,
                        Department_Name: 'Employee',
                        section_name: 'DDO',
                        description: 'What A lovely day',
                        is_active: true,
                    },
                    {
                        Total_Employees: 222,
                        Department_Name: 'Hello',
                        section_name: 'DDO',
                        description: 'What A lovely day',
                        is_active: false,
                    },
                ]}
            />
            <Paging currentPage={3} perPage={4} totalCount={100} />

            <SectionModel
                title={`${t('modalEntry')}`}
                editMode={false}
                open={value}
                toggle={toggle}
            />
        </section>
    )
}

export default Page
