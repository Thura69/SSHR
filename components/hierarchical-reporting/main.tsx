'use client'

import { FancyMultiSelect } from '@/components/ui/custom/multi-select'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { FormProvider, useForm } from 'react-hook-form'
import React, { Key, useEffect, useState } from 'react'
import { ComboBox } from '@/components/ui/with-form/combo-box'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useGetCompanyOptions } from '@/service/query-hooks/common'
import * as _ from 'lodash'
import RequestFrom from '@/components/hierarchical-reporting/request-from'
import CheckIsCc from '@/components/hierarchical-reporting/check-is-cc'
import dynamic from 'next/dynamic'
import { getChangesFromTwoObjects, parsedCheckTree } from '@/lib/utils'
import RequestTo from '@/components/hierarchical-reporting/request-to'
import {
    useGetHierarchicalPositions,
    useGetRequestType,
    useMutateHierarchicalReport,
    useUpdateReport,
} from '@/service/query-hooks/use-hierarchical-report'
import useToast from '@/hooks/use-toast'
import CcModal from '@/components/hierarchical-reporting/cc-modal'
import { useRouter } from 'next/navigation'
import hierarchicalReportStore from '@/state/zustand/hierarchical-report'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox } from 'antd'
import { Breadcrumbs } from '../common/pagers/breadcrumbs'
import menuStore from '@/state/zustand/menu'
import { createAudit, updateAudit } from '@/lib/audit-trail-api'
import useUserCookie from '@/hooks/use-user'
import { ReportPosition } from '@/app/organisation-structure/hierarchical-reporting/edit/[request_id]/page'
import { MainScreenProps } from '@/types/hierarchical-reporting'

const DndTable = dynamic(
    () => import('@/components/hierarchical-reporting/dnd-table'),
    { ssr: false },
)

const RequestTypes = [
    {
        id: 'Leave',
        value: 'Leave',
        label: 'Leave',
    },
    {
        id: 'Org Chart',
        value: 'Org Chart',
        label: 'Org Chart',
    },
    {
        id: 'Overtime',
        value: 'Overtime',
        label: 'Overtime',
    },
    {
        id: 'Performance',
        value: 'Performance',
        label: 'Performance',
    },
    {
        id: 'Performance Review',
        value: 'Performance Review',
        label: 'Performance Review',
    },
    {
        id: 'Training',
        value: 'Training',
        label: 'Training',
    },
    {
        id: 'Travel Expense Claim',
        value: 'Travel Expense Claim',
        label: 'Travel Expense Claim',
    },
    {
        id: 'Travel Request',
        value: 'Travel Request',
        label: 'Travel Request',
    },
]

const HierarchicalReportingSchema = yup.object({
    company: yup.string().required(),
    requestType: yup.array().min(1),
    cc_location: yup.string().required(),
    cc_branch: yup.string().required(),
    cc_jobgrade: yup.string(),
    from_branch: yup.string(),
    from_location: yup.string(),
    to_branch: yup.string(),
    to_location: yup.string(),
    'attach-cc': yup.boolean(),
    'send-email-by': yup.string(),
})

