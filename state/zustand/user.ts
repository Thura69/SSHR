import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export enum viewTypeEnum {
    'Card' = 'Card',
    'List' = 'List',
}

type State = {
    viewType: viewTypeEnum
}

type Actions = {
    setViewType: (viewType: viewTypeEnum) => void
}

const useUserStore = create<State & Actions>()(
    devtools((set) => ({
        viewType: viewTypeEnum.Card,
        //actions
        setViewType: (viewType: viewTypeEnum) => set({ viewType }),
    })),
)

export default useUserStore
