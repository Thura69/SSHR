import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import InputField from '@/components/common/form/fields/input-field'
import { useTranslation } from 'react-i18next'

const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = ' w-full'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

export const DetailsForm = () => {

    const {t} = useTranslation('job-opening')

    const FormSchema = yup.object({
        id: yup.number(),
        jobType: yup.string(),
        location: yup.string(),
        jobCategory: yup.string(),
        salary: yup.string(),
        gender: yup.string(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            jobType: 'Omar Saris',
            location: 'Yangon',
            jobCategory: 'Software Development',
            salary: '100,000 -150,000',
            gender: 'Male',
        },
    })

    const handleOnSave = (data: any) => {
        console.log(data)
    }

    return (
        <div className="w-full border rounded-[12px] p-[24px]">
            <Form {...form}>
                <form
                    className=""
                    onSubmit={form.handleSubmit(handleOnSave)}
                >
                    <section className="space-y-3">
                    <InputField
                            fieldName="jobType"
                            disabled={false}
                            required={true}
                            placeholder={t('placeHolder.typeHere')}
                            languageName={'jobOpening'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="location"
                            disabled={false}
                            required={true}
                            placeholder={t('placeHolder.typeHere')}
                            languageName={'jobOpening'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="jobCategory"
                            disabled={false}
                            required={true}
                            placeholder={t('placeHolder.typeHere')}
                            languageName={'jobOpening'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="salary"
                            disabled={false}
                            required={true}
                            placeholder={t('placeHolder.typeHere')}
                            languageName={'jobOpening'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                         <InputField
                            fieldName="gender"
                            disabled={false}
                            required={true}
                            placeholder={t('placeHolder.typeHere')}
                            languageName={'jobOpening'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </section>
                </form>
            </Form>
        </div>
    )
}
