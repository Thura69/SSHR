'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from '@/components/ui/form'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectStatus } from '@/components/common/form/select-status'
import { AccordionMultiSelect } from '@/components/common/form/fields/accordion-multiselect'
import { CalculatedByWeightage } from './calculate-weightage'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import { cn } from '@/lib/utils'
import { ActiveRecruitmentTable } from './activate-recruitment'
import ModalNextBtns from '@/components/common/modal/modal-next-btns'
import { useRouter } from 'next/navigation'

const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

interface AccordionChildType {
    label: string
    value: string
    weightage?: number
    checked: boolean
}

interface AccordionItemData {
    label: string
    value: string
    children?: AccordionChildType[]
    checked: boolean
}

const SAMPLEDATA: AccordionItemData[] = [
    {
        label: 'Hiring Manager',
        value: 'hiringManager',
        checked: false,
        children: [
            {
                label: 'Aung Myo Thu (Finance Manager, Finance Department)',
                value: 'aungmyo1',
                checked: false,
                weightage: 0,
            },
            {
                label: 'Yee Ywal (HR Manager, HR Department)',
                value: 'yeeywal1',
                checked: false,
                weightage: 0,
            },
        ],
    },
    {
        label: 'Interviewer',
        value: 'interviewer',
        checked: false,
        children: [
            {
                label: 'Aung Myo Thu (Finance Manager, Finance Department)',
                value: 'aungmyo2',
                checked: false,
                weightage: 0,
            },
            {
                label: 'Yee Ywal (HR Manager, HR Department)',
                value: 'yeeywal2',
                checked: false,
                weightage: 0,
            },
        ],
    },
    {
        label: 'Phone Screening Manager',
        value: 'phonescreeningmanager',
        checked: false,
        children: [
            {
                label: 'Aung Myo Thu (Finance Manager, Finance Department)',
                value: 'aungmyo3',
                checked: false,
                weightage: 0,
            },
            {
                label: 'Yee Ywal (HR Manager, HR Department)',
                value: 'yeeywal3',
                checked: false,
                weightage: 0,
            },
        ],
    },
]

export const HiringManagerForm = () => {
    const { t } = useTranslation('jobOpening')
    const router = useRouter()

    const [hiringManagerWeightage, setHiringManagerWeightage] =
        useState<AccordionItemData[]>(SAMPLEDATA)

    const FormSchema = yup.object({
        id: yup.number(),
        jobDescription: yup.string().required(),
        jobSpecification: yup.string().required(),
        benefits: yup.string().required(),
        softSkills: yup.string().required(),
        hardSkills: yup.string().required(),
        minimumExperience: yup.string().required(),
        workExperience: yup.string().required(),
        hiringSource: yup.string().required(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {},
    })

    const handleOnSave = (data: any) => {
        console.log(data)
    }

    useEffect(() => {
        const collectCheckedChildren = (
            data: AccordionItemData[],
        ): AccordionItemData[] => {
            return data.flatMap(
                (item) => item.children?.filter((child) => child.checked) || [],
            )
        }

        const checkedChildren = collectCheckedChildren(hiringManagerWeightage)
    }, [hiringManagerWeightage])

    return (
        <section className="w-full">
            <Form {...form}>
                <div className="flex flex-col sm:flex-row   items-start md:items-center gap-4 justify-between">
                    <h3 className=" text:md sm:text-2xl font-bold text-[#1CBCC8]">
                        {t('hiringManager')}
                    </h3>
                    <SelectStatus placeHolder={t('selectStatus')} />
                </div>
                <form
                    className="space-y-4 mt-[20px]  sm:space-y-10"
                    onSubmit={form.handleSubmit(handleOnSave)}
                >
                    <section className="space-y-[64px]">
                        <section className="space-y-6">
                            <AccordionMultiSelect
                                labelTitle={t('assignTo')}
                                accordionData={hiringManagerWeightage}
                                setAccordionData={setHiringManagerWeightage}
                            />
                            <CalculatedByWeightage
                                calculateWeightage={hiringManagerWeightage}
                                setCalculateWeightage={
                                    setHiringManagerWeightage
                                }
                            />
                        </section>
                        <section className=" space-y-6">
                            <h3 className=" text:md sm:text-2xl font-bold text-[#1CBCC8]">
                                {t('hiringSource')}
                            </h3>
                            <DropDownField
                                fieldName="hiringSource"
                                disabled={false}
                                required={true}
                                languageName={'jobOpening'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                apiFields={{
                                    value: 'branch_id',
                                    label: 'branch_name',
                                }}
                            />
                            <ActiveRecruitmentTable />
                        </section>
                    </section>
                    <ModalNextBtns
                        language="candidates"
                        handleClick={handleOnSave}
                        toggle={() => {
                            router.push('/recruitment/job-opening')
                        }}
                        width="w-[120px] mt-[20px]"
                    />
                </form>
            </Form>
        </section>
    )
}
