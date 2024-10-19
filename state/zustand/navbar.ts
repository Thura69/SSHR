import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
    isInitialMenu: boolean
}

type Actions = {
    setIsInitialMenu: (isInitialMenu: boolean) => void
}
const navbarStore = create<Partial<State> & Actions>()((set) => ({
    isInitialMenu: true,

    setIsInitialMenu: (isInitialMenu: boolean) => set({ isInitialMenu }),
}))

export default navbarStore
