import { Checkbox } from '@/components/ui/checkbox'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from '@/components/ui/table'
import React from 'react'

interface AccordionChildType {
    label: string
    value: string
    weightage?: number
    checked: boolean
}

interface AccordionItemData {
    label: string
    value: string
    children?: AccordionChildType[]
    checked: boolean
}

type CalculatedByWeightageType = {
    calculateWeightage: AccordionItemData[]
    setCalculateWeightage: React.Dispatch<
        React.SetStateAction<AccordionItemData[]>
    >
}

export const CalculatedByWeightage: React.FC<CalculatedByWeightageType> = ({
    calculateWeightage,
    setCalculateWeightage,
}) => {
    const [weightage, setWeightage] = useState(false)
    const [totalWeightage, setTotalWeightage] = useState(0)

    useEffect(() => {
        const total = calculateWeightage.reduce((acc, parentItem) => {
            const childTotal = parentItem.children?.reduce(
                (childAcc, child) =>
                    child.checked && child.weightage
                        ? childAcc + child.weightage
                        : childAcc,
                0
            )
            return acc + (childTotal || 0)
        }, 0)
        setTotalWeightage(total)
    }, [calculateWeightage])

    const handleChange = (
        parentIndex: number,
        childrenIndex: number,
        newValue: string
    ) => {
        // Allow clearing the input
        const newWeightage = newValue === '' ? 0 : parseFloat(newValue)

        if (isNaN(newWeightage) || newWeightage < 0 || newWeightage > 100) {
            return
        }

        const oldWeightage =
            calculateWeightage[parentIndex].children?.[childrenIndex]
                .weightage || 0
        const newTotal = totalWeightage - oldWeightage + newWeightage

        if (newTotal > 100) {
            return
        }

        const updatedData = [...calculateWeightage]
        updatedData[parentIndex].children![childrenIndex].weightage = newWeightage
        setCalculateWeightage(updatedData)
    }

    return (
        <div>
            <div className="flex gap-4 mb-[12px] items-center justify-start">
                <Checkbox
                    onCheckedChange={(e: boolean) => setWeightage(e)}
                    className="border-2 pointer-events-auto rounded-[6px] w-[16px] h-[16px]"
                />
                <h3 className=" text-[16px] font-[400px] text-[#0B2040] ">
                    Calculated by Weightage
                </h3>
            </div>
            {weightage && (
                <Table>
                    <TableHeader className="bg-[#EEFDFD] h-[51px]">
                        <TableRow className="text-[#687588] border-none">
                            <TableHead className="w-1/2 font-bold">
                                Selected Hiring Manager Name
                            </TableHead>
                            <TableHead className="w-1/2 font-bold">
                                Weightage
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {calculateWeightage.map((parentItem, parentIndex) => (
                            <React.Fragment key={parentItem.value}>
                                {parentItem.children?.map(
                                    (child, childrenIndex) =>
                                        child.checked ? (
                                            <TableRow
                                                key={child.value}
                                                className="border-none text-sideMenuTextColor2 h-[51px]"
                                            >
                                                <TableCell className="font-medium">
                                                    {child.label}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <h3 className="flex gap-2 items-center">
                                                        <Input
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    parentIndex,
                                                                    childrenIndex,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-[60px]"
                                                            value={
                                                                child.weightage?.toString() || ''
                                                            }
                                                        />{' '}
                                                        %
                                                    </h3>
                                                </TableCell>
                                            </TableRow>
                                        ) : null
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            )}
            {totalWeightage === 100 && (
                <h3 className="mt-4 text-red-600">
                    Warning: The total weightage is exactly 100%.
                </h3>
            )}
        </div>
    )
}
