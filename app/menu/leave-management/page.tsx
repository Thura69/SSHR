import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React from 'react'

function LeaveManagement() {
    return (
        <section className="w-full p-4 px-6 ">
            <Breadcrumbs
                segments={[
                    { title: 'Settings', href: '/employee' },
                    {
                        title: 'Change Recruitment',
                        href: '/setting',
                    },
                    {
                        title: 'Interview Evaluation',
                        href: '/setting/job-type',
                    },
                ]}
            />

            <div className="py-6 w-full max-w-full overflow-auto border setting-data-table">
                <div className="flex justify-between mb-4">
                    <div>
                        <h2 className="font-bold text-2xl">Setting</h2>
                        <p className="text-md text-gray-400">
                            Management users, roles, and permissions.
                        </p>
                    </div>
                    <div className="border">
                        <Button variant={'ghost'} size={'md'}>
                            <PlusIcon className="size-4" />
                        </Button>
                        <Button
                            variant="primary"
                            className="font-normal gap-1 text-sm"
                        >
                            <PlusIcon className="size-4" />
                            <span>Add New</span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LeaveManagement
