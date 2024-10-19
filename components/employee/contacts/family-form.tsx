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
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import InputField from '@/components/common/form/fields/input-field'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import { cn } from '@/lib/utils'
import { additionalData } from '@/components/setting/code-generator/utils'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import SwitchField from '@/components/common/form/fields/switch-field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'

import FieldRequiredErrors from '@/components/common/form/fields-required.errors'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(100%-13px)]'

const FamilyForm = ({
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
    const { t } = useTranslation('familyContact')
    const isMobile = useMediaQuery('(max-width: 766px)')

    const FormSchema = yup.object({
        id: yup.number(),
        name: yup.string().required().trim().max(50),
        relationShip: yup.string().required().trim().max(50),
        phoneNo: yup.string(),
        dateofBirth: yup.date(),
        passportPermit: yup.boolean(),
        nrc: yup.object({
            townNumber: yup.string().trim().max(50),
            town: yup.string().trim().max(50),
            type: yup.string().trim().max(50),
            nationalId: yup.string().trim().max(50),
        }),
        passportId: yup.string(),
        issueDate: yup.date(),
        passportExpirey: yup.date(),
        stayPermit: yup.date(),
        visaValidity: yup.date(),
        occupation: yup.string().trim().max(50),
        taxExemption: yup.string().required().trim().max(50),
        transferInsurance: yup.string(),
        liveWithParentsLaw: yup.string(),
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
                <div className="space-y-4 h-[450px] px-2 overflow-auto">
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="name"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            languageName={'familyContact'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="relationShip"
                            required={detailValue ? false : true}
                            languageName={'familyContact'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="phoneNo"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'familyContact'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DatePickerField
                            disabled={detailValue && true}
                            fieldName="dateOfBirth"
                            required={false}
                            languageName={'familyContact'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
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
                                languageName={'familyContact'}
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
                                languageName={'familyContact'}
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
                                languageName={'familyContact'}
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
                                languageName={'familyContact'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                        </div>
                    </div>
                    <SwitchField
                        fieldName="passportPermit"
                        flexDirection="flex-row  w-full justify-between"
                        placeholder={t('placeHolder.typeHere')}
                        required={true}
                        languageName={'familyContact'}
                        fieldHeight={cn(' w-full ', fieldHeight)}
                        fieldWidth={' w-full lg:w-[48%]'}
                    />
                    {form.watch('passportPermit') && (
                        <>
                            <div className={formContainer}>
                                <InputField
                                    disabled={detailValue && true}
                                    fieldName="passportId"
                                    placeholder={t('placeHolder.typeHere')}
                                    required={false}
                                    languageName={'familyContact'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                                <DatePickerField
                                    disabled={detailValue && true}
                                    fieldName="issueDate"
                                    required={false}
                                    languageName={'familyContact'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                                <DatePickerField
                                    disabled={detailValue && true}
                                    fieldName="passportExpirey"
                                    required={false}
                                    languageName={'familyContact'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                            </div>
                            <div className={formContainer}>
                                <DatePickerField
                                    disabled={detailValue && true}
                                    fieldName="stayPermit"
                                    required={false}
                                    languageName={'familyContact'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                                <DatePickerField
                                    disabled={detailValue && true}
                                    fieldName="visaValidity"
                                    required={false}
                                    languageName={'familyContact'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                            </div>
                        </>
                    )}
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="occupation"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'familyContact'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="taxExemption"
                            required={detailValue ? false : true}
                            languageName={'familyContact'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="transferInsurance"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className="figma-text-label">
                                    {t('transferInsurance')}
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
                                                        field.value === 'yes'
                                                    }
                                                    value={'yes'}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal text-slate-400 ">
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
                    <FormField
                        control={form.control}
                        name="liveWithParentsLaw"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className="figma-text-label">
                                    {t('liveWithParentsLaw')}
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
                                                        field.value === 'yes'
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

export default FamilyForm
