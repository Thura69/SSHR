import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { useTranslation } from 'react-i18next'

const SAMPLEDATA = [
    {
        id: 1,
        source: 'Source one',
        status: false,
    },
    {
        id: 2,
        source: 'Source two',
        status: false,
    },
    {
        id: 3,
        source: 'Source three',
        status: false,
    },
]

export const ActiveRecruitmentTable = () => {
    const [data, setData] = useState(SAMPLEDATA)
    const { t } = useTranslation('jobOpening')

    const handleCheckChange = (id: number, newStatus: boolean) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, status: newStatus } : item,
            ),
        )
    }

    return (
        <Table>
            <TableHeader className="bg-[#EEFDFD] h-[51px]">
                <TableRow className="text-[#687588] border-none">
                    <TableHead className="w-1/2 font-bold">
                        {t('hiringManagerName')}
                    </TableHead>
                    <TableHead className="w-1/2 font-bold">
                        {' '}
                        {t('weightage')}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((child) => (
                    <TableRow
                        key={child.id}
                        className="border-none text-sideMenuTextColor2 h-[51px]"
                    >
                        <TableCell className="font-medium">
                            {child.source}
                        </TableCell>
                        <TableCell className="font-medium">
                            <Switch
                                onCheckedChange={(checked) =>
                                    handleCheckChange(child.id, checked)
                                }
                                checked={child.status}
                                id={`recruitment-${child.id}`}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
