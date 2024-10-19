import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"


export const AccordionRow = ({children}:{children:React.ReactNode}) => {
  return (
    <Accordion type="single" collapsible className='border-2 bg-white'>
      <AccordionItem value="item-1" className='w-full'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent value='Accordion'>
         {
            children
         }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
