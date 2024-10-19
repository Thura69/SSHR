import React, { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

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

type AcccordionMultiSelectType = {
    accordionData: AccordionItemData[]
    setAccordionData: React.Dispatch<React.SetStateAction<AccordionItemData[]>>
    labelTitle: string
}

export const AccordionMultiSelect: React.FC<AcccordionMultiSelectType> = ({
    accordionData,
    setAccordionData,
    labelTitle,
}) => {
    const handleParentCheck = (newValue: any, parentId: string) => {
        setAccordionData((prevData) => {
            return prevData.map((item) => {
                if (item.value === parentId) {
                    return {
                        ...item,
                        checked: newValue,
                        children: item.children?.map((child) => ({
                            ...child,
                            checked: newValue,
                        })),
                    }
                }
                return item
            })
        })
    }

    const handleChildCheck = (
        newValue: any,
        parentId: string,
        childId: string,
    ) => {
        setAccordionData((prevData) => {
            return prevData.map((item) => {
                if (item.value === parentId) {
                    const updatedChildren = item.children?.map((child) => {
                        if (child.value === childId) {
                            return { ...child, checked: newValue }
                        }
                        return child
                    })

                    const allChildrenChecked = updatedChildren?.every(
                        (child) => child.checked,
                    )

                    return {
                        ...item,
                        checked: allChildrenChecked ?? false,
                        children: updatedChildren,
                    }
                }
                return item
            })
        })
    }

    return (
        <div className="space-y-3">
            <h3 className="label">{labelTitle}</h3>
            <Accordion
                type="multiple"
                className="w-full text-[#52525B] bg-[#F7FAFF]"
            >
                {accordionData.map((item) => (
                    <AccordionItem key={item.value} value={item.value}>
                        <div className="flex h-[56px] gap-[11px]  bg-[#F7FAFF] px-[16px] pointer-events-none">
                            <AccordionTrigger
                                showIconBlue
                                className=""
                            ></AccordionTrigger>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    checked={item.checked}
                                    onCheckedChange={(checked) =>
                                        handleParentCheck(checked, item.value)
                                    }
                                    className="border-2 pointer-events-auto rounded-[6px] w-[16px] h-[16px]"
                                    id={item.value}
                                />
                                <h3 className=" text-xs sm:text-sm font-bold text-[#52525B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {item.label}
                                </h3>
                            </div>
                        </div>
                        {item.children?.map((child) => (
                            <AccordionContent
                                key={child.value}
                                value={child.value}
                                className="px-[52px] bg-[#eff2f8] min-h-[56px] py-3"
                            >
                                <div className="flex items-center h-full space-x-2">
                                    <Checkbox
                                        checked={child.checked}
                                        onCheckedChange={(checked) =>
                                            handleChildCheck(
                                                checked,
                                                item.value,
                                                child.value,
                                            )
                                        }
                                        className="border-2  rounded-[6px] text-[#3F88EC] w-[16px] h-[16px]"
                                        id={child.value}
                                    />
                                    <h3 className=" text-xs sm:text-sm font-bold text-[#52525B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {child.label}
                                    </h3>
                                </div>
                            </AccordionContent>
                        ))}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
