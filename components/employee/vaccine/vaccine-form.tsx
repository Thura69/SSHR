import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form } from '@/components/ui/form'
import { additionalData } from '@/components/setting/code-generator/utils'
import InputField from '@/components/common/form/fields/input-field'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import { cn } from '@/lib/utils'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import Radiofield from '@/components/common/form/fields/radio-field'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

const VaccineForm = ({
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
    const { t } = useTranslation('career')
    const isMobile = useMediaQuery('(max-width: 766px)')

    const FormSchema = yup.object({
        id: yup.number(),
        vaccineType: yup.string().required().max(50),
        vaccine: yup.string().required().max(50),
        doseAdministrationDate: yup.string().required().max(50),
        vaccineDose: yup.string().required().max(50),
        vacinationStatus: yup.string().required().max(50),
        proofofVaccination: yup.string(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: { ...editData, proofofVaccination: 'no' },
    })

    const { formState } = form

    const handleOnSave = (e: any) => {
        console.log('hello')
        console.log(e)
    }

    return (
        <Form {...form}>
            <form
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <div className="space-y-4  px-2">
                    <DropDownDataField
                        disabled={detailValue && true}
                        fieldName="vaccineType"
                        placeHolder={t('placeHolder.select')}
                        required={detailValue ? false : true}
                        requiredLabel={true}
                        languageName={'vaccineEmployee'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={adjustWidth}
                        additionalData={additionalData}
                    />
                    <div className={formContainer}>
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="vaccine"
                            placeHolder={t('placeHolder.select')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'vaccineEmployee'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                        <DatePickerField
                            disabled={detailValue && true}
                            fieldName="doseAdministrationDate"
                            required={detailValue ? false : true}
                            languageName={'vaccineEmployee'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="vaccineDose"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            languageName={'vaccineEmployee'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="vacinationStatus"
                            placeHolder={t('placeHolder.select')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'vaccineEmployee'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <Radiofield
                        languageName="vaccineEmployee"
                        fieldName={'proofofVaccination'}
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

export default VaccineForm
