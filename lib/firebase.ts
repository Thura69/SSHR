// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    isSupported,
    Messaging,
} from 'firebase/messaging'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAlZogtnaIt4dAxEMfzGhtlTcdt7ns6L-A',
    authDomain: 'sshr-v2.firebaseapp.com',
    projectId: 'sshr-v2',
    storageBucket: 'sshr-v2.appspot.com',
    messagingSenderId: '691931432809',
    appId: '1:691931432809:web:36084e9ab1c02fbd4adff8',
    measurementId: 'G-XCDWMTM5YD',
}

// Initialize Firebase
const app = !getApps()?.length ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase Cloud Messaging and get a reference to the service
export const getMessagingObj = async (): Promise<Messaging | null> => {
    const supported = await isSupported()
    if (!supported || typeof window === 'undefined') return null
    return getMessaging(app)
}

export const fetchToken = async () => {
    try {
        const messaging = await getMessagingObj()
        if (messaging) {
            const token = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            })
            return token
        }
        return null
    } catch (err) {
        console.error(err)
        return null
    }
}
