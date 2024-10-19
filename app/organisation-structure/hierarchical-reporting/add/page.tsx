'use client';

import React from 'react'
import MainScreen from '@/components/hierarchical-reporting/main'
import isAuth from '@/components/auth/components/protected-route'

const AddHierarchicalReporting = () => {
    return <MainScreen isEdit={false} />
}

export default isAuth(AddHierarchicalReporting)
