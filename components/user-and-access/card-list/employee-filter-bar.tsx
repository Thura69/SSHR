import React, { useEffect, useState } from 'react'
import { CardDataTableDropdown } from './card-data-table-dropdown'
import { useGetUserOptions } from '@/service/query-hooks/user-and-access/user/use-user'
import { useQueryState } from 'nuqs'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import CardSortButton from '../components/card-sort-button'
import UserDataTableColumnInput from './debounce-card-input'
import { FilterBarSortState, UserStatusOptions } from '@/types/user-and-access/user'

const EmployeeFilterBar = () => {
    const { t } = useTranslation('user')
    const { data: OptionList } = useGetUserOptions({ hasEmpty: false })

    const [sortState, setSortState] = useState<FilterBarSortState>({
        Employee_Name: null,
        Employee_No: null,
        Branch_Name: null,
        Department_Name: null,
        Position_Name: null,
        Role_Name: null,
        IsActive: null,
    })

    const [sortBy] = useQueryState('sort_by', {
        defaultValue: '',
        clearOnDefault: true,
    })

    const [orderBy] = useQueryState('order_by', {
        defaultValue: '',
        clearOnDefault: true,
    })

    useEffect(() => {
        // Only update sortState if sortBy or orderBy changes
        const updatedSortState = { ...sortState }
        let updated = false // Flag to track if sortState is updated

        Object.keys(updatedSortState).forEach((key) => {
            
            if (key === sortBy) {
                // Check if orderBy changes
                if (
                    updatedSortState[key as keyof FilterBarSortState] !==
                    (orderBy === 'asc' ? 'asc' : 'desc')
                ) {
                    updatedSortState[key as keyof FilterBarSortState] =
                        orderBy === 'asc' ? 'asc' : 'desc'
                    updated = true // Set flag to true indicating sortState is updated
                }
            } else {
                // Set other keys to null if they don't match sortBy
                updatedSortState[key as keyof FilterBarSortState] = null
            }
        })

        if (updated) {
            setSortState(updatedSortState) // Only update if sortState is actually updated
        }
    }, [sortState, sortBy, orderBy, setSortState])

    const handleSortButtonClick = (sortBy: keyof FilterBarSortState) => {
        setSortState((prevState) => {
            // Determine the new sort direction for the clicked property
            const newSortDirection =
                prevState[sortBy] === null
                    ? 'asc' // Set to 'asc' if currently null
                    : prevState[sortBy] === 'asc'
                      ? 'desc' // Toggle to 'desc' if currently 'asc'
                      : 'asc' // Set to null if currently 'desc'

            // Create a new state object with the updated sort direction for the clicked property
            const newState: FilterBarSortState = {
                ...prevState,
                [sortBy]: newSortDirection,
            }

            // Set all other sort directions to null
            for (const key in newState) {
                if (key !== sortBy) {
                    newState[key as keyof FilterBarSortState] = null
                }
            }

            return newState
        })
    }

    return (
        <div className="overflow-auto mb-2">
            <div className="flex rounh-5 w-5ded-lg">
                <div className="bg-zinc-100 h-[45px] grow min-w-[200px] border-r  border-zinc-200 rounded-l-lg flex justify-start items-center px-2 py-7 gap-2">
                    <CardSortButton
                        Sort_By="Employee_Name"
                        sortDirection={sortState.Employee_Name}
                        onSortDirectionChange={() =>
                            handleSortButtonClick('Employee_Name')
                        }
                    />
                    <UserDataTableColumnInput
                        //className="border-0 bg-transparent placeholder:text-zinc-500 ring-offset-0 px-0 py-1 focus-within:ring-0 focus-within:ring-offset-0 w-full mb-0 placeholder:font-bold placeholder:text-sm"
                        placeholder={t('table.filter.name')}
                        columnName="employee_name"
                    />
                </div>
                <div className="bg-zinc-100 h-[45px]  grow min-w-[200px] border-r border-zinc-200 rounded-l flex justify-between items-center px-2 py-7 gap-2">
                    <CardSortButton
                        Sort_By="Employee_No"
                        sortDirection={sortState.Employee_No}
                        onSortDirectionChange={() =>
                            handleSortButtonClick('Employee_No')
                        }
                    />
                    <UserDataTableColumnInput
                        //className="border-0 bg-transparent placeholder:text-zinc-500 ring-offset-0 px-0 py-1 focus-within:ring-0 focus-within:ring-offset-0 w-full mb-0 placeholder:font-bold placeholder:text-sm"
                        placeholder={t('table.filter.no')}
                        columnName="employee_no"
                    />
                </div>
                <div className="bg-zinc-100 h-[45px] flex justify-between  grow min-w-[200px] border-r border-zinc-200 items-center px-2 py-7">
                    <CardSortButton
                        
                        Sort_By="Branch_Name"
                        sortDirection={sortState.Branch_Name}
                        onSortDirectionChange={() =>
                            handleSortButtonClick('Branch_Name')
                        }
                    />
                    <CardDataTableDropdown
                        options={OptionList?.Branch ?? []}
                        title={t('table.filter.branch')}
                        columnName="branch_id"
                    />
                </div>
                <div className="bg-zinc-100 h-[45px]   grow min-w-[200px] border-r border-zinc-200 flex justify-between items-center px-2 py-7">
                    <CardSortButton
                        Sort_By="Department_Name"
                        sortDirection={sortState.Department_Name}
                        onSortDirectionChange={() =>
                            handleSortButtonClick('Department_Name')
                        }
                    />
                    <CardDataTableDropdown
                        options={OptionList?.Department ?? []}
                        title={t('table.filter.department')}
                        columnName="department_id"
                    />
                </div>
                <div className="bg-zinc-100 h-[45px]  grow min-w-[200px] border-r border-zinc-200 flex justify-between items-center px-2 py-7">
                    <CardSortButton
                        Sort_By="Position_Name"
                        sortDirection={sortState.Position_Name}
                        onSortDirectionChange={() =>
                            handleSortButtonClick('Position_Name')
                        }
                    />
                    <CardDataTableDropdown
                        options={OptionList?.Position ?? []}
                        title={t('table.filter.position')}
                        columnName="position_id"
                    />
                </div>
                <div className="bg-zinc-100 h-[45px]  grow min-w-[200px] border-r border-zinc-200 flex justify-between items-center px-2 py-7">
                    <CardSortButton
                        Sort_By="Role_Name"
                        sortDirection={sortState.Role_Name}
                        onSortDirectionChange={() =>
                            handleSortButtonClick('Role_Name')
                        }
                    />
                    <CardDataTableDropdown
                        options={OptionList?.Role ?? []}
                        title={t('table.filter.role')}
                        columnName="role_id"
                    />
                </div>
                <div className="bg-zinc-100 h-[45px]  grow min-w-[200px] rounded-r-lg border-zinc-200 flex justify-between items-center px-2 py-7">
                    <CardSortButton
                        Sort_By="IsActive"
                        sortDirection={sortState.IsActive}
                        onSortDirectionChange={() =>
                            handleSortButtonClick('IsActive')
                        }
                    />
                    <CardDataTableDropdown
                        options={UserStatusOptions}
                        title={t('table.filter.status')}
                        columnName="is_active"
                    />
                </div>
            </div>
        </div>
    )
}

export default EmployeeFilterBar
