import React from 'react'
import EmployeeCard from './employee-card'
import PageLoader from '@/components/common/loaders/page-loader'
import {
    HandleEmployeeInterface,
    UserPermissionInterface,
} from '@/types/user-and-access/user'

interface Props {
    data?: Array<object>
    toggle?: () => void
    handleEmployee_ID?: (data: HandleEmployeeInterface) => void
    permission?: UserPermissionInterface
    isLoading?: boolean
}

const EmployeeCardTable = ({
    data,
    toggle,
    handleEmployee_ID,
    permission,
    isLoading,
}: Props) => {
    return isLoading ? (
        <div>
            <PageLoader />
        </div>
    ) : (
        <div className="pt-3">
            {data && data.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {data.length > 0
                        ? data.map((item: any) => (
                              <EmployeeCard
                                  permission={permission}
                                  key={item.user_id}
                                  {...item}
                                  toggle={toggle}
                                  handleEmployee_ID={handleEmployee_ID}
                              />
                          ))
                        : ''}
                </div>
            ) : (
                <div className="flex w-full p-4 items-center justify-center">
                    <p className="p-4 h-24 text-center text-slate-600 text-sm">
                        No results.
                    </p>
                </div>
            )}
        </div>
    )
}

export default EmployeeCardTable
