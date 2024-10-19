import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useGetAllDistBranch, useGetAllDistCompany, useGetAllDistDepart, useGetAllDistLocation, useGetAllPostions } from '@/service/query-hooks/setting/use-distnct';
import { Check } from 'lucide-react';
import React from 'react'
import AccordianChil from './AccordianChil';
import {Skeleton} from '../../../ui/skeleton';

const AccordianDrop = ({value,handleUpdate,setAll,allValue}:{value:any,handleUpdate:any,setAll?:any,allValue?:any}) => {
   
   const {isError:disErr,isLoading:disLoad,data:disCompany} = useGetAllDistCompany();
   const {isError:brErr,isLoading:disbrLoad,data:brsde} = useGetAllDistBranch();
   const {isError:loErr,isLoading:disLo,data:dislo} = useGetAllDistLocation();
   const {isError:deErr,isLoading:disdeLoad,data:disde} = useGetAllDistDepart();
   const {isError:poErr,isLoading:disPoLoad,data:dipo} = useGetAllPostions();


   const handleAll = ()=>{
    setAll('All selected')
   };

  return (
    <div className='p-2 pb-0'>
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
    <p className='flex justify-between w-full'> All Employees {allValue && <Check className='w-4 h-4'/>}</p>
    </Button>
    <Accordion collapsible className='w-full' type='single'>
    {
      disLoad ?
      <Loader/>:
      <AccordianChil 
      handleUpdate={handleUpdate}
      value={value['Company_ID']}
      titleKey='Company_Name'
      title='Company'
      id='1'
      idKey='Company_ID'
      length={disCompany?.data.length} 
      data={disCompany?.data}/>
    }
{
      disLoad ?
      <Loader/>:
      <AccordianChil  
      handleUpdate={handleUpdate}
      value={value['Location_ID']}
      titleKey='Location_Name' 
      title='Location'
      id='2' 
      idKey='Location_ID' 
      length={dislo?.data.length} 
      data={dislo?.data}/>
    }
{
      disLoad ?
     <Loader/>:
      <AccordianChil  
      handleUpdate={handleUpdate}
      value={value['Branch_ID']}
      titleKey='Branch_Name' 
      title='Branch' 
      id='3' 
      idKey='Branch_ID' 
      length={brsde?.data.length} 
      data={brsde?.data}/>
    }
    {
      disLoad ?
      <Loader/>:
      <AccordianChil  
      handleUpdate={handleUpdate}
      value={value['Department_ID']}
      titleKey='Department_Name' 
      title='Department' 
      id='4' 
      idKey='Department_ID' 
      length={disde?.data.length}
      data={disde?.data}/>
    }
    {
      disLoad ?
      <Loader/>:
      <AccordianChil  
      handleUpdate={handleUpdate}
      value={value['Position_ID']}
      titleKey='Position_Name' 
      title='Position' 
      id='5' 
      idKey='Position_ID' 
      length={dipo?.data.length}
      data={dipo?.data}/>
    }
    </Accordion>
    </div>
  )
}

const Loader =() => {

  return <div className="my-2 items-center justify-between p-1 h-[25px] flex">
  <Skeleton className="h-3 w-[150px]" />
  <Skeleton className="h-2 w-[50px]" />
  </div>

}

export default AccordianDrop


