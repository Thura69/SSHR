import axios from 'axios'
import Cookies from 'js-cookie'

const BaseApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_API}`,
    headers: {
        ...(Cookies.get('auth')
            ? {
                Authorization: `Bearer ${Cookies.get('auth')}`,
            }
            : {}),
    },
})

BaseApi.interceptors.request.use(
    (config) => {
        // Modify request config, if needed
        return config
    },
    (error) => {
        // Handle request error
        console.error('Request error:', error)
        return Promise.reject(error)
    },
)

BaseApi.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response
    },
    (error) => {
        // Handle response errors
        if (error.response) {
            if (error.response.status === 401) {
                Cookies.remove('auth')
                window.location.reload()
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request)
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message)
        }
        return Promise.reject(error)
    },
)

export const setAPIToken = (token: string) => {
    BaseApi.defaults.headers.Authorization = `Bearer ${token}`
}



export default BaseApi
