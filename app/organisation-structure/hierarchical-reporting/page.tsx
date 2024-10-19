'use client'

import React, { useState } from 'react'
import { useQueryState } from 'nuqs'
import { createColumnHelper } from '@tanstack/table-core'
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PlusIcon } from '@radix-ui/react-icons'

import {
    useDeleteReport,
    useGetHierarchicalReports,
    useGetRequestType,
} from '@/service/query-hooks/use-hierarchical-report'
import { ReportListDataTable } from '@/components/hierarchical-reporting/report-list-data-table'
import Pagination from '@/components/common/pagers/pagination'
import { DatatableColumnSelect } from '@/components/data-table/data-table-column-selector'
import SortButton from '@/components/data-table/sort-button'
import {
    useGetBranchOptions,
    useGetCompanyOptions,
    useGetDepartmentOptions,
    useGetLocationOptions,
    useGetPositionOptions,
    useGetSectionOptions,
} from '@/service/query-hooks/common'
import { Button } from '@/components/ui/button'
import useQueryFilters from '@/components/hierarchical-reporting/hook/use-query-filters'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import isAuth from '@/components/auth/components/protected-route'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import menuStore from '@/state/zustand/menu'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import loading from '../[slug]/loading'

const HierarchicalReportingPage = () => {
    const columnHelper = createColumnHelper<any>()

    const {
        setFromCompanyFilter,
        setFromBranchFilter,
        setFromDepartmentFilter,
        setFromLocationFilter,
        setFromPositionFilter,
        setFromSectionFilter,
        setRequestTypeFilter,
        setPage,
        fromCompanyFilter,
        fromBranchFilter,
        fromDepartmentFilter,
        fromLocationFilter,
        fromPositionFilter,
        fromSectionFilter,
    } = useQueryFilters()

    const { data: locationList } = useGetLocationOptions({ hasEmpty: false })
    const { data: companyList } = useGetCompanyOptions({ hasEmpty: false })
    const { data: branchList } = useGetBranchOptions({ hasEmpty: false })
    const { data: departmentList } = useGetDepartmentOptions({
        hasEmpty: false,
    })
    const { data: positionList } = useGetPositionOptions({ hasEmpty: false })
    const { data: sectionList } = useGetSectionOptions({ hasEmpty: false })
    const { data: reports, isLoading } = useGetHierarchicalReports()
    const { data: requestTypes } = useGetRequestType()

    const [showEditDialog, setShowEditDialog] = useState<boolean>(false)
    const [selectedID, setSelectedID] = useState<string | null>(null)
    const [selectedRequest, setSelectedRequest] = useState<null | any>(null)
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

    const [pageSize] = useQueryState('size', {
        defaultValue: '15',
        clearOnDefault: true,
    })

    const [currentPage] = useQueryState('page', {
        defaultValue: '1',
        clearOnDefault: true,
    })

    const { mutate: deleteReport } = useDeleteReport()

    const handleModelToggle = () => {
        if (showDeleteDialog) {
            setShowDeleteDialog((prev) => !prev)
        }
        if (showEditDialog) {
            setShowEditDialog((prev) => !prev)
        }
    }

    const handleFromCompanyOnSelect = (selectedData: Set<string>) => {
        if (selectedData.size > 0) {
            const data = Array.from(selectedData)
            const selectedValues = data.join(',')
            setFromCompanyFilter(selectedValues)
            setPage('1')
        } else {
            setFromCompanyFilter(null)
        }
    }
    const handleFromLocationOnSelect = (selectedData: Set<string>) => {
        if (selectedData.size > 0) {
            const data = Array.from(selectedData)
            const selectedValues = data.join(',')
            setFromLocationFilter(selectedValues)
            setPage('1')
        } else {
            setFromLocationFilter(null)
        }
    }
    const handleFromBranchOnSelect = (selectedData: Set<string>) => {
        if (selectedData.size > 0) {
            const data = Array.from(selectedData)
            const selectedValues = data.join(',')
            setFromBranchFilter(selectedValues)
            setPage('1')
        } else {
            setFromBranchFilter(null)
        }
    }

    const handleFromDepartmentOnSelect = (selectedData: Set<string>) => {
        if (selectedData.size > 0) {
            const data = Array.from(selectedData)
            const selectedValues = data.join(',')
            setFromDepartmentFilter(selectedValues)
            setPage('1')
        } else {
            setFromDepartmentFilter(null)
        }
    }

    const handleFromSectionOnSelect = (selectedData: Set<string>) => {
        if (selectedData.size > 0) {
            const data = Array.from(selectedData)
            const selectedValues = data.join(',')
            setFromSectionFilter(selectedValues)
            setPage('1')
        } else {
            setFromSectionFilter(null)
        }
    }

    const handleFromPositionOnSelect = (selectedData: Set<string>) => {
        if (selectedData.size > 0) {
            const data = Array.from(selectedData)
            const selectedValues = data.join(',')
            setFromPositionFilter(selectedValues)
            setPage('1')
        } else {
            setFromPositionFilter(null)
        }
    }

    // const handleToCompanyOnSelect = (selectedData: Set<string>) => {
    //     if (selectedData.values().next().value) {
    //         setToCompanyFilter(selectedData.values().next().value)
    //         setPage('1')
    //     } else {
    //         setToCompanyFilter(null)
    //     }
    // }
    // const handleToLocationOnSelect = (selectedData: Set<string>) => {
    //     if (selectedData.values().next().value) {
    //         setToLocationFilter(selectedData.values().next().value)
    //         setPage('1')
    //     } else {
    //         setToLocationFilter(null)
    //     }
    // }
    // const handleToBranchOnSelect = (selectedData: Set<string>) => {
    //     if (selectedData.values().next().value) {
    //         setToBranchFilter(selectedData.values().next().value)
    //         setPage('1')
    //     } else {
    //         setToBranchFilter(null)
    //     }
    // }

    const handleTypeSelect = (selectedData: Set<string>) => {
        if (selectedData.size > 0) {
            const data = Array.from(selectedData)
            const selectedValues = data.join(',')
            setRequestTypeFilter(selectedValues)
            setPage('1')
        } else {
            setRequestTypeFilter(null)
        }
    }

    // const handleToDepartmentOnSelect = (selectedData: Set<string>) => {
    //     if (selectedData.values().next().value) {
    //         setToDepartmentFilter(selectedData.values().next().value)
    //         setPage('1')
    //     } else {
    //         setToDepartmentFilter(null)
    //     }
    // }
    // const handleToSectionOnSelect = (selectedData: Set<string>) => {
    //     if (selectedData.values().next().value) {
    //         setToSectionFilter(selectedData.values().next().value)
    //         setPage('1')
    //     } else {
    //         setToSectionFilter(null)
    //     }
    // }
    // const handleToPositionOnSelect = (selectedData: Set<string>) => {
    //     if (selectedData.values().next().value) {
    //         setToPositionFilter(selectedData.values().next().value)
    //         setPage('1')
    //     } else {
    //         setToPositionFilter(null)
    //     }
    // }

    const handleShowEditDialog = (selectedId: string) => {
        setSelectedID(selectedId)
        setShowEditDialog(true)
    }

    const handleShoWDeleteDialog = (selectedRequest: any) => {
        setSelectedRequest(selectedRequest)
        setShowDeleteDialog(true)
    }

    const HierarchicalReportingListColumn = [
        columnHelper.display({
            id: 'select',
            header: ({ table }) => <SelectHeader table={table} />,
            cell: ({ row }) => <SelectCell row={row} />,
        }),
        columnHelper.group({
            header: () => <p className={'text-center'}>Request From</p>,
            id: 'request-from',
            footer: (props) => props.column.id,
            columns: [
                columnHelper.accessor('Request_Type', {
                    header: ({ column }) => (
                        <div className="flex justify-center items-center gap-2">
                            <DatatableColumnSelect
                                align="center"
                                options={requestTypes ?? []}
                                column={column}
                                title={'Type'}
                                getSelectedValues={handleTypeSelect}
                            />
                            <SortButton
                                column={column}
                                columnName="Request_Type"
                            />
                        </div>
                    ),
                    id: 'type',
                    cell: (info) => (
                        <p className={'px-[20px]'}>{info.getValue()}</p>
                    ),
                    footer: (props) => props.column.id,
                }),
                columnHelper.accessor('tbl_Company.Company_Name', {
                    header: ({ column }) => (
                        <div className="flex justify-between items-center gap-2">
                            <div className={'w-4'} />
                            <DatatableColumnSelect
                                align="center"
                                initialValue={
                                    fromCompanyFilter
                                        ? +fromCompanyFilter
                                        : null
                                }
                                options={companyList ?? []}
                                column={column}
                                title={'Company'}
                                getSelectedValues={handleFromCompanyOnSelect}
                            />
                            <SortButton
                                column={column}
                                columnName="From_Company_Name"
                            />
                        </div>
                    ),
                    id: 'from_company_name',
                    cell: (info) => (
                        <p className={'px-[20px]'}>{info.getValue()}</p>
                    ),
                    footer: (props) => props.column.id,
                }),
                columnHelper.accessor('tbl_Location.Location_Name', {
                    id: 'from_location_name',
                    header: ({ column }) => (
                        <div className="flex justify-between items-center gap-2">
                            <div className={'w-4'} />
                            <DatatableColumnSelect
                                align="center"
                                initialValue={
                                    fromLocationFilter
                                        ? +fromLocationFilter
                                        : null
                                }
                                options={locationList ?? []}
                                column={column}
                                title={'Location'}
                                getSelectedValues={handleFromLocationOnSelect}
                            />
                            <SortButton
                                column={column}
                                columnName="From_Location_Name"
                            />
                        </div>
                    ),
                    cell: (info) => (
                        <p className={'px-[20px]'}>{info.getValue()}</p>
                    ),
                    footer: (props) => props.column.id,
                }),
                columnHelper.accessor('tbl_Branch.Branch_Name', {
                    id: 'from_branch_name',
                    header: ({ column }) => (
                        <div className="flex justify-between items-center gap-2">
                            <div className={'w-4'} />
                            <DatatableColumnSelect
                                align="center"
                                initialValue={
                                    fromBranchFilter ? +fromBranchFilter : null
                                }
                                options={branchList ?? []}
                                column={column}
                                title={'Branch'}
                                getSelectedValues={handleFromBranchOnSelect}
                            />
                            <SortButton
                                column={column}
                                columnName="From_Branch_Name"
                            />
                        </div>
                    ),
                    cell: (info) => (
                        <p className={'px-[20px]'}>{info.getValue()}</p>
                    ),
                    footer: (props) => props.column.id,
                }),
                columnHelper.accessor('tbl_Department.Department_Name', {
                    id: 'from_department_name',
                    header: ({ column }) => (
                        <div className="flex justify-between items-center gap-2">
                            <div className={'w-4'} />
                            <DatatableColumnSelect
                                align="center"
                                initialValue={
                                    fromDepartmentFilter
                                        ? +fromDepartmentFilter
                                        : null
                                }
                                options={departmentList ?? []}
                                column={column}
                                title={'Department'}
                                getSelectedValues={handleFromDepartmentOnSelect}
                            />
                            <SortButton
                                column={column}
                                columnName="From_Department_Name"
                            />
                        </div>
                    ),
                    cell: (info) => (
                        <p className={'px-[20px]'}>{info.getValue()}</p>
                    ),
                    footer: (props) => props.column.id,
                }),
                columnHelper.accessor('tbl_Section.Section_Name', {
                    id: 'from_section_name',
                    header: ({ column }) => (
                        <div className="flex justify-between items-center gap-2">
                            <div className={'w-4'} />
                            <DatatableColumnSelect
                                align="center"
                                initialValue={
                                    fromSectionFilter
                                        ? +fromSectionFilter
                                        : null
                                }
                                options={sectionList ?? []}
                                column={column}
                                title={'Section'}
                                getSelectedValues={handleFromSectionOnSelect}
                            />
                            <SortButton
                                column={column}
                                columnName="From_Section_Name"
                            />
                        </div>
                    ),
                    cell: (info) => (
                        <p className={'px-[20px]'}>{info.getValue()}</p>
                    ),
                    footer: (props) => props.column.id,
                }),
                columnHelper.accessor('tbl_Position.Position_Name', {
                    id: 'from_position_name',
                    header: ({ column }) => (
                        <div className="flex justify-between items-center gap-2">
                            <div className={'w-4'} />
                            <DatatableColumnSelect
                                align="center"
                                initialValue={
                                    fromPositionFilter
                                        ? +fromPositionFilter
                                        : null
                                }
                                options={positionList ?? []}
                                column={column}
                                title={'Position'}
                                getSelectedValues={handleFromPositionOnSelect}
                            />
                            <SortButton
                                column={column}
                                columnName="From_Position_Name"
                            />
                        </div>
                    ),
                    cell: (info) => (
                        <p className={'px-[20px]'}>{info.getValue()}</p>
                    ),
                    footer: (props) => props.column.id,
                }),
            ],
        }),

        columnHelper.group({
            header: () => <p className={'text-center'}>Request To</p>,
            id: 'request-to',
            footer: (props) => props.column.id,
            columns: [
                columnHelper.accessor('Company_ID', {
                    id: 'to_company_name',
                    header: ({ column }) => (
                        <div className="flex justify-center items-center gap-2">
                            <p className="font-bold">Company</p>
                            {/* <div className={'w-4'} />
                            <DatatableColumnSelect
                                isSingle
                                align="center"
                                options={companyList ?? []}
                                column={column}
                                title={'Company'}
                                getSelectedValues={handleToCompanyOnSelect}
                            />
                            <SortButton column={column} columnName='To_Company_Name'/> */}
                        </div>
                    ),
                    cell: (info: any) => {
                        const {
                            row: {
                                original: { tbl_Request_Detail },
                            },
                        } = info

                        return (
                            <div className={'flex flex-col min-w-[180px]'}>
                                {tbl_Request_Detail?.map((detail: any) => {
                                    return (
                                        <div
                                            className={
                                                'flex border-b last-of-type:border-0'
                                            }
                                        >
                                            <div className="w-[20px]" />
                                            <div
                                                className={
                                                    'h-[60px]  flex flex-col justify-center'
                                                }
                                            >
                                                <p>
                                                    {
                                                        detail?.tbl_Company
                                                            ?.Company_Name
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-[20px]" />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    },
                    footer: (props) => props.column.id,
                }),
                columnHelper.accessor('tbl_Location.Location_Name', {
                    id: 'to_location_name',
                    header: ({ column }) => (
                        <div className="flex justify-center items-center gap-2">
                            <p className="font-bold">Location</p>
                            {/* <div className={'w-4'} />
                            <DatatableColumnSelect
                                isSingle
                                align="center"
                                options={locationList ?? []}
                                column={column}
                                title={'Location'}
                                getSelectedValues={handleToLocationOnSelect}
                            />
                            <SortButton column={column} columnName='To_Location_Name' /> */}
                        </div>
                    ),
                    cell: (info: any) => {
                        const {
                            row: {
                                original: { tbl_Request_Detail },
                            },
                        } = info

                        return (
                            <div className={'flex flex-col min-w-[180px]'}>
                                {tbl_Request_Detail?.map((detail: any) => {
                                    return (
                                        <div
                                            className={
                                                'flex border-b last-of-type:border-0'
                                            }
                                        >
                                            <div className="w-[20px]" />
                                            <div
                                                className={
                                                    'h-[60px]  flex flex-col justify-center'
                                                }
                                            >
                                                <p>
                                                    {
                                                        detail?.tbl_Location
                                                            ?.Location_Name
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-[20px]" />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    },
                    footer: (props) => props.column.id,
                }),
                columnHelper.accessor('tbl_Branch.Branch_Name', {
                    id: 'to_branch_name',
                    header: ({ column }) => (
                        <div className="flex justify-center items-center gap-2">
                            <p className="font-bold">Branch</p>
                            {/* <div className={'w-4'} />
                            <DatatableColumnSelect
                                isSingle
                                align="center"
                                options={branchList ?? []}
                                column={column}
                                title={'Branch'}
                                getSelectedValues={handleToBranchOnSelect}
                            />
                            <SortButton column={column} columnName='To_Branch_Name'/> */}
                        </div>
                    ),
                    cell: (info: any) => {
                        const {
                            row: {
                                original: { tbl_Request_Detail },
                            },
                        } = info

                        return (
                            <div className={'flex flex-col min-w-[180px]'}>
                                {tbl_Request_Detail?.map((detail: any) => {
                                    return (
                                        <div
                                            className={
                                                'flex border-b last-of-type:border-0'
                                            }
                                        >
                                            <div className="w-[20px]" />
                                            <div
                                                className={
                                                    'h-[60px]  flex flex-col justify-center'
                                                }
                                            >
                                                <p>
                                                    {
                                                        detail?.tbl_Branch
                                                            ?.Branch_Name
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-[20px]" />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    },
                    footer: (props) => props.column.id,
                }),
                columnHelper.accessor('tbl_Department.Department_Name', {
                    id: 'to_department_name',
                    header: ({ column }) => (
                        <div className="flex justify-center items-center gap-2">
                            <p className="font-bold">Department</p>
                            {/* <div className={'w-4'} />
                            <DatatableColumnSelect
                                isSingle
                                align="center"
                                options={departmentList ?? []}
                                column={column}
                                title={'department'}
                                getSelectedValues={handleToDepartmentOnSelect}
                            />
                            <SortButton column={column} columnName='To_Department_Name' /> */}
                        </div>
                    ),
                    cell: (info: any) => {
                        const {
                            row: {
                                original: { tbl_Request_Detail },
                            },
                        } = info

                        return (
                            <div className={'flex flex-col min-w-[180px]'}>
                                {tbl_Request_Detail?.map((detail: any) => {
                                    return (
                                        <div
                                            className={
                                                'flex border-b last-of-type:border-0'
                                            }
                                        >
                                            <div className="w-[20px]" />
                                            <div
                                                className={
                                                    'h-[60px]  flex flex-col justify-center'
                                                }
                                            >
                                                <p>
                                                    {
                                                        detail?.tbl_Department
                                                            ?.Department_Name
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-[20px]" />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    },
                    footer: (props) => props.column.id,
                }),
                columnHelper.accessor('tbl_Section.Section_Name', {
                    id: 'to_section_name',
                    header: ({ column }) => (
                        <div className="flex justify-center items-center gap-2">
                            <p className="font-bold">Section</p>
                            {/* <div className={'w-4'} />
                            <DatatableColumnSelect
                                isSingle
                                align="center"
                                options={sectionList ?? []}
                                column={column}
                                title={'Section'}
                                getSelectedValues={handleToSectionOnSelect}
                            />
                            <SortButton column={column} columnName='To_Section_Name'/> */}
                        </div>
                    ),
                    cell: (info: any) => {
                        const {
                            row: {
                                original: { tbl_Request_Detail },
                            },
                        } = info

                        return (
                            <div className={'flex flex-col min-w-[180px]'}>
                                {tbl_Request_Detail?.map((detail: any) => {
                                    return (
                                        <div
                                            className={
                                                'flex border-b last-of-type:border-0'
                                            }
                                        >
                                            <div className="w-[20px]" />
                                            <div
                                                className={
                                                    'h-[60px]  flex flex-col justify-center'
                                                }
                                            >
                                                <p>
                                                    {
                                                        detail?.tbl_Section
                                                            ?.Section_Name
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-[20px]" />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    },
                    footer: (props) => props.column.id,
                }),
                columnHelper.accessor('tbl_Position.Position_Name', {
                    id: 'to_position_name',
                    header: ({ column }) => (
                        <div className="flex justify-center items-center gap-2">
                            <p className="font-bold">Position</p>
                            {/* <div className={'w-4'} />
                            <DatatableColumnSelect
                                isSingle
                                align="center"
                                options={positionList ?? []}
                                column={column}
                                title={'Position'}
                                getSelectedValues={handleToPositionOnSelect}
                            />
                            <SortButton column={column} columnName='To_Position_Name' /> */}
                        </div>
                    ),
                    cell: (info: any) => {
                        const {
                            row: {
                                original: { tbl_Request_Detail },
                            },
                        } = info

                        return (
                            <div className={'flex flex-col min-w-[180px]'}>
                                {tbl_Request_Detail?.map((detail: any) => {
                                    return (
                                        <div
                                            className={
                                                'flex border-b last-of-type:border-0'
                                            }
                                        >
                                            <div className="w-[20px]" />
                                            <div
                                                className={
                                                    'h-[60px]  flex flex-col justify-center'
                                                }
                                            >
                                                <p>
                                                    {
                                                        detail?.tbl_Position
                                                            ?.Position_Name
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-[20px]" />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    },
                    footer: (props) => props.column.id,
                }),
            ],
        }),

        columnHelper.display({
            id: 'actions',
            header: () => <p className={'text-center font-bold'}>Action</p>,
            cell: ({ row }) => {
                return (
                    <div className={'p-4 align-middle flex justify-center'}>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button
                                    variant="primary"
                                    className="h-8 w-8 p-0"
                                >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4 rotate-90" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleShowEditDialog(
                                            row.original?.Request_ID,
                                        )
                                    }
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleShoWDeleteDialog(row.original)
                                    }
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        }),
    ]

    const meta = reports ? reports.meta : null

    const newData: Array<any> = []
    reports &&
        reports?.data?.forEach((reportObj: any) => {
            reportObj?.tbl_Request_Detail?.forEach((requestTo: any) => {
                newData.push({
                    ...reportObj,
                    requestTo: requestTo,
                })
            })
        })

    const data = React.useMemo(
        () =>
            reports?.data?.map((d: any) => ({ ...d, id: d?.Request_ID })) ?? [],
        [reports],
    )
    const route = useRouter()

    const handleAddReport = () => {
        route.push('/organisation-structure/hierarchical-reporting/add')
    }

    const handleIndividualClick = () => {
        if (showDeleteDialog) {
            deleteReport(
                {
                    id: selectedRequest?.Request_ID,
                    request_group_id: selectedRequest?.Request_Group_ID,
                    type: 'INDIVIDUAL',
                },
                {
                    onSettled: () => {
                        setShowDeleteDialog(false)
                    },
                },
            )
        }

        if (showEditDialog) {
            route.push(
                `/organisation-structure/hierarchical-reporting/edit/${selectedID}?type=INDIVIDUAL`,
            )
        }
    }

    const handleGroupClick = () => {
        if (showDeleteDialog) {
            deleteReport(
                {
                    id: selectedRequest?.Request_ID,
                    request_group_id: selectedRequest?.Request_Group_ID,
                    type: 'GROUP',
                },
                {
                    onSettled: () => {
                        setShowDeleteDialog(false)
                    },
                },
            )
        }

        if (showEditDialog) {
            route.push(
                `/organisation-structure/hierarchical-reporting/edit/${selectedID}?type=GROUP`,
            )
        }
    }

    const selectedMenu = menuStore((state) => state.selectedMenu)
    const selectedSubMenu = menuStore((state) => state.selectedSubMenu)

    return (
        <section className={'w-full p-5'}>
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
                        title: selectedSubMenu?.tbl_menu_language?.[0]
                            ? // @ts-ignore
                              selectedSubMenu?.tbl_menu_language[0]?.translated
                            : selectedSubMenu?.menu_name,
                        href: '',
                    },
                ]}
            />

            <div className="mb-4 flex justify-between items-center mt-2">
                <h1 className={'font-bold text-2xl'}>Hierarchical Reporting</h1>{' '}
                <Button
                    variant={'primary'}
                    onClick={handleAddReport}
                    className="font-normal flex items-center gap-2"
                >
                    <PlusIcon /> Add New
                </Button>
            </div>

            <ReportListDataTable
                loading={true}
                className={'with-action-column with-select'}
                columns={HierarchicalReportingListColumn}
                data={data}
            />
            <Pagination
                loading={isLoading}
                currentPage={+currentPage}
                perPage={+pageSize}
                totalCount={meta?.totalCount}
            />
            <Dialog
                open={showEditDialog || showDeleteDialog}
                onOpenChange={handleModelToggle}
            >
                <DialogContent className="sm:max-w-[425px] h-[200px]">
                    <p className="text-center mt-[20px] font-xl text-lg">
                        Do you want to {showEditDialog ? 'edit' : 'delete'}{' '}
                        individually or group?
                    </p>
                    <div className="flex justify-center items-center gap-4">
                        <Button
                            variant={'primary'}
                            onClick={handleIndividualClick}
                        >
                            Individual
                        </Button>
                        <Button variant={'primary'} onClick={handleGroupClick}>
                            Group
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default isAuth(HierarchicalReportingPage)
