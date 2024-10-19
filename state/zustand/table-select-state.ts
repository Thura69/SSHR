import { create } from 'zustand'

interface ITableState {
    isAllSelected: boolean
    setIsAllSelected: (value: boolean) => void
}

const tableSelectStore = create<ITableState>((set) => ({
    isAllSelected: false,
    setIsAllSelected: (value) => set({ isAllSelected: value }),
}))

export default tableSelectStore