const MainScreen = (props: MainScreenProps) => {
    const isEdit = props.isEdit
    const request_id = isEdit && props.request_id
    const initialCompanyId = isEdit && props.initialCompanyId
    const initialFromLocationId = isEdit && props.initialFromLocationId
    const initialFromBranchId = isEdit && props.initialFromBranchId

    const initialToLocationId = isEdit && props.initialToLocationId
    const initialToBranchId = isEdit && props.initialToBranchId
    const initialFromSelectedTree = isEdit && props.initialFromSelectedTree
    const initialToSelectedTree = isEdit && props.initialToSelectedTree
    const initialRequestTypes = isEdit && props.initialRequestTypes
    const request_group_id = isEdit && props.Request_Group_ID

    const initialCCLocationId = isEdit && props.initialCCLocationId
    const initialCCBranchId = isEdit && props.initialCCBranchId
    const initialCCJobGradeId = isEdit && props.initialCCJobGradeId
    const checkedCC = isEdit && props.checkedCC
    const Request_StepbyStep = isEdit && props.Request_StepbyStep
    const oldData = isEdit && props.oldData
    const toOrderMeta = isEdit && props.toOrderMeta

    const editType = isEdit && props.editType

    const form = useForm({
        resolver: yupResolver(HierarchicalReportingSchema),
        defaultValues: {
            'send-email-by':
                isEdit && !Request_StepbyStep ? 'all' : 'step-by-step',
            'attach-cc': false,
            company: '',
            from_location: '',
            from_branch: '',
            to_location: '',
            to_branch: '',
            cc_location: '',
            cc_jobgrade: '',
        },
    })

    useEffect(() => {
        if (isEdit) {
            if (initialCompanyId) {
                form.setValue('company', initialCompanyId)
            }
            if (initialFromBranchId) {
                form.setValue('from_branch', initialFromBranchId)
            }
            if (initialFromLocationId) {
                form.setValue('from_location', initialFromLocationId)
            }
            if (initialToBranchId) {
                form.setValue('to_branch', initialToBranchId)
            }
            if (initialToLocationId) {
                form.setValue('to_location', initialToLocationId)
            }
            if (initialCCLocationId) {
                form.setValue('cc_location', initialCCLocationId)
            }
            if (initialCCBranchId) {
                form.setValue('cc_branch', initialCCBranchId)
            }
            if (initialCCJobGradeId) {
                form.setValue('cc_jobgrade', initialCCJobGradeId)
            }
            if (checkedCC) {
                form.setValue('attach-cc', checkedCC)
            }
            if (!!Request_StepbyStep) {
                form.setValue('send-email-by', 'step-by-step')
            } else if (!Request_StepbyStep) {
                form.setValue('send-email-by', 'all')
            }
        }
    }, [
        isEdit,
        initialCompanyId,
        initialFromBranchId,
        initialFromLocationId,
        initialToBranchId,
        initialToLocationId,
        initialCCLocationId,
        initialCCBranchId,
        initialCCJobGradeId,
        Request_StepbyStep,
        checkedCC,
    ])

    const router = useRouter()
    const [selectedRequestType, setSelectedRequestType] = useState<
        { value: string; label: string }[]
    >(initialRequestTypes ? initialRequestTypes : [])
    const [showCCModel, setShowCCModel] = useState<boolean>(false)

    const [requestFromPositions, setRequestFromPositions] = useState<any[]>([])

    const [requestToPositions, setRequestToPositions] = useState<any[]>([])

    const [requestFromKeys, setRequestFromKeys] = useState<React.Key[]>(() =>
        initialFromSelectedTree ? initialFromSelectedTree : [],
    )
    const [requestToKeys, setRequestToKeys] = useState<React.Key[]>(() =>
        initialToSelectedTree ? initialToSelectedTree : [],
    )

    const ccEmployeeList = hierarchicalReportStore(
        (state) => state.ccEmployees.list,
    )
    const resetCC = hierarchicalReportStore((state) => state.resetCC)

    const watchCompany = form.watch('company')
    const watchFromLocation = form.watch('from_location')
    const watchFromBranch = form.watch('from_branch')
    const watchToLocation = form.watch('to_location')
    const watchToBranch = form.watch('to_branch')

    const { data: fromPositions } = useGetHierarchicalPositions({
        company_id: watchCompany,
        branch_id: watchFromBranch,
        location_id: watchFromLocation,
        customQuery: 'from_positions',
    })

    const { data: toPositions } = useGetHierarchicalPositions({
        company_id: watchCompany,
        branch_id: watchToBranch,
        location_id: watchToLocation,
        customQuery: 'to_positions',
    })

    const watchShowCCButton = form.watch('attach-cc')
    const { data: requestTypes } = useGetRequestType()
    const { data: companyData } = useGetCompanyOptions({})
    const { showNotification } = useToast()
    const { mutate: createReport } = useMutateHierarchicalReport()

    const { mutate: updateReport } = useUpdateReport()

    useEffect(() => {
        if (isEdit && fromPositions && toPositions) {
            handleAddRowsToDndTable()
        }
    }, [isEdit, fromPositions, toPositions])

    const validatePositionsCheck = () => {
        let hasOrgChart = false
        selectedRequestType.forEach((requestType) => {
            if (requestType.value === 'Org Chart') {
                hasOrgChart = true
            }
        })

        const elementsWithDash =
            requestToKeys &&
            requestToKeys.filter((item: any) => item.includes('-'))

        const toPositionCount = elementsWithDash.length
        if (hasOrgChart && toPositionCount > 1) {
            showNotification({
                message: 'Cannot select more than one position for Org Chart',
                type: 'danger',
            })
            return false
        }

        if (requestToKeys.length === 0 && requestFromKeys.length === 0) {
            showNotification({
                message: 'Select Request From position and request to position',
                type: 'danger',
            })
            return false
        } else if (requestFromKeys.length === 0) {
            showNotification({
                message: 'select Request From position',
                type: 'danger',
            })
            return false
        } else if (requestToKeys.length === 0) {
            showNotification({
                message: 'Select Request To position',
                type: 'danger',
            })
            return false
        }
        return true
    }

    const handleOnAdd = () => {
        const isValid = validatePositionsCheck()

        if (!isValid) return

        handleAddRowsToDndTable()
    }

    const handleAddRowsToDndTable = () => {
        const from_position_full_data: any[] = []
        const to_position_full_data: any[] = []

        const formatted_FromPositions = parsedCheckTree(fromPositions?.data)
        const formatted_ToPositions = parsedCheckTree(toPositions?.data)

        const formattedFromPositionList_flattenToDepartments = _.flatten(
            formatted_FromPositions?.map(
                (departments: any) => departments?.children,
            ),
        )

        const formattedFromPositionList_flattenToSections = _.flatten(
            formattedFromPositionList_flattenToDepartments?.map(
                (sections: any) => sections?.children,
            ),
        )

        if (requestFromKeys.length > 0) {
            formattedFromPositionList_flattenToSections?.forEach((emp: any) => {
                requestFromKeys?.forEach((selectedEmp: Key) => {
                    if (selectedEmp === String(emp?.key)) {
                        from_position_full_data.push(emp)
                    }
                })
            })
        }

        const formattedToPositionList_flattenToDepartments = _.flatten(
            formatted_ToPositions?.map(
                (departments: any) => departments?.children,
            ),
        )

        const formattedToPositionList_flattenToSections = _.flatten(
            formattedToPositionList_flattenToDepartments?.map(
                (sections: any) => sections?.children,
            ),
        )

        if (requestToKeys.length > 0) {
            formattedToPositionList_flattenToSections?.forEach((emp: any) => {
                requestToKeys?.forEach((selectedEmp: Key) => {
                    if (selectedEmp === String(emp?.key)) {
                        to_position_full_data.push(emp)
                    }
                })
            })
        }

        function customSort(a: ReportPosition, b: ReportPosition) {
            const orderA = (toOrderMeta && toOrderMeta[a.Position_ID]) || 0
            const orderB = (toOrderMeta && toOrderMeta[b.Position_ID]) || 0
            return orderA - orderB
        }

        const sortedToPosition = to_position_full_data.sort(customSort)
        setRequestFromPositions(from_position_full_data)
        setRequestToPositions(sortedToPosition)
    }

    const handleShowCCModel = () => {
        setShowCCModel((prev) => !prev)
    }

    const handleBack = () => {
        router.back()
    }

    const selectedMenu = menuStore((state) => state.selectedMenu)
    const selectedSubMenu = menuStore((state) => state.selectedSubMenu)

    const user = useUserCookie()

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: 'Hierarchical Reporting',
        Parent_Menu_ID: selectedMenu?.menu_id!,
        Sub_Menu_ID: selectedSubMenu?.menu_id!,
        Record_Name: selectedSubMenu!.menu_name!,
    }

    const transformTo_fromPayload = (data: any) => {
        const fromObjWithoutRequestType = data?.map((d: any) => {
            const obj: any = {}

            if (d.Location_ID) {
                obj.Request_From_Location = d.Location_ID
            }
            if (d.Department_ID) {
                obj.Request_From_Department = d.Department_ID
            }
            if (d.Section_ID) {
                obj.Request_From_Section = d.Section_ID
            }
            if (d.Position_ID) {
                obj.Request_From_Position = d.Position_ID
            }
            if (d.Branch_ID) {
                obj.Request_From_Branch = d.Branch_ID
            }
            if (d.Company_ID) {
                obj.Request_From_Company = +form.getValues('company')
            }

            if (form.getValues('send-email-by') === 'step-by-step') {
                obj.Request_StepbyStep = true
            } else {
                obj.Request_StepbyStep = false
            }

            return obj
        })

        const list: any[] = []

        selectedRequestType?.forEach((type) => {
            fromObjWithoutRequestType.forEach((obj: any) => {
                const newObj = {
                    ...obj,
                    Request_Type: type.value,
                }
                list.push(newObj)
            })
        })
        return list
    }

    const transformTo_toPayload = (data: any) => {
        return (
            data?.length > 0 &&
            data?.map((d: any, index: number) => {
                const obj: any = {}

                if (d.Location_ID) {
                    obj.Request_To_Location = d.Location_ID
                }
                if (d.Department_ID) {
                    obj.Request_To_Department = d.Department_ID
                }
                if (d.Section_ID) {
                    obj.Request_To_Section = d.Section_ID
                }
                if (d.Position_ID) {
                    obj.Request_To_Position = d.Position_ID
                }
                if (d.Branch_ID) {
                    obj.Request_To_Branch = d.Branch_ID
                }
                if (d.Company_ID) {
                    obj.Request_To_Company = +form.getValues('company')
                }

                obj.Order = index + 1

                return obj
            })
        )
    }

    const transformTo_ccPayload = (data: any) => {
        const ccList = data?.map((d: any, index: number) => {
            const obj: any = {}

            if (d.Location_ID) {
                obj.request_to_company = d.Location_ID
            }
            if (d.Department_ID) {
                obj.request_to_department = d.Department_ID
            }
            if (d.Section_ID) {
                obj.request_to_section = d.Section_ID
            }
            if (d.Position_ID) {
                obj.request_to_position = d.Position_ID
            }
            if (d.Branch_ID) {
                obj.request_to_branch = d.Branch_ID
            }
            if (d.Company_ID) {
                obj.request_to_company = +form.getValues('company')
            }
            if (form.getValues('cc_jobgrade')) {
                const stringV = form.getValues(
                    'cc_jobgrade',
                ) as unknown as string
                obj.job_grade_id = +stringV
            }
            return obj
        })

        return ccList
    }
    const resetFields = () => {
        form.reset()
        setSelectedRequestType([])
        setRequestFromPositions([])
        setRequestToPositions([])
        setRequestFromKeys([])
        setRequestToKeys([])
        form.setValue('send-email-by', 'step-by-step')
        resetCC()
    }

    const handleOnSubmit = () => {
        const isCC = form.getValues('attach-cc')

        if (!selectedRequestType || selectedRequestType?.length <= 0) {
            showNotification({
                message: 'please select request type',
                type: 'danger',
            })
            return
        }

        if (!form.getValues('company')) {
            showNotification({
                message: 'please select company',
                type: 'danger',
            })
            return
        }

        validatePositionsCheck()

        if (isCC && (!ccEmployeeList || ccEmployeeList.length <= 0)) {
            showNotification({
                message: 'please select cc employee',
                type: 'danger',
            })
            return
        }

        // if (!requestToPositions || requestToPositions.length <= 0) {
        //     showNotification({
        //         message: 'please confirm request to positions',
        //         type: 'danger',
        //     })
        //     return
        // }

        const payload = {
            from: transformTo_fromPayload(requestFromPositions),
            to: transformTo_toPayload(requestToPositions),
            cc: isCC ? transformTo_ccPayload(ccEmployeeList) : [],
            IsCC: isCC,
            Request_Group_ID: request_group_id,
            Type: editType,
        }

        if (isEdit && request_id) {
            const { afterValue, beforeValue } = getChangesFromTwoObjects(
                oldData,
                payload,
            )
            updateReport(
                { id: request_id, data: payload },
                {
                    onSuccess: () => {
                        updateAudit({
                            ...auditPayload,
                            ValueBefore: beforeValue,
                            ValueAfter: afterValue,
                        }).then(() => handleBack())
                    },
                },
            )
        } else {
            createReport(payload, {
                onSuccess: () => {
                    createAudit({
                        ...auditPayload,
                        ValueAfter: payload,
                    }).then(() => {
                        resetFields()
                    })
                },
            })
        }
    }

    return (
        <section className={'p-4'}>
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
                        href: '/organisation-structure/hierarchical-reporting',
                    },
                    {
                        // @ts-ignore
                        title: 'Hierarchical Reporting Entry',
                        href: '',
                    },
                ]}
            />
            <FormProvider {...form}>
                <div className={'h-full w-full space-y-2 mt-3'}>
                    <h1 className={'font-bold text-2xl'}>
                        Hierarchical Reporting Entry
                    </h1>{' '}
                    <Form {...form}>
                        <form className={'space-y-4'}>
                            <section className={'grid lg:grid-cols-2 gap-x-4'}>
                                <div className={'pt-2 space-y-2'}>
                                    <Label className={'mb-0 pb-0'}>
                                        Request Type
                                        <span className="text-red-500"> *</span>
                                    </Label>
                                    <FancyMultiSelect
                                        disable={isEdit}
                                        selected={selectedRequestType}
                                        setSelected={setSelectedRequestType}
                                        options={RequestTypes ?? []}
                                    />
                                </div>

                                <div className={'mt-2'}>
                                    <FormField
                                        control={form.control}
                                        name="company"
                                        render={({ field }) => (
                                            <ComboBox
                                                disable={isEdit}
                                                isRequire
                                                label={'Company'}
                                                form={form}
                                                field={field}
                                                options={companyData ?? []}
                                            />
                                        )}
                                    />
                                </div>
                            </section>

                            <section className={'grid lg:grid-cols-2 gap-4'}>
                                <RequestFrom
                                    disable={isEdit}
                                    checkedKeys={requestFromKeys}
                                    setCheckedKeys={setRequestFromKeys}
                                />
                                <div className={'border rounded-16 p-4'}>
                                    <RequestTo
                                        checkedKeys={requestToKeys}
                                        setCheckedKeys={setRequestToKeys}
                                    />

                                    <div className="flex justify-center gap-4 mt-4">
                                        <Button
                                            className="w-[80px] max-w-[100px]"
                                            variant="primary"
                                            onClick={handleOnAdd}
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            className="w-[80px] max-w-[100px]"
                                            variant="outline"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </section>

                            <DndTable
                                key={JSON.stringify(requestToPositions)}
                                initialList={requestToPositions}
                                setOrderedList={setRequestToPositions}
                                setRequestToKeys={setRequestToKeys}
                            />

                            <div className="flex justify-between items-center">
                                <CheckIsCc />
                                <div className={'flex items-center gap-4'}>
                                    <FormField
                                        control={form.control}
                                        name="attach-cc"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center gap-2">
                                                <FormControl>
                                                    {/* <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    /> */}
                                                    <Checkbox
                                                        checked={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel className="pb-2">
                                                    Attach CC
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />

                                    {watchShowCCButton ? (
                                        <Button
                                            type="button"
                                            variant={'outline'}
                                            onClick={handleShowCCModel}
                                        >
                                            Select CC
                                        </Button>
                                    ) : null}
                                </div>
                            </div>

                            <CcModal
                                setShowCCModel={setShowCCModel}
                                showCCModel={showCCModel}
                            />
                        </form>
                    </Form>
                    <div className="flex justify-center gap-4 mt-4">
                        <Button
                            onClick={handleOnSubmit}
                            className="w-[80px] max-w-[100px]"
                            variant="primary"
                        >
                            {isEdit ? 'Update' : 'Save'}
                        </Button>
                        <Button
                            onClick={handleBack}
                            className="w-[80px] max-w-[100px]"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </FormProvider>
        </section>
    )
}

export default MainScreen
