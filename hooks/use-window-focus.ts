import { useState, useEffect } from 'react'

const useWindowFocus = () => {
    const [isWindowFocus, setIsWindowFocus] = useState(false)

    useEffect(() => {
        const handleFocus = () => {
            setIsWindowFocus(true)
            // Add your logic here when the window regains focus
        }

        const handleBlur = () => {
            setIsWindowFocus(true)
        }

        window.addEventListener('focus', handleFocus)
        window.addEventListener('blur', handleBlur)

        return () => {
            window.removeEventListener('focus', handleFocus)
            window.removeEventListener('blur', handleBlur)
        }
    }, [])

    return { isWindowFocus }
}

export default useWindowFocus
