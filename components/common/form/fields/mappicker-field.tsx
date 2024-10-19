import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useBoolean } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { ICONS } from './fieldIcons'
import MapBox from '@/components/organisation-structure/branch/map-box'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import PageLoader from '@/components/common/loaders/page-loader'
import dynamic from 'next/dynamic'
import useMapStore from '@/state/zustand/map-store'


const LazyMap = dynamic(() => import('@/components/map/Map'), {
    ssr: false,
    loading: () => (
        <div className="h-[300px]  flex items-center justify-center w-full">
            <PageLoader />
        </div>
    ),
})

type MapPickerFieldProps = {
    languageName: string
    fieldHeight: string,
    fieldName:string
}

const MapPickerField: React.FC<MapPickerFieldProps> = ({
    languageName,
    fieldHeight,
    fieldName
}) => {
    const form = useFormContext()
    const { t } = useTranslation(languageName)
    const { value, toggle: toggleForMap, setTrue } = useBoolean(false)
    const {location,setLocation} = useMapStore();

    

    useEffect(()=>{
        if(location){
            form.setValue(fieldName,`Lat:${location.lat}, Lng:${location.lng}`)
        }
    },[location])

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <>
                    <FormItem className={'w-full md:w-[calc(50%-13px)]'}>
                        <FormLabel className="text-sm font-light">
                            {t(fieldName)}{' '}
                        </FormLabel>
                        <FormControl>
                            <Input
                                onClick={() => toggleForMap()}
                                readOnly
                                className={cn(
                                    fieldHeight,
                                    'text-[14px] text-secondaryTextColor cursor-pointer disabled:border-none disabled:opacity-100  disabled:text-secondaryTextColor disabled:bg-[#F1F5FB] border-[#A0AEC0]',
                                )}
                                {...field}
                                endIcon={
                                    <div>
                                        <div className="w-[30px]">
                                            {ICONS.location({
                                                className: 'text-primary-500',
                                            })}
                                        </div>
                                    </div>
                                }
                            />
                        </FormControl>
                    </FormItem>
                    <EmployeeModal
                        title={`${t('selectLocationAddress')}`}
                        modelRatio="  min-h-[500px]"
                        editMode={false}
                        open={value}
                        toggle={toggleForMap}
                        form={<LazyMap toggle={toggleForMap} />}
                    />
                </>
            )}
        />
    )
}

export default MapPickerField
