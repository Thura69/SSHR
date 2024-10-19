import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import React from 'react'
import CheckBox from '@/components/setting/public-holiday/modal/CheckBox'

type CustormAccordionItem = {
    title: string
    data: []
    length: number
    id: string
    titleKey: string
    idKey: string
    field?: any
    form: any
}

function CustomAccordionItem({
    title,
    data,
    length,
    id,
    titleKey,
    form,
    idKey
}: CustormAccordionItem) {
    return (
        <AccordionItem value={`item-${id}`}>
            <AccordionTrigger className="bg-gray-50  text-sm p-3">
                {title}({length})
            </AccordionTrigger>
            <AccordionContent value="holi" className="p-3 h-[150px] overflow-y-scroll">
                <div className="w-full grid grid-cols-2 gap-4">
                    {data?.map((e: any, index: number) => (
                        <CheckBox
                            onChange={(id) => {
                                const currentCompanyId = form.getValues(
                                    `${idKey}`,
                                )
                                const index = currentCompanyId.indexOf(id)
                                if (index !== -1) {
                                    const updatedCompanyId = [
                                        ...currentCompanyId.slice(0, index),
                                        ...currentCompanyId.slice(index + 1),
                                    ]
                                    form.setValue(`${idKey}`, updatedCompanyId,{shouldDirty:true})
                                } else {
                                    form.setValue(`${idKey}`, [
                                        ...currentCompanyId,
                                        id,
                                    ],{shouldDirty:true})
                                }
                            }}
                            check={
                                form.watch(`${idKey}`)?.includes(e[idKey])
                                    ? true
                                    : false
                            }
                            key={index}
                            title={e[titleKey]}
                            id={e[idKey]}
                        />
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

export default CustomAccordionItem
