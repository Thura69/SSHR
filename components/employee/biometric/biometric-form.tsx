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
import { cn } from '@/lib/utils'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import InputField from '@/components/common/form/fields/input-field'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import { additionalData } from '@/components/setting/code-generator/utils'
import { Button } from '@/components/ui/button'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(100%-13px)]'

const BiometricForm = ({
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
    const { t } = useTranslation('biometric')
    const isMobile = useMediaQuery('(max-width: 766px)')

    const FormSchema = yup.object({
        id: yup.number(),
        taNumber: yup.string().required().max(50),
        terminalNumber: yup.string().required().max(50),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    const { formState } = form

    const handleOnSave = (e: any) => {
        console.log('hello')
        console.log(e)
    }

    return (
        <Form {...form}>
            <form
                className="sm:space-y-5"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <InputField
                    fieldName="taNumber"
                    disabled={detailValue ? true : false}
                    placeholder={t('placeHolder.typeHere')}
                    required={true}
                    languageName={'biometric'}
                    fieldHeight={cn(' w-full', fieldHeight)}
                    fieldWidth={filedWidth}
                />
                <DropDownDataField
                    disabled={detailValue ? true : false}
                    fieldName="terminalNumber"
                    required={true}
                    languageName={'biometric'}
                    fieldHeight={cn(' w-full', fieldHeight)}
                    fieldWidth={filedWidth}
                    additionalData={additionalData}
                />
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

export default BiometricForm
