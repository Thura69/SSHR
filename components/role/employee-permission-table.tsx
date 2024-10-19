import React, { useCallback, useEffect, useState } from 'react'
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import {
    useGetAllRoleFilters,
    useGetAllRoleFiltersByBranch,
    useGetAllRoleFiltersByCompany,
    useGetAllRoleFiltersByDepartment,
    useGetAllRoleFiltersByLocation,
    useGetEmployeeByFilters,
} from '@/service/query-hooks/use-roles'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn, queryStringGenerator } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import { CheckIcon, PlusIcon } from 'lucide-react'
import { DataTable } from '@/components/data-table/data-table'
import {
    EmployeeSelectorColumn,
    getEmployeePermissionTableColumn,
} from '@/components/role/employee-permission-table-column'
import useToast from '@/hooks/use-toast'
import { useBoolean } from 'usehooks-ts'
import { Confirm } from '@/components/common/modal/confirm'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RoleOption } from '@/types/role'

const EmployeePermissionTable = ({
    setSelectedRows,
    selectedRows,
    setReset,
    reset,
}: {
    setSelectedRows: any
    selectedRows?: any
    setReset?: any
    reset?: any
}) => {
    const { t } = useTranslation('roleCreate')

    const [positionOptions, setPositionOptions] = useState<RoleOption[]>([])
    const [companyOptions, setCompanyOptions] = useState<RoleOption[]>([])
    const [locationOptions, setLocationOptions] = useState<RoleOption[]>([])
    const [branchOptions, setBranchOptions] = useState<RoleOption[]>([])
    const [departmentOptions, setDepartmentOptions] = useState<RoleOption[]>([])
    const [sectionOptions, setSectionOptions] = useState<RoleOption[]>([])

    const [table, setTable] = useState<any>(null)
    const [finalEmployeeList, setFinalEmployeeList] = useState<any>([])
    const [objectToAdd, setObjectToAdd] = useState<any>(null)
    const [employeeListToAdd, setEmployeeListToAdd] = useState<any>([])
    const [isAllRowSelected, setIsAllRowSelected] = useState<boolean>(false)

    const { t: tEmp } = useTranslation('empPermission')

    const handleGetAllRowSelected = (isSelected: boolean) => {
        setIsAllRowSelected(isSelected)
    }

    useEffect(() => {
        setFinalEmployeeList(selectedRows)
    }, [selectedRows])

    const form = useForm({})

    useEffect(() => {
        if (reset) {
            setIsAllRowSelected(false)
            setEmployeeListToAdd([])
            setObjectToAdd(null)
            setFinalEmployeeList([])
            form.reset()

            setReset && setReset(false)
        }
    }, [reset])

    const watchCompany = form.watch('company')
    const watchLocation = form.watch('location')
    const watchBranch = form.watch('branch')
    const watchDepartment = form.watch('department')

    const watchQuery = {
        company_id: watchCompany,
        location_id: watchLocation,
        branch_id: watchBranch,
        department_id: watchDepartment,
        section_id: form.watch('section'),
        isActive: !form.watch('inactive-emp'),
    }


    const setFilterOptions = (filters: any) => {

        if ('company' in filters.data) {
            const companyData = _.map(filters.data.company, (company) => ({
                value: company.company_id,
                label: company?.company_name ?? 'No Name',
            }))

            setCompanyOptions([
                { value: 999999, label: tEmp('all') },
                ...companyData,
            ])
        }
        if ('location' in filters.data) {
            const locationData = _.map(filters.data.location, (location) => ({
                value: location.location_id,
                label: location?.location_name ?? 'No Name',
            }))
            setLocationOptions([
                { value: 999999, label: tEmp('all') },
                ...locationData,
            ])
        }
        if ('position' in filters.data) {
            const positionData = _.map(filters.data.position, (position) => ({
                value: position.position_id,
                label: position?.position_name ?? 'No Name',
            }))
            setPositionOptions([
                { value: 999999, label: tEmp('all') },
                ...positionData,
            ])
        }
        if ('branch' in filters.data) {
            const branchData = _.map(filters.data.branch, (branch) => ({
                value: branch.branch_id,
                label: branch?.branch_name ?? 'No Name',
            }))
            setBranchOptions([
                { value: 999999, label: tEmp('all') },
                ...branchData,
            ])
        }
        if ('department' in filters.data) {
            const departmentData = _.map(
                filters.data.department,
                (department) => ({
                    value: department.department_id,
                    label: department?.department_name ?? 'No Name',
                }),
            )
            setDepartmentOptions([
                { value: 999999, label: tEmp('all') },
                ...departmentData,
            ])
        }
        if ('section' in filters.data) {
            const sectionData = _.map(filters.data.section, (section) => ({
                value: section.section_id,
                label: section?.section_name ?? 'No Name',
            }))
            setSectionOptions([
                { value: 999999, label: tEmp('all') },
                ...sectionData,
            ])
        }
    }

    const { refetch, employee, loadingEmp } =
        useGetEmployeeByFilters(watchQuery)

    const { allFilters, loadingFilters, refetchAllFilters } =
        useGetAllRoleFilters()

    const { fetchFiltersByCompany, rolesFiltersByCompany } =
        useGetAllRoleFiltersByCompany({ company_id: watchCompany })

    const { fetchFiltersByLocation, rolesFiltersByLocation } =
        useGetAllRoleFiltersByLocation({
            company_id: watchCompany,
            location_id: watchLocation,
        })

    const { fetchFiltersByBranch, rolesFiltersByBranch } =
        useGetAllRoleFiltersByBranch({
            company_id: watchCompany,
            location_id: watchLocation,
            branch_id: watchBranch,
        })

    const { fetchFiltersByDepartment, rolesFiltersByDepartment } =
        useGetAllRoleFiltersByDepartment({
            company_id: watchCompany,
            location_id: watchLocation,
            branch_id: watchBranch,
            department_id: watchDepartment,
        })

    const { showNotification } = useToast()
    const { value, toggle, setFalse, setTrue } = useBoolean()

    useEffect(() => {
        refetchAllFilters()
    }, [])

    useEffect(() => {
        if (watchCompany !== 999999) {
            fetchFiltersByCompany()
        } else {
            refetchAllFilters()
        }
    }, [watchCompany])

    useEffect(() => {
        fetchFiltersByDepartment()
    }, [watchDepartment])

    useEffect(() => {
        if (rolesFiltersByDepartment) {
            setFilterOptions(rolesFiltersByDepartment)
        }
    }, [rolesFiltersByDepartment])

    useEffect(() => {
        fetchFiltersByBranch()
    }, [watchBranch])

    useEffect(() => {
        if (rolesFiltersByBranch) {
            setFilterOptions(rolesFiltersByBranch)
        }
    }, [rolesFiltersByBranch])

    useEffect(() => {
        fetchFiltersByLocation()
    }, [watchLocation])

    useEffect(() => {
        if (rolesFiltersByCompany) {
            setFilterOptions(rolesFiltersByCompany)
        }
    }, [rolesFiltersByCompany])

    useEffect(() => {
        if (rolesFiltersByLocation) {
            setFilterOptions(rolesFiltersByLocation)
        }
    }, [rolesFiltersByLocation])

    useEffect(() => {
        if (!loadingFilters && allFilters && allFilters?.data) {
            setFilterOptions(allFilters)
        }
    }, [allFilters, loadingFilters])

    const handleRemoveFromFinalList = (removedObj: any) => {
        let updatedArr = null
        if (removedObj.employee_id === 999999) {
            updatedArr = finalEmployeeList.filter((emp: any) => {
                return emp.key !== removedObj.key
            })
        } else {
            updatedArr = finalEmployeeList.filter((emp: any) => {
                return emp.employee_id !== removedObj.employee_id
            })
        }

        if (updatedArr) {
            const withIds = updatedArr?.map((emp: any) => ({
                ...emp,
                id: emp?.id,
            }))
            setSelectedRows(withIds)
        }
    }

    const { EmployeePermissionTableColumn } = getEmployeePermissionTableColumn({
        positionOptions,
        locationOptions,
        branchOptions,
        departmentOptions,
        sectionOptions,
        companyOptions,
        handleRemove: handleRemoveFromFinalList,
    })

    const handelOnLoad = () => {
        refetch()
            .then(() => {
                table.toggleAllPageRowsSelected(false)
            })
            .catch((reason) => {
                showNotification({ message: 'Loading employees failed' })
            })
    }

    const handleGetTableObj = useCallback((table: any) => {
        setTable(table)
    }, [])



    const filteredEmployee = employee
        ? employee?.data?.map((emp: any) => ({ ...emp, id: emp?.employee_id }))
        : []

    const handleAddEmployee = () => {
        if (isAllRowSelected) {
            const ALL =
                form.getValues('company') === 999999 &&
                form.getValues('location') === 999999 &&
                form.getValues('branch') === 999999 &&
                form.getValues('department') === 999999 &&
                form.getValues('section') === 999999

            const newObject: any = {
                company_id: form.getValues('company') ?? 999999,
                location_id: form.getValues('location') ?? 999999,
                branch_id: form.getValues('branch') ?? 999999,
                department_id: form.getValues('department') ?? 999999,
                section_id: form.getValues('section') ?? 999999,
                employee_id: 999999,
                emp_ids: _.map(filteredEmployee, (emp) => +emp.employee_id),
                ALL,
            }
            const filterCombination = queryStringGenerator({
                company_id: form.getValues('company') ?? 999999,
                location_id: form.getValues('location') ?? 999999,
                branch_id: form.getValues('branch') ?? 999999,
                department_id: form.getValues('department') ?? 999999,
                section_id: form.getValues('section') ?? 999999,
                employee_id: 999999,
            })
            newObject['key'] = filterCombination

            const hasSameKey = finalEmployeeList.some(
                (emp: any) => emp.key === newObject.key,
            )

            let hasItemsToRemove = false
            finalEmployeeList.forEach((fEmpObj: any) => {
                if (
                    fEmpObj.employee_id !== 999999 &&
                    newObject.emp_ids.includes(fEmpObj.employee_id)
                ) {
                    hasItemsToRemove = true
                }
            })

            if (hasSameKey || hasItemsToRemove) {
                setObjectToAdd(newObject)
                setTrue()
            } else {
                setSelectedRows((prev: any) => [...prev, newObject])
                setFinalEmployeeList((prev: any) => [...prev, newObject])
            }
        } else {
            const selectedRows = table
                .getSelectedRowModel()
                .flatRows.map((fRow: any) => {
                    const filterCombination = queryStringGenerator({
                        company_id: fRow.original.company_id,
                        location_id: fRow.original.location_id,
                        branch_id: fRow.original.branch_id,
                        department_id: fRow.original.department_id,
                        section_id: fRow.original.section_id,
                        employee_id: +fRow.original.employee_id,
                    })
                    return { ...fRow.original, key: filterCombination }
                })

            const hasExistingEmployee = finalEmployeeList.some(
                (itemToCheck: any) =>
                    selectedRows.some((itemToFind: any) => {
                        if (itemToCheck?.ALL) {
                            return true
                        } else {
                            if (itemToCheck?.emp_ids) {
                                return itemToCheck?.emp_ids?.includes(
                                    itemToFind.employee_id,
                                )
                            } else {
                                return (
                                    itemToCheck?.employee_id ===
                                    itemToFind.employee_id
                                )
                            }
                        }
                    }),
            )
            let hasSameEmp = false

            finalEmployeeList.forEach((emp: any) => {
                selectedRows.forEach((newEmp: any) => {
                    if (emp.employee_id) {
                        hasSameEmp = emp?.employee_id === newEmp.employee_id
                    }
                })
            })

            if (hasExistingEmployee || hasSameEmp) {
                setEmployeeListToAdd(selectedRows)
                setTrue()
            } else {
                setSelectedRows((prev: any) => [...prev, ...selectedRows])
                setFinalEmployeeList((prev: any) => [...prev, ...selectedRows])
            }
        }
        table.toggleAllRowsSelected(false)
    }

    const handleOnConfirmReplace = () => {
        // adding all mean it will always be OBJECT
        if (objectToAdd) {
            // all to all ဆို key ပဲ စစ်
            let index = -1

            // all အောက်မှာပါတဲ့ employee index array
            let idToRemove: number[] = []

            finalEmployeeList.forEach((fEmpObj: any) => {
                if (fEmpObj.employee_id === 999999) {
                    index = finalEmployeeList.findIndex(
                        (item: any) => item.key === objectToAdd.key,
                    )
                } else {
                    if (objectToAdd.emp_ids.includes(fEmpObj.employee_id)) {
                        idToRemove = [...idToRemove, +fEmpObj.employee_id]
                    }
                }
            })

            if (index !== -1) {
                let finalEmployeeListCpy = [...finalEmployeeList]
                finalEmployeeListCpy[index] = objectToAdd

                setFinalEmployeeList(finalEmployeeListCpy)
                setSelectedRows(finalEmployeeListCpy)
                setFalse()
                setObjectToAdd(null)
            } else if (idToRemove) {
                let finalEmployeeListCpy = [...finalEmployeeList]

                idToRemove.forEach((empId: number) => {
                    finalEmployeeListCpy = finalEmployeeListCpy.filter(
                        (fEmp: any) => {
                            if (fEmp.employee_id !== 999999) {
                                return fEmp.employee_id !== empId
                            }
                            return true
                        },
                    )
                })
                finalEmployeeListCpy = [...finalEmployeeListCpy, objectToAdd]

                setFinalEmployeeList(finalEmployeeListCpy)
                setSelectedRows(finalEmployeeListCpy)
                setFalse()
                setObjectToAdd(null)
            } else {
                console.info('Object not found in the array.')
            }
        }

        if (!objectToAdd && employeeListToAdd.length > 0) {
            let finalEmpListCpy = [...finalEmployeeList]
            let indexToUpdate = -1

            employeeListToAdd.forEach((newEmpObj: any) => {
                indexToUpdate = finalEmpListCpy.findIndex(
                    (oldEmployee: any) => {
                        if (oldEmployee?.ALL && !oldEmployee?.emp_ids) {
                            return true
                        } else {
                            return oldEmployee?.emp_ids?.includes(
                                newEmpObj.employee_id,
                            )
                        }
                    },
                )
            })

            if (indexToUpdate > -1) {
                finalEmpListCpy = finalEmpListCpy.filter(
                    (_, i) => i !== indexToUpdate,
                )
                finalEmpListCpy = [...finalEmpListCpy, ...employeeListToAdd]
            }
            setFinalEmployeeList(finalEmpListCpy)
            setSelectedRows(finalEmpListCpy)
            setFalse()
            setEmployeeListToAdd([])
        }
    }

    return (
        <>
            <AccordionItem
                value="employee-permission"
                className="border-0 bg-primary-50 rounded-[6px] border-t border-t-primary-200 border-r-0 border-l-0 hover:no-underline"
            >
                <AccordionTrigger className="px-[16px] md:px-[40px] rounded-2xl">
                    <span className="font-semibold line-clamp-1 text-left">
                        {t('employee-permission')}
                    </span>
                </AccordionTrigger>

                <AccordionContent
                    value="role"
                    className="bg-white p-4 space-y-10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <Form {...form}>
                            <form className="space-y-4 lg:space-y-5 w-full">
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                {t('company')}
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                'w-full justify-between',
                                                                !field.value &&
                                                                    'text-muted-foreground',
                                                            )}
                                                        >
                                                            {field.value
                                                                ? companyOptions.find(
                                                                      (
                                                                          company,
                                                                      ) =>
                                                                          company.value ===
                                                                          field.value,
                                                                  )?.label
                                                                : tEmp('all')}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder={tEmp(
                                                                'search-company',
                                                            )}
                                                            className="h-9"
                                                        />
                                                        <CommandEmpty>
                                                            No company found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            <ScrollArea
                                                                className="w-full rounded-md"
                                                                style={{
                                                                    height:
                                                                        Math.min(
                                                                            7,
                                                                            companyOptions.length,
                                                                        ) * 34,
                                                                }}
                                                            >
                                                                {companyOptions.map(
                                                                    (
                                                                        company,
                                                                    ) => (
                                                                        <CommandItem
                                                                            value={
                                                                                company.label
                                                                            }
                                                                            key={
                                                                                company.value
                                                                            }
                                                                            onSelect={() => {
                                                                                form.setValue(
                                                                                    'company',
                                                                                    company.value,
                                                                                )
                                                                            }}
                                                                        >
                                                                            {
                                                                                company.label
                                                                            }
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'ml-auto h-4 w-4',
                                                                                    company.value ===
                                                                                        field.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0',
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ),
                                                                )}
                                                            </ScrollArea>
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                {t('location')}
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                'w-full justify-between',
                                                                !field.value &&
                                                                    'text-muted-foreground',
                                                            )}
                                                        >
                                                            {field.value
                                                                ? locationOptions.find(
                                                                      (
                                                                          location,
                                                                      ) =>
                                                                          location.value ===
                                                                          field.value,
                                                                  )?.label
                                                                : tEmp('all')}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder={tEmp(
                                                                'search-location',
                                                            )}
                                                            className="h-9"
                                                        />
                                                        <CommandEmpty>
                                                            No location found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            <ScrollArea
                                                                className="w-full rounded-md"
                                                                style={{
                                                                    height:
                                                                        Math.min(
                                                                            7,
                                                                            locationOptions.length,
                                                                        ) * 34,
                                                                }}
                                                            >
                                                                {locationOptions.map(
                                                                    (
                                                                        location,
                                                                    ) => (
                                                                        <CommandItem
                                                                            value={
                                                                                location.label
                                                                            }
                                                                            key={
                                                                                location.value
                                                                            }
                                                                            onSelect={() => {
                                                                                form.setValue(
                                                                                    'location',
                                                                                    location.value,
                                                                                )
                                                                            }}
                                                                        >
                                                                            {
                                                                                location.label
                                                                            }
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'ml-auto h-4 w-4',
                                                                                    location.value ===
                                                                                        field.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0',
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ),
                                                                )}
                                                            </ScrollArea>
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="branch"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>{t('branch')}</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                'w-full justify-between',
                                                                !field.value &&
                                                                    'text-muted-foreground',
                                                            )}
                                                        >
                                                            {field.value
                                                                ? branchOptions.find(
                                                                      (
                                                                          branch,
                                                                      ) =>
                                                                          branch.value ===
                                                                          field.value,
                                                                  )?.label
                                                                : tEmp('all')}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder={tEmp(
                                                                'search-branch',
                                                            )}
                                                            className="h-9"
                                                        />
                                                        <CommandEmpty>
                                                            No branch found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            <ScrollArea
                                                                className="w-full rounded-md"
                                                                style={{
                                                                    height:
                                                                        Math.min(
                                                                            7,
                                                                            branchOptions.length,
                                                                        ) * 34,
                                                                }}
                                                            >
                                                                {branchOptions.map(
                                                                    (
                                                                        branch,
                                                                    ) => (
                                                                        <CommandItem
                                                                            value={
                                                                                branch.label
                                                                            }
                                                                            key={
                                                                                branch.value
                                                                            }
                                                                            onSelect={() => {
                                                                                form.setValue(
                                                                                    'branch',
                                                                                    branch.value,
                                                                                )
                                                                            }}
                                                                        >
                                                                            {
                                                                                branch.label
                                                                            }
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'ml-auto h-4 w-4',
                                                                                    branch.value ===
                                                                                        field.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0',
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ),
                                                                )}
                                                            </ScrollArea>
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>
                                                    {t('department')}
                                                </FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    'w-full justify-between',
                                                                    !field.value &&
                                                                        'text-muted-foreground',
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? departmentOptions.find(
                                                                          (
                                                                              department,
                                                                          ) =>
                                                                              department.value ===
                                                                              field.value,
                                                                      )?.label
                                                                    : tEmp(
                                                                          'all',
                                                                      )}
                                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0">
                                                        <Command>
                                                            <CommandInput
                                                                placeholder={tEmp(
                                                                    'search-department',
                                                                )}
                                                                className="h-9"
                                                            />
                                                            <CommandEmpty>
                                                                No department
                                                                found.
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                <ScrollArea
                                                                    style={{
                                                                        height:
                                                                            Math.min(
                                                                                7,
                                                                                departmentOptions.length,
                                                                            ) *
                                                                            34,
                                                                    }}
                                                                    className={`w-full rounded-md`}
                                                                >
                                                                    {departmentOptions.map(
                                                                        (
                                                                            department,
                                                                        ) => (
                                                                            <CommandItem
                                                                                value={
                                                                                    department.label
                                                                                }
                                                                                key={
                                                                                    department.value
                                                                                }
                                                                                onSelect={() => {
                                                                                    form.setValue(
                                                                                        'department',
                                                                                        department.value,
                                                                                    )
                                                                                }}
                                                                            >
                                                                                {
                                                                                    department.label
                                                                                }
                                                                                <CheckIcon
                                                                                    className={cn(
                                                                                        'ml-auto h-4 w-4',
                                                                                        department.value ===
                                                                                            field.value
                                                                                            ? 'opacity-100'
                                                                                            : 'opacity-0',
                                                                                    )}
                                                                                />
                                                                            </CommandItem>
                                                                        ),
                                                                    )}
                                                                </ScrollArea>
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="section"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                {t('section')}
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                'w-full justify-between',
                                                                !field.value &&
                                                                    'text-muted-foreground',
                                                            )}
                                                        >
                                                            {field.value
                                                                ? sectionOptions.find(
                                                                      (
                                                                          section,
                                                                      ) =>
                                                                          section.value ===
                                                                          field.value,
                                                                  )?.label
                                                                : tEmp('all')}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder={tEmp(
                                                                'search-section',
                                                            )}
                                                            className="h-9"
                                                        />
                                                        <CommandEmpty>
                                                            No section found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            <ScrollArea
                                                                style={{
                                                                    height:
                                                                        Math.min(
                                                                            7,
                                                                            sectionOptions.length,
                                                                        ) * 34,
                                                                }}
                                                                className="w-full h-[300px] rounded-md"
                                                            >
                                                                {sectionOptions.map(
                                                                    (
                                                                        section,
                                                                    ) => (
                                                                        <CommandItem
                                                                            value={
                                                                                section.label
                                                                            }
                                                                            key={
                                                                                section.value
                                                                            }
                                                                            onSelect={() => {
                                                                                form.setValue(
                                                                                    'section',
                                                                                    section.value,
                                                                                )
                                                                            }}
                                                                        >
                                                                            {
                                                                                section.label
                                                                            }
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'ml-auto h-4 w-4',
                                                                                    section.value ===
                                                                                        field.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0',
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ),
                                                                )}
                                                            </ScrollArea>
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="inactive-emp"
                                    render={({ field }) => (
                                        <FormItem className="flex justify-between items-center space-y-0">
                                            <div className="flex items-center gap-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>
                                                    <p className="m-0">
                                                        {tEmp('inactive-emp')}
                                                    </p>
                                                </FormLabel>
                                            </div>

                                            <Button
                                                variant="primary"
                                                type="button"
                                                className="mt-0"
                                                onClick={handelOnLoad}
                                            >
                                                {tEmp('load')}
                                            </Button>
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                        <div className="lg:col-span-2 flex flex-col justify-between gap-2">
                            <DataTable
                                handleGetTableObj={handleGetTableObj}
                                className={
                                    'h-[395px] overflow-y-auto border with-select'
                                }
                                columns={EmployeeSelectorColumn}
                                data={filteredEmployee}
                                loading={loadingEmp}
                                handleAllRowSelection={handleGetAllRowSelected}
                            />
                            <div className="flex justify-center">
                                <Button
                                    variant="primary"
                                    onClick={handleAddEmployee}
                                >
                                    <PlusIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <DataTable
                            key={String(value)}
                            className="with-select with-action-column"
                            columns={EmployeePermissionTableColumn}
                            data={finalEmployeeList}
                        />
                    </div>
                </AccordionContent>

                <Confirm
                    type={'info'}
                    open={value}
                    toggle={toggle}
                    message={t('replace-des')}
                    title={t('replace-title')}
                    isLoading={false}
                    fun={handleOnConfirmReplace}
                />
            </AccordionItem>
        </>
    )
}

export default EmployeePermissionTable
