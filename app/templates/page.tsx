'use client'

import React, { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { NewUserForm } from '@/components/common/templates'
import { Button } from '@/components/ui/button'
import { AlertModal } from '@/components/alert-modal'

const Forms = {
    newUser: <NewUserForm />,
}

type FormTypes = keyof typeof Forms

const Templates = () => {
    const { value, toggle, setTrue, setFalse } = useBoolean(false)

    const [displayForm, setDisplayForm] = useState<FormTypes>('newUser')

    const getDisplayForm = () => {
        switch (displayForm) {
            case 'newUser':
                return <NewUserForm />
            default:
                return null
        }
    }
    return (
        <div className="px-4 md:px-6 py-6">
            Templates
            <br />
            <div className="flex gap-4 flex-wrap mb-4">
                <Button onClick={() => setDisplayForm('newUser')}>
                    New User
                </Button>
            </div>
            <div className="space-y-16">{getDisplayForm()}</div>
            <Button variant="primary" onClick={setTrue}>
                Open Alert Modal
            </Button>
            <AlertModal open={value} toggle={toggle} setFalse={setFalse} />
        </div>
    )
}

export default Templates
