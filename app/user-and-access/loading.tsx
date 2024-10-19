'use client'
import PageLoader from '@/components/common/loaders/page-loader'
import React from 'react'

const loading = () => {
    return (
        <div className="p-4">
            <PageLoader />
        </div>
    )
}

export default loading
