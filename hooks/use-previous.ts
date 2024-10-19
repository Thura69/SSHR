import { useRef } from 'react'

function usePrevious(value: any) {
    const ref = useRef()
    const prev = ref.current
    ref.current = value
    return prev
}

export default usePrevious
