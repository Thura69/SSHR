import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import EmployeeAvatar from '@/components/employee-list/table-list/components/employee-avatar'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import React from 'react'
import { RoleUser, TableColumnProps } from '@/types/role'

export const getEmployeePermissionTableColumn = ({
    positionOptions,
    locationOptions,
    branchOptions,
    departmentOptions,
    sectionOptions,
    companyOptions,
    handleRemove,
}: TableColumnProps) => {
    const EmployeePermissionTableColumn: ColumnDef<RoleUser>[] = [
        {
            accessorKey: 'Employee_Name',
            header: ({ column }) => {
                const { t } = useTranslation('roleCreate')
                return (
                    <section className="flex justify-center items-center">
                        <div className="w-fit min-w-[120px] md:min-w-[150px] max-w-[250px]">
                            <p className="font-bold ">{t('emp-name')}</p>
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                const employeeID = row.original.employee_id
                const isAllEmployee = +employeeID === 999999

                if (!isAllEmployee) {
                    const emp = row.original
                    return (
                        <EmployeeAvatar
                            userName={emp?.employee_name}
                            fullName={emp?.employee_name as string}
                        />
                    )
                } else {
                    return <p className="ps-2 line-clamp-1">All</p>
                }
            },
        },
        {
            accessorKey: 'Company_Name',
            header: ({ column }) => {
                const { t } = useTranslation('roleCreate')
                return (
                    <section className="flex justify-center items-center">
                        <div className="w-fit min-w-[120px] md:min-w-[150px] max-w-[250px]">
                            <p className="font-bold ">{t('company')}</p>
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                const companyID = row.original.company_id
                const isAllCompany = +companyID === 999999
                const companyObj = companyOptions.find(
                    (company: any) => company.value === companyID,
                )

                return (
                    <p className="ps-2 line-clamp-1">
                        {isAllCompany ? 'All' : companyObj?.label}
                    </p>
                )
            },
        },
        {
            accessorKey: 'Position_Name',
            header: ({ column }) => {
                const { t } = useTranslation('roleCreate')
                return (
                    <section className="flex justify-center items-center">
                        <div className="w-fit min-w-[120px] md:min-w-[150px] max-w-[250px]">
                            <p className="font-bold ">{t('position')}</p>
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                const positionID = row.original.position_id
                const isAllPosition = positionID ? +positionID === 999999 : true
                const positionObj = positionOptions.find(
                    (position: any) => position.value === positionID,
                )

                return (
                    <p className="ps-2 line-clamp-1">
                        {isAllPosition ? 'All' : positionObj?.label}
                    </p>
                )
            },
        },
        {
            accessorKey: 'Location_Name',
            header: ({ column }) => {
                const { t } = useTranslation('roleCreate')
                return (
                    <section className="flex justify-center items-center">
                        <div className="w-fit min-w-[120px] md:min-w-[150px] max-w-[250px]">
                            <p className="font-bold ">{t('location')}</p>
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                const locationID = row.original.location_id
                const isAllLocation = +locationID === 999999
                const locationObj = locationOptions.find(
                    (location: any) => location.value === locationID,
                )

                return (
                    <p className="ps-2 line-clamp-1">
                        {isAllLocation ? 'All' : locationObj?.label}
                    </p>
                )
            },
        },
        {
            accessorKey: 'Branch_Name',
            header: ({ column }) => {
                const { t } = useTranslation('roleCreate')
                return (
                    <section className="flex justify-center items-center">
                        <div className="w-fit min-w-[120px] md:min-w-[150px] max-w-[250px]">
                            <p className="font-bold ">{t('branch')}</p>
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                const branchID = row.original.branch_id
                const isAllBranch = +branchID === 999999
                const branchObj = branchOptions.find(
                    (branch: any) => branch.value === branchID,
                )

                return (
                    <p className="ps-2 line-clamp-1">
                        {isAllBranch ? 'All' : branchObj?.label}
                    </p>
                )
            },
        },
        {
            accessorKey: 'Department_Name',
            header: ({ column }) => {
                const { t } = useTranslation('roleCreate')
                return (
                    <section className="flex justify-center items-center">
                        <div className="w-[180px] xl:w-[200px]">
                            <p className="font-bold ">{t('department')}</p>
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                const departmentID = row.original.department_id
                const isAllDepartment = +departmentID === 999999
                const departmentObj = departmentOptions.find(
                    (department: any) => department.value === departmentID,
                )

                return (
                    <p className="ps-2 line-clamp-1">
                        {isAllDepartment ? 'All' : departmentObj?.label}
                    </p>
                )
            },
        },
        {
            accessorKey: 'Section_Name',
            header: ({ column }) => {
                const { t } = useTranslation('roleCreate')
                return (
                    <section className="flex justify-center items-center">
                        <div className="w-fit min-w-[120px] md:min-w-[150px] max-w-[250px]">
                            <p className="font-bold ">{t('section')}</p>
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                const sectionID = row.original.section_id
                const isAllSection = +sectionID === 999999
                const sectionObj = sectionOptions.find(
                    (section: any) => section.value === sectionID,
                )

                return (
                    <p className="ps-2 line-clamp-1">
                        {isAllSection ? 'All' : sectionObj?.label}
                    </p>
                )
            },
        },
        {
            accessorKey: 'action_id',
            header: () => {
                return (
                    <div className="h-full bg-zinc-50 flex items-center justify-center">
                        <p className="font-bold text-zinc-500 text-center">
                            Action
                        </p>
                    </div>
                )
            },
            cell: ({ row }) => {
                const employee = row.original

                return (
                    <div className={'flex justify-center w-[80px]'}>
                        <Button
                            variant="ghost"
                            className="text-red-600 stroke-1"
                            onClick={() => handleRemove(employee)}
                        >
                            <Trash />
                        </Button>
                    </div>
                )
            },
        },
    ]
    return { EmployeePermissionTableColumn }
}

export const EmployeeSelectorColumn: ColumnDef<RoleUser>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="border-neutral-300 mt-1"
            />
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="border-neutral-300 mt-1"
                />
            </div>
        ),
    },
    {
        id: 'employee_name',
        accessorKey: 'employee_name',
        header: ({ column }) => {
            const { t } = useTranslation('roleCreate')
            return (
                <section className="flex justify-between items-center gap-2">
                    <p className="font-bold ">{t('emp-name')}</p>
                </section>
            )
        },
        cell: ({ row }) => {
            return (
                <EmployeeAvatar
                    userName={row.original.employee_name}
                    fullName={row.original.employee_name as string}

                />
            )
        },
    },
    {
        id: 'position_name',
        accessorKey: 'position_name',
        header: ({ column }) => {
            const { t } = useTranslation('roleCreate')

            return (
                <section className="flex justify-between items-center relative">
                    <p className="font-bold line-clamp-1">{t('position')}</p>
                </section>
            )
        },
        cell: ({ row }) => {
            const position = row.getValue('position_name') as string
            return <p className="line-clamp-1 ps-2">{position}</p>
        },
    },
]
