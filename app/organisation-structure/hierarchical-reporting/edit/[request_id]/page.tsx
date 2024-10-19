'use client'

import isAuth from '@/components/auth/components/protected-route'
import MainScreen from '@/components/hierarchical-reporting/main'
import {
    useGetCCById,
    useGetHierarchicalReportById,
} from '@/service/query-hooks/use-hierarchical-report'
import hierarchicalReportStore from '@/state/zustand/hierarchical-report'
import { useParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect } from 'react'
import * as _ from 'lodash'
import PageLoader from '@/components/common/loaders/page-loader'

export interface ReportPosition {
    Branch_ID: number
    Branch_Name: string
    Company_ID: number
    Company_Name: string
    Department_ID: number
    Department_Name: string
    Location_ID: number
    Location_Name: string
    Position_ID: string
    Position_Name: string
    Section_ID: number
    Section_Name: string
    disabled?: any
    key: string
    title: string
}

const EditHierarchicalReport = () => {
    const params = useParams<{ request_id: string }>()
    const request_id = params.request_id
    let [editType] = useQueryState('type')
    let castedEditType = editType as 'INDIVIDUAL' | 'GROUP'
    const {
        data: reportByIdData,
        refetch: fetchDetail,
        isLoading: fetchingDetail,
    } = useGetHierarchicalReportById(request_id, castedEditType)
    const {
        data: ccDataById,
        refetch: fetchCC,
        isLoading: fetchingCC,
    } = useGetCCById(request_id, castedEditType)

    useEffect(() => {
        if (request_id && editType && castedEditType.includes(editType)) {
            fetchDetail()
            fetchCC()
        }
    }, [request_id, editType])

    const toOrderMeta = reportByIdData ? reportByIdData.data.to.orderMeta : {}

    const requestedFromBranchId =
        reportByIdData && reportByIdData?.data?.from?.option?.Branch_ID
    const requestedFromCompanyId =
        reportByIdData && reportByIdData?.data?.from?.option?.Company_ID
    const requestedFromLocationId =
        reportByIdData && reportByIdData?.data?.from?.option?.Location_ID
    const Request_Group_ID =
        reportByIdData && reportByIdData?.data?.Request_Group_ID

    const requestedToBranchId =
        reportByIdData && reportByIdData?.data?.to?.option?.Branch_ID
    const requestedToLocationId =
        reportByIdData && reportByIdData?.data?.to?.option?.Location_ID

    const Request_StepbyStep =
        reportByIdData && reportByIdData?.data?.Request_StepbyStep

    const requestTypes =
        reportByIdData &&
        reportByIdData?.data?.requestTypes?.map(
            (type: { Request_Type: string }) => ({
                value: type.Request_Type,
                label: type.Request_Type,
            }),
        )

    const saveCCEmployees = hierarchicalReportStore(
        (state) => state.saveCCEmployees,
    )

    const ccTreeKeys = new Set<string>()

    const transformCCList = () => {
        const checkedCCFullDataList: any[] = []

        ccDataById?.data?.tree?.map((department: any) => {
            return {
                ...department,

                children: department?.children?.map((section: any) => {
                    return {
                        ...section,

                        children: section?.children?.map((position: any) => {
                            if (position.Section_ID) {
                                ccTreeKeys.add(position.Position_ID)
                            }
                            checkedCCFullDataList.push(position)
                            return {
                                ...position,
                                key: position?.Position_ID,
                                title: position?.Position_Name,
                            }
                        }),
                    }
                }),
            }
        })

        return checkedCCFullDataList
    }

    const checkedCC =
        ccDataById?.data && !_.isEmpty(ccDataById?.data) && transformCCList()

    const ccLocationId =
        ccDataById &&
        'result' in ccDataById?.data &&
        ccDataById?.data?.result[0]?.Request_To_Location
    const ccBranchId =
        ccDataById && 'result' in ccDataById?.data
            ? ccDataById?.data?.result[0]?.Request_To_Branch
            : undefined
    const ccJobGradeId =
        ccDataById && 'result' in ccDataById?.data
            ? ccDataById?.data?.result[0]?.Job_Grade_ID
            : undefined

    useEffect(() => {
        if (ccLocationId && checkedCC && ccBranchId) {
            const ccList = transformCCList()
            const payload = {
                ccBranchId: ccBranchId,
                ccEmployees: {
                    treeKeys: Array.from(ccTreeKeys),
                    list: ccList,
                },
                ccJobGrade: ccJobGradeId ?? undefined,
                ccLocationId: ccLocationId,
            }

            saveCCEmployees(payload)
        }
    }, [checkedCC, ccLocationId, ccBranchId, ccJobGradeId])

    const initialSelectedFromKeys = new Set<string>()
    const initialSelectedToKeys = new Set<string>()

    reportByIdData &&
        reportByIdData?.data?.from?.tree?.forEach((department: any) => {
            if (department?.Department_ID) {
                initialSelectedFromKeys.add('d_' + department?.Department_ID)
            }
            department?.children?.map((section: any) => {
                if (section?.Section_ID) {
                    initialSelectedFromKeys.add('s_' + section?.Section_ID)
                }

                section?.children?.map((position: any) => {
                    if (position?.Position_ID) {
                        initialSelectedFromKeys.add('' + position?.Position_ID)
                    }
                })
            })
        })

    reportByIdData &&
        reportByIdData?.data?.to?.tree?.forEach((department: any) => {
            department?.children?.map((section: any) => {
                section?.children?.map((position: any) => {
                    if (position?.Position_ID) {
                        initialSelectedToKeys.add('' + position?.Position_ID)
                    }
                })
            })
        })

    const defaultValues = {
        initialFromLocationId: requestedFromLocationId,
        initialFromBranchId: requestedFromBranchId,
        initialCompanyId: requestedFromCompanyId,
        initialToLocationId: requestedToLocationId,
        initialToBranchId: requestedToBranchId,
        initialFromSelectedTree: Array.from(initialSelectedFromKeys),
        initialToSelectedTree: Array.from(initialSelectedToKeys),
        initialRequestTypes: requestTypes,
        editType: castedEditType,
        Request_Group_ID: Request_Group_ID,

        initialCCLocationId: ccLocationId,
        initialCCBranchId: ccBranchId,
        initialCCJobGradeId: ccJobGradeId,
        checkedCC: !!checkedCC,
        Request_StepbyStep,
        oldData: {
            ...reportByIdData?.data,
            ...ccDataById?.data,
        },
        toOrderMeta,
    }

    const isLoading = fetchingCC || fetchingDetail

    if (isLoading) {
        return <PageLoader />
    }

    return (
        <MainScreen
            isEdit={true}
            request_id={params.request_id}
            {...defaultValues}
        />
    )
}

export default isAuth(EditHierarchicalReport)
