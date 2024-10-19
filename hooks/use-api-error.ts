'use client'

import BaseApi from '@/service/axios'
import { useEffect, useState } from 'react'

const useAPIErrors = () => {
    const [ready, setReady] = useState(false)
    const [errors, setErrors] = useState<any>()

    useEffect(() => {
        const id = BaseApi.interceptors.response.use(
            (response) => response,
            (error) => {
                setErrors(error)
                return Promise.reject(error)
            },
        )

        setReady(true)

        return () => BaseApi.interceptors.response.eject(id)
    }, [])

    return {
        errors,
        ready,
    }
}
export default  useAPIErrors
