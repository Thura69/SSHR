import { AccordionItem } from '@/components/ui/accordion'
import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import React, { useEffect } from 'react'
import CheckBox from './CheckBox';

type CustormAccordionItem =  {
    title:string,
    data:[],
    length:number,
    id:string,
    titleKey:string,
    idKey:string,
    value:any[],
    handleUpdate:any

};

const AccordianChil = ({
    title,
    data,
    length,
    id,
    idKey,
    titleKey,
    value,
    handleUpdate
}:CustormAccordionItem) => {
  return (
    <AccordionItem value={`item-${id}`}>
    <AccordionTrigger className='
    bg-gray-50 
    text-sm
    w-full
    p-3
    '>
    {title}({length})
    </AccordionTrigger>
    <AccordionContent value="holi" className='p-3 h-[150px] overflow-y-scroll'>
    <div className='  grid grid-cols-2 gap-4'>
    {
     data?.map((e:any,index:number)=>{

      return (
        <CheckBox
        onChange={(id:any)=>handleUpdate(idKey,id)}
        check={value.includes(e[idKey])}
        key={index}
        title={e[titleKey]} 
        id={e[idKey]}/>
      )
     })
    }
    </div>
    </AccordionContent>
   
    </AccordionItem>
  )
}

export default AccordianChil