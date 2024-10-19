'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { useEffect, useState } from 'react'
import { MultiSelectDrop } from '@/components/common/form/multi-select-drop'
import { additionalData } from '@/components/setting/code-generator/utils'
import { MapPin } from 'lucide-react'
import MapBox from './map-box'
import { useBoolean } from 'usehooks-ts'
import useMapStore from '@/state/zustand/map-store'

type PropTypes = {
    editMode?: boolean
    editData?: any
    toggle: () => void
}
const BranchForm: React.FC<PropTypes> = ({ editData, editMode, toggle }) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [departPopoverOpen, setDepartPopoverOpen] = useState(false)
    const { value, toggle: toggleForMap, setTrue } = useBoolean(false)
    const {location} = useMapStore();

    const FormSchema = yup.object({
        id: yup.number(),
        Location: yup.string().required('').trim().max(50, 'moreThan50'),
        BranchName: yup.string().required(),
        Department: yup.string().required(),
        Description: yup.string(),
        Total_Employee: yup.number(),
        Location_Address: yup.string(),
    })

    const { t } = useTranslation('branch')

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: editMode ? editData?.id : 0,
            Location: editMode ? editData?.Location : '',
            BranchName: editMode ? editData?.BranchName : '',
            Department: editMode ? editData?.Department : '',
            Description: editMode ? editData?.Description : '',
            Total_Employee: editMode ? editData?.Total_Employee : 0,
            Location_Address: editMode ? editData?.Location_Address : '',
        },
    })

   
    const handleOnSave = () => {}

    useEffect(()=>{
        if(location){
            form.setValue('Location_Address',`Lat:${location.lat}, Lng:${location.lng}`)
        }
    },[location])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSave)}>
                <div className="space-y-1 sm:space-y-5">
                    <FormField
                        control={form.control}
                        name="Location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">
                                    {t('Location')}{' '}
                                    <span className="ms-1 text-danger-500">
                                        *
                                    </span>
                                </FormLabel>
                                <MultiSelectDrop
                                    popoverOpen={popoverOpen}
                                    setPopoverOpen={setPopoverOpen}
                                    languageTitle="branch"
                                    fieldName="Location"
                                    additionalData={additionalData}
                                    field={field}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="BranchName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">
                                    {t('branch_name')}{' '}
                                    <span className="ms-1 text-danger-500">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">
                                    {t('department')}{' '}
                                    <span className="ms-1 text-danger-500">
                                        *
                                    </span>
                                </FormLabel>
                                <MultiSelectDrop
                                    popoverOpen={departPopoverOpen}
                                    setPopoverOpen={setDepartPopoverOpen}
                                    languageTitle="branch"
                                    additionalData={additionalData}
                                    fieldName="Department"
                                    field={field}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Total_Employee"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">
                                    {t('total_employess')}{' '}
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Location_Address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">
                                    {t('location_address')}{' '}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        endIcon={
                                            <div
                                                onClick={() => toggleForMap()}
                                                className="   cursor-pointer w-[50px] flex items-center  rounded-r-md  justify-center h-full  bg-gray-200 "
                                            >
                                                <div className="bg-primary-500 border-primary-600  border-[0.5px] duration-300  hover:bg-primary-600 hover:border-[0.5px]   p-1 rounded-md">
                                                    <MapPin color="black" />
                                                </div>
                                            </div>
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <MapBox open={value} toggle={toggleForMap} />
                </div>
                <ModalConfirmBtns
                    isLoading={false}
                    editMode={editMode}
                    language="branch"
                    toggle={toggle}
                />
            </form>
        </Form>
    )
}

export default BranchForm
