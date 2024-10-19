import { create } from 'zustand'

interface CCEmployees {
    treeKeys: Array<string> | null
    list: Array<Record<any, any>> | null
}

type NullorStringorNumberorUndefined = string | number | null | undefined

type State = {
    ccEmployees: CCEmployees
    ccLocationId: NullorStringorNumberorUndefined
    ccBranchId: NullorStringorNumberorUndefined
    ccJobGrade: NullorStringorNumberorUndefined
}

type Action = {
    saveCCEmployees: (ccEmployees: State) => void
    resetCC: () => void
}

const hierarchicalReportStore = create<State & Action>()((set) => ({
    ccEmployees: {
        treeKeys: null,
        list: null,
    },
    ccBranchId: null,
    ccJobGrade: null,
    ccLocationId: null,
    saveCCEmployees: (ccSaveData) =>
        set({
            ccEmployees: ccSaveData.ccEmployees,
            ccBranchId: ccSaveData.ccBranchId,
            ccLocationId: ccSaveData.ccLocationId,
            ccJobGrade: ccSaveData.ccJobGrade,
        }),
    resetCC: () => {
        set({
            ccEmployees: {
                list: null,
                treeKeys: null,
            },
            ccBranchId: undefined,
            ccLocationId: undefined,
            ccJobGrade: undefined,
        })
    },
}))

export default hierarchicalReportStore
