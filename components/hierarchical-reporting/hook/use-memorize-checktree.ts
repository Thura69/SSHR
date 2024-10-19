import { parsedCheckTree } from '@/lib/utils'
import { useMemo } from 'react'

const useMemorizeCheckTree = (list: any, isDisabled = false) => {
    const formattedCheckTree = list
        ? parsedCheckTree(list?.data, isDisabled)
        : []

    const memoFormattedCheckTree = useMemo(
        () => formattedCheckTree,
        [formattedCheckTree],
    )

    return { memoFormattedCheckTree, formattedCheckTree }
}

export default useMemorizeCheckTree
