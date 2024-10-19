import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import { Form } from '@/components/ui/form'
import * as yup from 'yup'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import { cn } from '@/lib/utils'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import MultiEmployeeSelect from '@/components/common/form/fields/multi-employee-select'
import MultiEmployeeSelectField from '@/components/common/form/fields/multi-select-field'
import { useState } from 'react'
import LoadButton from './load-button'
import ScreeningStageTable from './screening-table/screening-stage-table'
import SwitchField from '@/components/common/form/fields/switch-field'

const adjustWidth = 'w-full md:w-[calc(50%-9px)]'
const formContainer =
    'flex flex-col md:flex-row gap-3  justify-between items-center'
const fieldHeight = 'h-[40px] md:h-[45px] '
const filedWidth = 'md:w-[50%]  w-full'

const ScreenStagePositionForm = ({
    toggle,
    detailValue,
    editData,
    editMode = false,
}: {
    toggle: any
    detailValue?: boolean
    editData?: any
    editMode?: boolean
}) => {
    const isMobile = useMediaQuery('(max-width: 766px)')
    const isMobileHeight = useMediaQuery('(max-height:600px)')
    const [screeningStages, setScreeningStages] = useState([])
    const { t } = useTranslation('screeningStageByPosition')

    const FormSchema = yup.object({
        id: yup.number(),
        position: yup.string().required(),
        screeningStage: yup.array().required().min(1),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            screeningStage: [],
        },
    })
    const { formState } = form

    const handleOnSave = (e: any) => {
        console.log(e)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSave)}
                className="space-y-4"
            >
                <div
                    className={cn(
                        'space-y-4 h-[450px] px-2 overflow-auto',
                        isMobileHeight && 'h-[400px]',
                    )}
                >
                    <DropDownField
                        fieldName="position"
                        disabled={detailValue && true}
                        required={true}
                        languageName={'screeningStageByPosition'}
                        fieldHeight={cn(' w-[100%] ', fieldHeight)}
                        fieldWidth={filedWidth}
                        apiFields={{
                            value: 'Branch_ID',
                            label: 'Branch_Name',
                        }}
                    />
                    <MultiEmployeeSelectField
                        apiFields={{
                            value: 'Branch_ID',
                            label: 'Branch_Name',
                        }}
                        required={true}
                        disabled={detailValue && true}
                        endPoint="main/branches/distinct"
                        translation="screeningStageByPosition"
                        fieldHeight={cn(' w-[100%] ', fieldHeight)}
                        value={screeningStages}
                        fieldWidth={'w-full'}
                        setValue={setScreeningStages}
                        title={'screeningStage'}
                        fieldName="screeningStage"
                    />

                    {!detailValue && (
                        <LoadButton disabled={true} title="Load" />
                    )}
                    <ScreeningStageTable detail={detailValue ? true : false} />
                    <SwitchField
                        disabled={detailValue && true}
                        fieldName="active"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        languageName={'employeeInformation'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                        flexDirection="flex-flex  items-center  justify-start "
                    />
                </div>
                {Object.keys(formState.errors).length !== 0 && (
                    <FieldRequiredErrors title={t('requiredFields')} />
                )}
                {detailValue ? (
                    <div className="w-full  flex  justify-end">
                        <Button
                            type="button"
                            onClick={toggle}
                            size={isMobile ? 'md' : 'md'}
                            variant="outline"
                            disabled={false}
                            className={cn('w-[100px] rounded-md')}
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
                        language="financialYear"
                        toggle={toggle}
                    />
                )}
            </form>
        </Form>
    )
}

export default ScreenStagePositionForm
