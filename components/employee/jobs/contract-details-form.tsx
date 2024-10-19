'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import * as yup from 'yup'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import InputField from '@/components/common/form/fields/input-field'
import { cn } from '@/lib/utils'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import { additionalData } from '@/components/setting/code-generator/utils'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { Button } from '@/components/ui/button'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'

const adjustWidth = 'w-full md:w-[calc(50%-9px)]'
const formContainer =
    'flex flex-col md:flex-row gap-3  justify-between items-center'
const fieldHeight = 'h-[40px] md:h-[45px] '
const filedWidth = 'md:w-[50%] w-full'

const ContractDetailsForm = ({
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
    const { t } = useTranslation('contractDetailJobs')
    const isMobile = useMediaQuery('(max-width: 766px)')

    const FormSchema = yup.object({
        id: yup.number(),
        ecNumber: yup.string().required().trim().max(50),
        type: yup.string().required().trim().max(50),
        contractPeriod: yup.object({
            startDate: yup.date().required(),
            endDate: yup.date().required(),
        }),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
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
                <InputField
                    disabled={detailValue && true}
                    fieldName="ecNumber"
                    placeholder={t('placeholder.typeHere')}
                    required={ detailValue ? false : true}
                    languageName={'contractDetailJobs'}
                    fieldHeight={cn(' w-full', fieldHeight)}
                    fieldWidth={adjustWidth}
                />

                <DropDownDataField
                    disabled={detailValue && true}
                    fieldName="type"
                    required={ detailValue ? false : true}
                    languageName={'contractDetailJobs'}
                    fieldHeight={cn(' w-full', fieldHeight)}
                    fieldWidth={adjustWidth}
                    additionalData={additionalData}
                />
                <div>
                    <p
                        className={cn(
                            'p-0 text-[14px] font-light my-2',
                            form.formState.errors?.contractPeriod &&
                                'text-danger-500',
                        )}
                    >
                        {t('contractPeriod')}{' '}
                       {
                        !detailValue &&  <span className="ms-1 text-danger-500">*</span>
                       }
                    </p>
                    <div className={formContainer}>
                        <DatePickerField
                             disabled={detailValue && true}
                            fieldName="dateOfBirth"
                            requiredLabel={false}
                            required={false}
                            languageName={'familyContact'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DatePickerField
                             disabled={detailValue && true}
                            fieldName="dateOfBirth"
                            requiredLabel={false}
                            required={false}
                            languageName={'familyContact'}
                            fieldHeight={cn(' w-full ', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
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

export default ContractDetailsForm
