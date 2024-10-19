import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
    open: boolean
}

type Actions = {
    setOpen: (value: boolean) => void
}

const useTableAccordion = create<State & Actions>()(
    devtools((set) => ({
        open: true,
        setOpen: (value: boolean) => set({ open:value }),
    })),
);

export default useTableAccordion
