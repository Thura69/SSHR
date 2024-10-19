export type MainScreenProps =
    | {
    isEdit: false
}
    | {
    isEdit: true
    request_id: string
    initialFromLocationId: string
    initialFromBranchId: string
    initialCompanyId: string
    initialToLocationId: string
    initialToBranchId: string
    initialRequestTypes: any[]
    initialFromSelectedTree: string[]
    initialToSelectedTree: string[]
    editType: 'GROUP' | 'INDIVIDUAL' | null
    Request_Group_ID: number

    initialCCLocationId: string
    initialCCBranchId: string
    initialCCJobGradeId: string
    checkedCC: boolean
    Request_StepbyStep: boolean
    oldData: any
    toOrderMeta: Record<string, number>
}

export interface RequestFromProps {
    checkedKeys: any
    setCheckedKeys: any
    disable?: boolean
}

export interface RequestToProps {
    checkedKeys: any
    setCheckedKeys: any
}
