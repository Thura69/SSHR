'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination'
import TableFrame from '@/components/common/table/table-frame'
import { DataTable } from '@/components/data-table/data-table-two'
import useMenu from '@/state/zustand/menu'
import { columns } from './column-def'
import BranchModal from './branch-modal'
import { useBoolean } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'

const modifiedData = [
    {
        location_address: 'Yangon',
        branch_name: 'Yangon',
        total_employee: 33,
        is_active: false,
    },
    {
        location_address: 'Yangon',
        branch_name: 'Yangon',
        total_employee: 33,
        is_active: false,
    },
    {
        location_address: 'Yangon',
        branch_name: 'Yangon',
        total_employee: 33,
        is_active: false,
    },
    {
        location_address: 'Yangon',
        branch_name: 'Yangon',
        total_employee: 33,
        is_active: false,
    },
    {
        location_address: 'Yangon',
        branch_name: 'Yangon',
        total_employee: 33,
        is_active: false,
    },
    {
        location_address: 'Yangon',
        branch_name: 'Yangon',
        total_employee: 33,
        is_active: false,
    },
    {
        location_address: 'Yangon',
        branch_name: 'Yangon',
        total_employee: 33,
        is_active: false,
    },
];

const BranchList = () => {
    const { selectedMenuId, selectedMenu, selectedGrandSubMenu } = useMenu()
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('branch')

    const handleModal = () => {}

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
                        title: selectedGrandSubMenu?.tbl_Menu_Language?.[0]
                            ? // @ts-ignore
                              selectedGrandSubMenu?.tbl_Menu_Language[0]
                                  ?.Translated
                            : selectedGrandSubMenu?.menu_name,
                        href: '',
                    },
                ]}
            />
            <TableFrame
                isWrite={!selectedGrandSubMenu?.is_write!}
                subTitle={false}
                language="branch"
                modalTrue={() => setTrue()}
            />

            <DataTable
                className={'with-action-column'}
                columns={columns}
                loading={false}
                data={modifiedData || []}
            />

            <Paging currentPage={10} perPage={2} totalCount={100} />
            <BranchModal
                title={`${t('newEntry')}`}
                toggle={toggle}
                open={value}
            />
        </section>
    )
}

export default BranchList
