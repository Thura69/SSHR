import { Accordion } from '@/components/ui/accordion'
import React, { useMemo, useState } from 'react'
import CustomAccordionItem from './AccordionItem'

import { Button } from '@/components/ui/button'
import {
    useGetAllDistBranch,
    useGetAllDistCompany,
    useGetAllDistDepart,
    useGetAllDistLocation,
    useGetAllPostions,
} from '@/service/query-hooks/setting/use-distnct'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Check } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '../../../ui/skeleton'

const PublicAccordion = ({ form }: { form: any }) => {
    const {
        isError: disErr,
        isLoading: disLoad,
        data: disCompany,
    } = useGetAllDistCompany()
    const {
        isError: brErr,
        isLoading: disbrLoad,
        data: brsde,
    } = useGetAllDistBranch()
    const {
        isError: loErr,
        isLoading: disLo,
        data: dislo,
    } = useGetAllDistLocation()
    const {
        isError: deErr,
        isLoading: disdeLoad,
        data: disde,
    } = useGetAllDistDepart()
    const {
        isError: poErr,
        isLoading: disPoLoad,
        data: dipo,
    } = useGetAllPostions()

    
    const handleAll = () => {
        const currentForAllValue = form.getValues('ForAll')
        
        form.setValue('ForAll', !currentForAllValue,{shouldDirty:true})
    }

    return (
        <div className="p-2">
            <FormField
                control={form.control}
                name={'ForAll'}
                render={({ field }) => (
                    <FormItem>
                       <Button 
         onClick={handleAll}
         variant={'ghost'}
         className='
    flex 
    justify-start 
    border-b  
    w-full 
    text-black  
    text-sm p-3'
    >
    <p className='flex justify-between w-full'> All Employees { form.getValues('ForAll') && <Check className='w-4 h-4'/>}</p>
    </Button>
                    </FormItem>
                )}
            ></FormField>

            <ScrollArea >
                <Accordion
                    type="single"
                    collapsible
                    className="w-full  h-[200px] overflow-y-scroll"
                >
                    <FormField
                        control={form.control}
                        name="Company_ID"
                        render={({ field }) => (
                            <FormItem>
                                {disLoad ? <Loader/> : (
                                    <CustomAccordionItem
                                    field={field}
                                    form={form}
                                    titleKey="Company_Name"
                                    title="Company"
                                    id="1"
                                    idKey="Company_ID"
                                    length={disCompany?.data.length}
                                    data={disCompany?.data}
                                />
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Location_ID"
                        render={({ field }) => (
                            <FormItem>
                                {disLoad ? <Loader/>: (
                                    <CustomAccordionItem
                                        field={field}
                                        form={form}
                                        titleKey="Location_Name"
                                        title="Location"
                                        id="2"
                                        idKey="Location_ID"
                                        length={dislo?.data.length}
                                        data={dislo?.data}
                                    />
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Branch_ID"
                        render={({ field }) => (
                            <FormItem>
                                {disLoad ? <Loader/>: (
                                    <CustomAccordionItem
                                        field={field}
                                        form={form}
                                        titleKey="Branch_Name"
                                        title="Branch"
                                        id="3"
                                        idKey="Branch_ID"
                                        length={brsde?.data.length}
                                        data={brsde?.data}
                                    />
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Department_ID"
                        render={({ field }) => (
                            <FormItem>
                                {disLoad ? (
                                  <Loader/>
                                ) : (
                                    <CustomAccordionItem
                                        field={field}
                                        form={form}
                                        titleKey="Department_Name"
                                        title="Department"
                                        id="4"
                                        idKey="Department_ID"
                                        length={disde?.data.length}
                                        data={disde?.data}
                                    />
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Position_ID"
                        render={({ field }) => (
                            <FormItem>
                                {disLoad ? <Loader/>: (
                                    <CustomAccordionItem
                                        field={field}
                                        form={form}
                                        titleKey="Position_Name"
                                        title="Position"
                                        id="5"
                                        idKey="Position_ID"
                                        length={dipo?.data.length}
                                        data={dipo?.data}
                                    />
                                )}
                            </FormItem>
                        )}
                    />
                </Accordion>
            </ScrollArea>
        </div>
    )
}

export default PublicAccordion


const Loader =() => {

  return <div className="my-2 items-center justify-between p-1 h-[25px] flex">
  <Skeleton className="h-3 w-[150px]" />
  <Skeleton className="h-2 w-[50px]" />
  </div>

}