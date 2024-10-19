'use client'

import { useCallback, useEffect, useState } from 'react'
import { fetchToken, getMessagingObj } from '@/lib/firebase'
import { onMessage, Unsubscribe } from 'firebase/messaging'
import { useNotificationStore } from '@/state/zustand/notifications'
import { useQueryClient } from '@tanstack/react-query'

async function notifyMe() {
    if (!('Notification' in window)) {
        // Check if the browser supports notifications
        console.info('This browser does not support desktop notification')
    } else if (Notification.permission === 'granted') {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        const token = await fetchToken()
        if (!token) {
            return null
        }
        return token
    } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
            const token = await fetchToken()
            if (!token) {
                return null
            }
            return token
        } else {
            console.error('notification permission not granted.')
        }
    }
    return null
}

export const useFCM = () => {
    const [fcmToken, setFcmToken] = useState<string | null>(null)
    const { increaseNotiCount, notiCount, resetNotiCount } =
        useNotificationStore()
    const queryClient = useQueryClient()

    const loadToken = async () => {
        const token = await notifyMe()
        setFcmToken(token)
    }

    const listenerMessage = useCallback(async () => {
        if (!fcmToken) return null
        const messaging = await getMessagingObj()
        if (!messaging) return null
        return onMessage(messaging, (payload) => {
            if (Notification.permission !== 'granted') return
            increaseNotiCount()
            queryClient.invalidateQueries({ queryKey: ['notifications'] })

        })
    }, [fcmToken])

    useEffect(() => {
        if ('notification in window' && Notification.permission === 'granted')
            loadToken()
    }, [])

    useEffect(() => {
        let instanceOnMessage: Unsubscribe | null
        listenerMessage().then((r) => (instanceOnMessage = r))
        return () => instanceOnMessage?.()
    }, [listenerMessage])

    return { loadToken, notiCount, resetNotiCount }
}
