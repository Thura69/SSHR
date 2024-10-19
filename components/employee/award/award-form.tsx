import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
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
import { additionalData } from '@/components/setting/code-generator/utils'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import { Button } from '@/components/ui/button'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(100%-13px)]'

const AwardForm = ({
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

    const FormScheam = yup.object({
        id: yup.number(),
        department: yup.string(),
        position: yup.string(),
        date: yup.string().required(),
        nameOfaward: yup.string().required(),
        detailsOfAward: yup.string(),
        occasion: yup.string(),
    })

    const form = useForm({
        resolver: yupResolver(FormScheam),
        defaultValues: editData,
    })

    const { formState } = form

    const handleOnSave = (e: any) => {}

    return (
        <Form {...form}>
            <form
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <div className="space-y-4  h-[400px] px-2 overflow-auto">
                    <div className={formContainer}>
                        <InputField
                            disabled={true}
                            fieldName="department"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'award'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            disabled={true}
                            fieldName="position"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'award'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <DatePickerField
                            disabled={detailValue && true}
                            fieldName="date"
                            required={detailValue ? false : true}
                            languageName={'award'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            disabled={detailValue && true}
                            fieldName="nameOfaward"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'award'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <TextAreaField
                        disabled={detailValue && true}
                        fieldName="detailsOfAward"
                        required={false}
                        languageName={'award'}
                        fieldHeight={cn(' w-full h-[128px]')}
                        fieldWidth={'w-full'}
                        placeholder={t('placeHolder.typeHere')}
                    />
                    <InputField
                        disabled={detailValue && true}
                        fieldName="occasion"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        requiredLabel={true}
                        languageName={'award'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
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

export default AwardForm
