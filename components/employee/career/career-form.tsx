import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import InputField from '@/components/common/form/fields/input-field'
import {
    Form,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import * as yup from 'yup'
import { cn } from '@/lib/utils'
import { additionalData } from '@/components/setting/code-generator/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import useCandidateStore from '@/state/zustand/candidate'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[calc(50%-10px)] w-full'
const formContainer =
    'flex flex-col md:flex-row   justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(50%-10px)]'

const CareerForm = ({
    toggle,
    editData,
    detailValue,
    isControled = false,
    editMode = false,
}: {
    toggle: any
    editData?: any
    detailValue?: boolean
    isControled?: boolean
    editMode?: boolean
}) => {

    
    const { t } = useTranslation('career')
    const isMobile = useMediaQuery('(max-width: 766px)')
    const { setCareerHistory } = useCandidateStore((state) => state)


    const FormSchema = yup.object({
        id: yup.number(),
        companyName: yup.string().required().trim().max(50),
        position: yup.string().required().trim().max(50),
        jobType: yup.string().required().trim().max(50),
        salary: yup.string().trim().max(50),
        positionStartDate: yup.date().required(),
        positionEndDate: yup.date().required(),
        reasonOfLeaving: yup.string().required(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    const { formState } = form

    const handleOnSave = (e: any) => {
        if (isControled) {
            e.id = Date.now()
            setCareerHistory(e)
        }

        toggle()
    }

    return (
        <Form {...form}>
            <form
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <div className="space-y-4 h-[400px] px-2 overflow-auto">
                    <InputField
                        disabled={detailValue && true}
                        fieldName="companyName"
                        placeholder={t('placeHolder.typeHere')}
                        required={detailValue ? false : true}
                        languageName={'career'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                    />
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="position"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'career'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                        />
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="jobType"
                            placeHolder={t('placeHolder.select')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'career'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <InputField
                        disabled={detailValue && true}
                        fieldName="salary"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        languageName={'career'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                    />
                    <div className={formContainer}>
                        <DatePickerField
                            disabled={detailValue && true}
                            fieldName="positionStartDate"
                            required={detailValue ? false : true}
                            languageName={'career'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                        />
                        <DatePickerField
                            disabled={detailValue && true}
                            fieldName="positionEndDate"
                            required={detailValue ? false : true}
                            languageName={'career'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                        />
                    </div>
                    <TextAreaField
                        disabled={detailValue && true}
                        fieldName="reasonOfLeaving"
                        required={detailValue ? false : true}
                        languageName={'career'}
                        fieldHeight={cn(' w-full h-[128px]')}
                        fieldWidth={'w-full'}
                        placeholder={t('placeHolder.typeHere')}
                    />
                    {Object.keys(formState.errors).length !== 0 && (
                        <FieldRequiredErrors title={t('requiredFields')} />
                    )}
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
                        language="financialYear"
                        toggle={toggle}
                    />
                )}
            </form>
        </Form>
    )
}

export default CareerForm
