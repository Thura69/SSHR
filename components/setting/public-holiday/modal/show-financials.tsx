'use client'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useGellAllPureFinancialYear } from '@/service/query-hooks/setting/use-financial-year'
import useFormStore from '@/state/zustand/form-store'
import { financialYearType } from '@/types/setting/financial-year-type'
import { CheckIcon } from '@radix-ui/react-icons'
import { ChevronDownIcon} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'


function ShowFinancials() {
    const [yearId, setYearId] = useState<number>(0)
    const {data:financialYearData,isLoading} = useGellAllPureFinancialYear();
    const [closePopover,setClosePopover] = useState(false);
    const {setActiveFinancial,setCurrentFinancial} = useFormStore();
    const [activeYear,setActiveYearId] = useState<number>(0);
    const [con] = useQueryState("con",parseAsString.withDefault(''));
    const [page,setPage] = useQueryState('page');

    const { t } = useTranslation('currency')
    const [_, setFinancialYearId] = useQueryState(
        'financial_year_id',
        parseAsInteger,
    )

    const memorizedData = useMemo(() => financialYearData, [financialYearData]);


    useEffect(() => {
        if (financialYearData?.data) {
            const currentFinancial = financialYearData?.data.filter(
                (e: financialYearType) => e.is_active === true,
            )

            setYearId(currentFinancial[0]?.FinancialYear_ID)
            setFinancialYearId(currentFinancial[0]?.FinancialYear_ID)
        }
    }, [memorizedData])

    // const autoCompleteOptions = memorizedData?.data.map(
    //     (financialYearData: financialYearType) => {
    //         return {
    //             label: financialYearData.FinancialYear_Name,
    //             value: financialYearData.FinancialYear_ID,
    //         }
    //     },
    // );

    
    useEffect(()=>{
    if(financialYearData){

    

    const currentFinancial = financialYearData.data.filter((e:financialYearType)=>e.is_active === true);

    


    

    const activeFinancialYearInfo = {
        id:currentFinancial[0]?.FinancialYear_ID,
        name:currentFinancial[0]?.FinancialYear_Name
    };

    setActiveFinancial(activeFinancialYearInfo);

    setActiveYearId(currentFinancial[0]?.FinancialYear_ID);
    setFinancialYearId(currentFinancial[0]?.FinancialYear_ID);

    }
    },[memorizedData]);

    
    const autoCompleteOptions = memorizedData?.data.map((financialYearData:financialYearType)=>{

        return {
          label:financialYearData.financial_year_name,
          value:financialYearData.financial_year_id
        } 
      });

  return (
    <Popover  open={closePopover} onOpenChange={setClosePopover}>
    <PopoverTrigger className='my-4 rounded-md' disabled={(con === "copied" ) && true} asChild>
          {
            isLoading ? <Skeleton className='min-w-[150px]  h-[35px]'/>:  <Button
            variant="outline"
            role="combobox"
            className={cn(
                `min-w-[150px]   justify-between `,
                !activeYear &&
                    'text-muted-foreground',
            )}
        >
            {activeYear
                ? autoCompleteOptions?.find(
                      (language:any) =>
                          language.value ===
                          activeYear
                  )?.label
                : t(
                     'Select',
                  )}
            <ChevronDownIcon className="ml-2  h-4 w-4 shrink-0 opacity-50" />
        </Button>
          }
    </PopoverTrigger>
    <PopoverContent
        className={cn(` min-w-full w-[150px] h-[200px] p-0`)}
    >
        <Command>
            <CommandInput
                placeholder={t(
                    'modal.placeHolder.search',
                )}
                className="h-9"
            />
            <CommandList>
                <CommandEmpty>
                    No item found.
                </CommandEmpty>
                <CommandGroup>
                    {
                        !isLoading ? (autoCompleteOptions?.map(
                            (item:any) => (
                                <CommandItem
                                    value={item.label}
                                    key={item.value}
                                    onSelect={() => {
                                      setActiveYearId(item.value);
                                      setCurrentFinancial(item);
                                      setFinancialYearId(item.value);
                                      setPage(null);
                                      setClosePopover(false)
                                    }}
                                >
                                    {item.label}
                                    <CheckIcon
                                        className={cn(
                                            'ml-auto h-4 w-4',
                                            item.value ===
                                                activeYear
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                </CommandItem>
                            ),
                        )):(
                            <section className="w-full space-y-4">
                            <Skeleton className="w-full h-3" />
                            <Skeleton className="w-full h-3" />
                            <Skeleton className="w-full h-3" />
                        </section>
                        )
                    }
                </CommandGroup>
            </CommandList>
        </Command>
    </PopoverContent>
</Popover>
  )
}

export default ShowFinancials
