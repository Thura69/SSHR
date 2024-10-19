import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import useFormStore from '@/state/zustand/form-store';
import { cn } from '@/lib/utils';
import InputForm from '@/components/setting/notification-and-alert/components/input-form'
import DropForm from '@/components/setting/notification-and-alert/components/drop-form'
import CheckboxAlert from '@/components/setting/notification-and-alert/components/checkbox-alert'
import CheckboxForm from '@/components/setting/notification-and-alert/components/checkbox-form'


const ChildrenInput = ({
  title,
  day,
  type,
  form,
  formInput,
  formDrop,
  formCheck
}:{
  title:string,
  day?:boolean,
  type:any,
  formInput:string,
  formDrop:string,
  form:any,
  formCheck:string
}) => {

    const [value,setValue] = useState(false);
    const {t} = useTranslation('notificationAndAlert');
    const {setFormInputName} = useFormStore();
    const [required,setRequired] = useState(false);




    // const handleCheck = ({e,formInput}:{e:any,formInput:string})=>{
    // setValue(e);

   
    // };


    useEffect(() => {
        
        const isRequired = form.formState?.errors[formInput];


        
        if(isRequired?.message === 'required'){
          setRequired(true);
        }else{
          setRequired(false);
        }
       
        setValue(form.watch(`${formCheck}`));


    }, [form.getValues(`${formInput}`),form.formState?.errors[formInput],form.watch(`${formCheck}`)])

    const renderModeComponent = () => {
        switch (type) {
            case 'day':
                return <InputForm
                form={form} 

                formInput={formInput} 
                />
            case 'drop':
                return (
                    <DropForm
                        title={title}
                        form={form}
                        formDrop={formDrop}
                        formInput={formInput}
                    />
                )
            default:
                return <></>
        }
      };

  return (
    <div className='flex flex-col   items-start  lg:items-center lg:flex-row  justify-between gap-3'>

    <div className="flex items-center justify-center  space-x-2">
    {type ? 

    

    // <Checkbox checked={value} onCheckedChange={(e)=>{handleCheck({e,formInput})}} id="terms" />
    <CheckboxAlert
      form={form}
      formInput={formInput}
      formCheck={formCheck}
      setValue={setValue}
      type={type}
      setFormInputName={setFormInputName}
    />

    : 

    <CheckboxForm
      form={form}
      formInput={formInput}
    />
    }
     <label
       htmlFor="terms"
       className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",required && 'text-red-500')}
     >
     {t(`${title}`)}
     </label>
   </div>
   {
    value && <div className='flex  w-full md:w-[500px]  lg:w-[300px] xl:w-[200px] 2xl:w-[400px]    rounded   border-slate-200'>
    {renderModeComponent()}
    </div>
   }
    {/* {
       value && <div className='flex  w-full md:w-[500px]  lg:w-[300px] xl:[300px] 2xl:w-[400px]    rounded   border-slate-200'>
       {renderModeComponent()}
       </div>
    } */}
    </div>

   )
}

export default ChildrenInput
