import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import InputField from '@/components/common/form/fields/input-field'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import { cn } from '@/lib/utils'
import { additionalData } from '@/components/setting/code-generator/utils'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import SwitchField from '@/components/common/form/fields/switch-field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import { Button } from '@/components/ui/button'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(100%-13px)]'

const EmergencyForm = ({
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
    const { t } = useTranslation('emergencyContact')
    const isMobile = useMediaQuery('(max-width: 766px)')

    const FormSchema = yup.object({
        id: yup.number(),
        name: yup.string().required().trim().max(50),
        relationShip: yup.string().required().trim().max(50),
        nrc: yup.object({
            townNumber: yup.string().trim().max(50),
            town: yup.string().trim().max(50),
            type: yup.string().trim().max(50),
            nationalId: yup.string().trim().max(50),
        }),
        contactNumber: yup.string().required().trim().max(50),
        primaryContact: yup.string(),
        address: yup.string().trim().max(50),
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
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <div className="space-y-4 h-[450px] px-2 overflow-auto">
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="name"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            languageName={'emergencyContact'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="relationShip"
                            required={detailValue ? false : true}
                            languageName={'emergencyContact'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div>
                        <p
                            className={cn(
                                'p-0 text-[14px] font-md my-2',
                                false && 'text-danger-500',
                            )}
                        >
                            {t('NRC')}{' '}
                        </p>
                        <div className={formContainer}>
                            <DropDownDataField
                                disabled={detailValue && true}
                                fieldName="nrc.townNumber"
                                placeHolder={t('12/')}
                                required={false}
                                requiredLabel={false}
                                languageName={'emergencyContact'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                additionalData={additionalData}
                            />
                            <DropDownDataField
                                disabled={detailValue && true}
                                fieldName="nrc.town"
                                placeHolder={t('Kamaya')}
                                required={false}
                                requiredLabel={false}
                                languageName={'emergencyContact'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                additionalData={additionalData}
                            />
                            <DropDownDataField
                                disabled={detailValue && true}
                                fieldName="nrc.type"
                                placeHolder={t('N')}
                                required={false}
                                requiredLabel={false}
                                languageName={'emergencyContact'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                additionalData={additionalData}
                            />
                            <InputField
                                disabled={detailValue && true}
                                fieldName="nrc.nationalId"
                                placeholder={t('placeHolder.123456')}
                                required={false}
                                requiredLabel={false}
                                languageName={'emergencyContact'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                        </div>
                    </div>
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="contactNumber"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            languageName={'emergencyContact'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <FormField
                            control={form.control}
                            name="primaryContact"
                            render={({ field }) => (
                                <FormItem
                                    className={cn('spacy-y-3', filedWidth)}
                                >
                                    <FormLabel className="figma-text-label">
                                        {t('primaryContact')}
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex  space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        checked={
                                                            field.value ===
                                                            'yes'
                                                        }
                                                        value={'yes'}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-slate-400">
                                                    {t('yes')}
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        checked={
                                                            field.value === 'no'
                                                        }
                                                        value={'no'}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-slate-400 ">
                                                    {t('no')}
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <TextAreaField
                        disabled={detailValue && true}
                        fieldName="address"
                        required={false}
                        languageName={'emergencyContact'}
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

export default EmergencyForm
