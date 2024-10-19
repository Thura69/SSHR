import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NotificationState {
    notiCount: number
    increaseNotiCount: () => void
    resetNotiCount: () => void
}

export const useNotificationStore = create<NotificationState>()(
    persist(
        (set) => ({
            notiCount: 0,
            increaseNotiCount: () =>
                set((state) => ({ notiCount: state.notiCount + 1 })),
            resetNotiCount: () => set((state) => ({ notiCount: 0 })),
        }),
        { name: 'noti-count' },
    ),
)
