import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import { Form } from '@/components/ui/form'
import * as yup from 'yup'
import { cn } from '@/lib/utils'
import InputField from '@/components/common/form/fields/input-field'
import LoadButton from '../screening-stage-by-position/load-button'
import MultiSelectTwoColField from '@/components/common/form/fields/multi-select-with-two-col'
import MandatoryTable from './mandatory-table'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import SwitchField from '@/components/common/form/fields/switch-field'
import DropDownField from '@/components/common/form/fields/dropdown-field'

const adjustWidth = 'w-full md:w-[calc(50%-9px)]'
const formContainer =
    'flex flex-col md:flex-row gap-3  justify-between items-center'
const fieldHeight = 'h-[40px] md:h-[45px] '
const filedWidth = 'md:w-[50%]  w-full'

const detailData = [
    {
        id: 1,
        name: 'python',
        type: 'hard',
        mandatory: true,
    },
    {
        id: 2,
        name: 'Java',
        type: 'hard',
        mandatory: false,
    },
    {
        id: 3,
        name: 'C++',
        type: 'hard',
        mandatory: true,
    },
    {
        id: 4,
        name: 'Problem Solving',
        type: 'soft',
        mandatory: false,
    },
    {
        id: 5,
        name: 'Team Collaboration',
        type: 'soft',
        mandatory: true,
    },
    {
        id: 6,
        name: 'Time Management',
        type: 'soft',
        mandatory: true,
    },
]

type screeningStagesTypes = {
    id: number
    name: string
    type: 'hard' | 'soft'
    mandatory: boolean
}

export const SkillSetByPositionForm = ({
    toggle,
    editData,
    detailValue,
    editMode = false,
}: {
    toggle: any
    editData?: any
    detailValue?: boolean
    editMode?: boolean
}) => {
    const { t } = useTranslation('skill')
    const isMobile = useMediaQuery('(max-width: 766px)')
    const isMobileHeight = useMediaQuery('(max-height:750px)')
    const [screeningStages, setScreeningStages] = useState<
        screeningStagesTypes[]
    >([])
    const [onLoad, setOnLoad] = useState<boolean>(false)
    const [mandatoryValue, setMandatoryValue] = useState<any>([])

    const FormSchema = yup.object({
        id: yup.number(),
        position: yup.string(),
        skillSets: yup.array(),
        hardSkill: yup.array(),
        softSkill: yup.array(),
        active: yup.boolean(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    useEffect(() => {
        form.setValue('active', false)
    }, [])

    useEffect(() => {
        form.setValue('Description', screeningStages)
    }, [screeningStages])

    const handleOnSave = (e: any) => []

    const handleDeleteMandatory = (item: screeningStagesTypes) => {
        setScreeningStages((prevStages: any) => {
            const updatedStages = [...prevStages]

            const index = updatedStages.findIndex(
                (stage) => stage.name === item.name,
            )

            updatedStages.splice(index, 1)

            return updatedStages
        })

        setMandatoryValue((prevStages: any) => {
            const updatedStages = [...prevStages]

            const index = updatedStages.findIndex(
                (stage) => stage.name === item.name,
            )

            updatedStages.splice(index, 1)

            return updatedStages
        })
    }

    return (
        <Form {...form}>
            <form
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <div
                    className={cn(
                        'space-y-4 h-[550px] px-2 overflow-auto',
                        isMobileHeight && 'h-[400px]',
                    )}
                >
                    <DropDownField
                        disabled={detailValue && true}
                        fieldName="position"
                        required={true}
                        languageName={'skillSetByPosition'}
                        fieldHeight={cn(' w-[100%] ', fieldHeight)}
                        fieldWidth={filedWidth}
                        apiFields={{
                            value: 'Branch_ID',
                            label: 'Branch_Name',
                        }}
                    />
                    {/* <TextAreaField
                        disabled={detailValue && true}
                        fieldName="description"
                        required={detailValue ? false : false}
                        languageName={'skillSet'}
                        fieldHeight={cn(' w-full h-[128px]')}
                        fieldWidth={'w-full'}
                        placeholder={t('placeholder.typeHere')}
                    /> */}
                    <MultiSelectTwoColField
                        apiFields={{
                            value: 'Branch_ID',
                            label: 'Branch_Name',
                        }}
                        disabled={detailValue && true}
                        apiFieldsTwo={{
                            value: 'Position_ID',
                            label: 'Position_Name',
                        }}
                        required={true}
                        endPoint="main/branches/distinct"
                        endPointTwo="main/positions"
                        translation="skillSetByPosition"
                        fieldHeight={cn(' w-[100%] ', fieldHeight)}
                        value={screeningStages}
                        fieldWidth={'w-full'}
                        setValue={setScreeningStages}
                        title={'skillSets'}
                        fieldName="skillSets"
                    />

                    {!detailValue && (
                        <LoadButton
                            handleClick={() =>
                                setMandatoryValue(screeningStages)
                            }
                            disabled={screeningStages.length > 0 ? false : true}
                            title="Load"
                        />
                    )}
                    <MandatoryTable
                        detail={detailValue ? true : false}
                        handleDeleteMandatory={handleDeleteMandatory}
                        data={detailValue ? detailData : mandatoryValue}
                    />
                    <SwitchField
                        disabled={detailValue && true}
                        fieldName="active"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        languageName={'screeningStageByPosition'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                        flexDirection="flex-flex  items-center  justify-start "
                    />
                </div>
                {detailValue ? (
                    <div className="w-full  flex  justify-end">
                        <Button
                            type="button"
                            onClick={toggle}
                            size={isMobile ? 'md' : 'md'}
                            variant="outline"
                            disabled={false}
                            className={cn(
                                ` w-[100px] ${false && 'opacity-50'}`,
                                'w-[100px] rounded-md',
                            )}
                        >
                            {t('close')}
                        </Button>
                    </div>
                ) : (
                    <ModalConfirmBtns
                        size={isMobile ? 'md' : 'md'}
                        width="w-[100px] rounded-md"
                        isLoading={false}
                        editMode={editMode}
                        language="skillSet"
                        toggle={toggle}
                    />
                )}
            </form>
        </Form>
    )
}
