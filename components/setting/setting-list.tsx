'use client'

import React from 'react'
import { DataTable } from '@/components/data-table/data-table'
import { columns } from '@/components/setting/setting-table-columns'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { PlusIcon } from 'lucide-react'
import SettingModal from '@/components/setting/setting-modal'
import { useBoolean } from 'usehooks-ts'
import Paging from '@/components/common/pagers/pagination'
import './setting.css'

const DemoData = [
    { name: 'Myo', status: 'Active' },

    { name: 'Myo', status: 'Active' },

    { name: 'Myo', status: 'Active' },
]

const SettingList = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const handleModalOpen = () => {
        setTrue()
    }

    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
                segments={[
                    { title: 'Home', href: '/employee' },
                    {
                        title: 'Setting ',
                        href: '/setting',
                    },
                    { title: 'Job Type', href: '/setting/job-type' },
                ]}
            />
            <div className="py-6 w-full max-w-full overflow-auto setting-data-table">
                <div className="flex justify-between mb-4">
                    <h2 className="font-bold text-2xl">Setting</h2>
                    <Button
                        variant="primary"
                        className="font-normal gap-1 text-sm"
                        onClick={handleModalOpen}
                    >
                        <PlusIcon className="size-4" />
                        <span>Add New</span>
                    </Button>
                </div>
                <DataTable
                    className={'with-select with-action-column'}
                    columns={columns}
                    data={DemoData}
                />
                <Paging currentPage={1} perPage={15} totalCount={100} />
                <SettingModal open={value} toggle={toggle} />
            </div>
        </section>
    )
}

export default SettingList
