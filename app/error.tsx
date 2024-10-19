'use client'

import { ErrorMessage } from '@/components/error-message'

export default function Error({
    error,
}: {
    error: Error & { digest?: string }
}) {
    return <ErrorMessage error={error} />
}
