import DatePickerField from '@/components/common/form/fields/datepicker-field'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import InputField from '@/components/common/form/fields/input-field'
import { cn } from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { MapPin } from 'lucide-react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import { additionalData } from '@/components/setting/code-generator/utils'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { useMediaQuery } from 'usehooks-ts'
import Radiofield from '@/components/common/form/fields/radio-field'
import MapBox from '@/components/organisation-structure/branch/map-box'
import { useBoolean } from 'usehooks-ts'
import { Input } from '@/components/ui/input'
import MapPickerField from '@/components/common/form/fields/mappicker-field'
import { useEffect } from 'react'
import useMapStore from '@/state/zustand/map-store'
import SwitchField from '@/components/common/form/fields/switch-field'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(100%-13px)]'

const PersonalDetailForm = () => {
    const { t } = useTranslation('personalDetail')
    const isMobile = useMediaQuery('(max-width: 766px)')
    const { setLocation } = useMapStore()
    const { value, toggle: toggleForMap, setTrue } = useBoolean(false)

    const FormSchema = yup.object({
        id: yup.number(),
        maritalStatus: yup.string().required('').trim().max(50, 'moreThan50'),
        marriageDate: yup.date(),
        gender: yup.string().required(''),
        dateOfBirth: yup.date(),
        age: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        nationality: yup.string().required().trim().max(50),
        religion: yup.string().required().trim().max(50),
        race: yup.string().trim().required(''),
        identityCard: yup.string().trim().required(''),
        passportIdNumber: yup.string(),
        issueDate: yup.date(),
        passportExpiryDate: yup.date(),
        stayPermit: yup.date(),
        visaVailidity: yup.date(),
        phone: yup.string().required('').trim().max(50, 'moreThan50'),
        homePhone: yup.string().required('').trim().max(50, 'moreThan50'),
        officePhone: yup.string().required('').trim().max(50, 'moreThan50'),
        extensionNumber: yup.string().required('').trim().max(50, 'moreThan50'),
        email: yup.string().required('').trim().max(50, 'moreThan50'),
        workEmail: yup.string().required('').trim().max(50, 'moreThan50'),
        drivingLicense: yup.string().required('').trim().max(50, 'moreThan50'),
        nickName: yup.string().required('').trim().max(50, 'moreThan50'),
        shirtSize: yup.string().required('').trim().max(50, 'moreThan50'),
        allergies: yup.string().required('').trim().max(50, 'moreThan50'),
        dietaryRestriction: yup
            .string()
            .required('')
            .trim()
            .max(50, 'moreThan50'),
        hobby: yup.string().required('').trim().max(50, 'moreThan50'),
        interest: yup.string().required('').trim().max(50, 'moreThan50'),
        portfolio: yup.string(),
        linkedIn: yup.string(),
        veteranStatus: yup.string(),
        bloodType: yup.string(),
        hairColor: yup.string(),
        eyeColor: yup.string(),
        height: yup.string(),
        address: yup.string().required('').trim().max(50, 'moreThan50'),
        country: yup.string().required('').trim().max(50, 'moreThan50'),
        city: yup.string().required('').trim().max(50, 'moreThan50'),
        townShip: yup.string().required('').trim().max(50, 'moreThan50'),
        zipOrPostal: yup.string().required('').trim().max(50, 'moreThan50'),

        sameAsCurrent: yup.string(),
        permanentAddress: yup.string().required().trim(),
        permanentCountry: yup.string().required().trim(),
        permanentCity: yup.string().required().trim(),
        permanentTownShip: yup
            .string()
            .required('')
            .trim()
            .max(50, 'moreThan50'),
        permanentZipOrPostal: yup.string().required(),
        workFromWork: yup.string(),
        remoteLocation: yup.string(),
    })
 
    const form = useForm({
        resolver: yupResolver(FormSchema),
    })

    useEffect(() => {
        //@ts-ignore
        setLocation(null)
        form.setValue('sameAsCurrent', 'no')
        form.setValue('workFromWork', 'yes')
        form.setValue('identityCard', 'yes')
    }, [])

    const handleOnSave = () => {}

    return (
        <Form {...form}>
            <form
                className="space-y-4 mt-[20px]  sm:space-y-10"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
            
                <section className="space-y-3">
                    <div className={formContainer}>
                        <DropDownField
                            fieldName="maritalStatus"
                            required={true}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-[100%] ', fieldHeight)}
                            fieldWidth={filedWidth}
                            apiFields={{
                                value: 'Branch_ID',
                                label: 'Branch_Name',
                            }}
                         />
                        <DatePickerField
                            fieldName="marriageDate"
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-[100%]', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <DropDownField
                            fieldName="gender"
                            required={true}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            apiFields={{
                                value: 'Branch_ID',
                                label: 'Branch_Name',
                            }}
                        />
                        <DatePickerField
                            fieldName="dateOfBirth"
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="age"
                            required={false}
                            placeholder={t('placeHolder.typeHere')}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <DropDownField
                            fieldName="nationality"
                            required={true}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            apiFields={{
                                value: 'Branch_ID',
                                label: 'Branch_Name',
                            }}
                        />
                        <DropDownField
                            fieldName="religion"
                            required={true}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            apiFields={{
                                value: 'Branch_ID',
                                label: 'Branch_Name',
                            }}
                        />
                        <DropDownField
                            fieldName="race"
                            required={true}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            apiFields={{
                                value: 'Branch_ID',
                                label: 'Branch_Name',
                            }}
                        />
                    </div>
                </section>

                <section className="space-y-3">
                    <FormField
                        control={form.control}
                        name="identityCard"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className=" font-light">
                                    {t('identityCard')}
                                    <span className="ms-1 text-danger-500">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        defaultChecked={true}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex"
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
                                            <FormLabel className="font-normal text-secondaryText">
                                                NRC
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center text-secondaryText space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem
                                                    checked={
                                                        field.value === 'no'
                                                    }
                                                    value={'no'}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal ">
                                                Passport
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* NRc */}
                    {form.watch('identityCard') === 'yes' ? (
                        <div>
                            <div className="flex flex-col gap-2">
                                <p
                                    className={cn(
                                        'p-0 text-[14px]  font-md my-1',
                                    )}
                                >
                                    {t('nrc')}{' '}
                                </p>
                            </div>
                            <div className={formContainer}>
                                <DropDownDataField
                                    fieldName="nrc.townNumber"
                                    placeHolder={t('stateNumber')}
                                    required={false}
                                    requiredLabel={false}
                                    languageName={'familyContact'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                    additionalData={additionalData}
                                />
                                <DropDownDataField
                                    fieldName="nrc.town"
                                    placeHolder={t('district')}
                                    required={false}
                                    requiredLabel={false}
                                    languageName={'familyContact'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                    additionalData={additionalData}
                                />
                                <DropDownDataField
                                    fieldName="nrc.type"
                                    placeHolder={t('citizenshipTier')}
                                    required={false}
                                    requiredLabel={false}
                                    languageName={'familyContact'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                    additionalData={additionalData}
                                />
                                <InputField
                                    fieldName="nrc.nationalId"
                                    placeholder={t('registerNumber')}
                                    required={false}
                                    requiredLabel={false}
                                    languageName={'familyContact'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className={formContainer}>
                                <InputField
                                    fieldName="passportIdNumber"
                                    placeholder={t('placeHolder.typeHere')}
                                    required={true}
                                    languageName={'personalDetail'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                                <DatePickerField
                                    fieldName="issueDate"
                                    required={false}
                                    languageName={'personalDetail'}
                                    fieldHeight={cn(' w-[100%]', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                                <DatePickerField
                                    fieldName="passportExpirtyDate"
                                    required={false}
                                    languageName={'personalDetail'}
                                    fieldHeight={cn(' w-[100%]', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                            </div>
                            <div className={formContainer}>
                                <DatePickerField
                                    fieldName="stayPermit"
                                    required={false}
                                    languageName={'personalDetail'}
                                    fieldHeight={cn(' w-[100%]', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                                <DatePickerField
                                    fieldName="visaVailidity"
                                    required={false}
                                    languageName={'personalDetail'}
                                    fieldHeight={cn(' w-[100%]', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                            </div>
                        </div>
                    )}
                    {/* NRC */}
                    <div className={formContainer}>
                        <InputField
                            fieldName="phone"
                            placeholder={t('placeHolder.typeHere')}
                            required={true}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="homePhone"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            fieldName="officePhone"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="extensionNumber"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            fieldName="email"
                            placeholder={t('placeHolder.typeHere')}
                            required={true}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="workEmail"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            fieldName="drivingLicense"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(adjustWidth, fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                </section>

                <section className=" space-y-3">
                    <h2 className="font-bold   text-primary-500 text:xl sm:text-2xl">
                        {t('Other')}
                    </h2>
                    <div className={formContainer}>
                        <InputField
                            fieldName="nickName"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="shirtSize"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            fieldName="allergies"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="dietaryRestriction"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            fieldName="hobby"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="interest"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                </section>
                <section className=" space-y-3">
                    <div className={formContainer}>
                        <InputField
                            fieldName="portfolio"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(adjustWidth, fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            fieldName="linkedIn"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <SwitchField
                            fieldName="veteranStatus"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            flexDirection="flex-col space-y-2 justify-start spy"
                        />
                    </div>
                </section>
                <section className=" space-y-3">
                    <h2 className="font-bold  text-primary-500 text:xl sm:text-2xl">
                        {t('Appearance')}
                    </h2>
                    <div className={formContainer}>
                        <InputField
                            fieldName="bloodType"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="hairColor"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            fieldName="eyeColor"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="height"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                </section>
                <section className=" space-y-3">
                    <h2 className="font-bold  text-primary-500 text:xl sm:text-2xl">
                        {t('currentAddress')}
                    </h2>

                    <TextAreaField
                        fieldName="address"
                        required={true}
                        languageName={'personalDetail'}
                        fieldHeight={cn(' w-full h-[128px]')}
                        fieldWidth={'w-full'}
                        placeholder={t('placeHolder.typeHere')}
                    />

                    <div className={formContainer}>
                        <DropDownDataField
                            fieldName="country"
                            required={true}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                        <DropDownDataField
                            fieldName="city"
                            required={true}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <DropDownDataField
                            fieldName="townShip"
                            required={true}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                        <InputField
                            fieldName="zipOrPostal"
                            placeholder={t('placeHolder.typeHere')}
                            required={true}
                            languageName={'personalDetail'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                </section>
                <section className="space-y-3">
                    <h2 className="font-bold  text-primary-500 text:xl sm:text-2xl">
                        {t('permanent')}
                    </h2>
                    <Radiofield
                        languageName="personalDetail"
                        fieldName="sameAsCurrent"
                    />
                    {form.watch('sameAsCurrent') === 'no' && (
                        <>
                            <TextAreaField
                                fieldName="permanentAddress"
                                required={true}
                                languageName={'personalDetail'}
                                fieldHeight={cn(' w-full h-[128px]')}
                                fieldWidth={'w-full'}
                                placeholder={t('placeHolder.typeHere')}
                            />
                            <div className={formContainer}>
                                <DropDownDataField
                                    fieldName="permanentCountry"
                                    required={true}
                                    languageName={'personalDetail'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                    additionalData={additionalData}
                                />
                                <DropDownDataField
                                    fieldName="permanentCity"
                                    required={true}
                                    languageName={'personalDetail'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                    additionalData={additionalData}
                                />
                            </div>
                            <div className={formContainer}>
                                <DropDownDataField
                                    fieldName="townShip"
                                    required={true}
                                    languageName={'personalDetail'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                    additionalData={additionalData}
                                />
                                <InputField
                                    fieldName="permanentZipOrPostal"
                                    placeholder={t('placeHolder.typeHere')}
                                    required={true}
                                    languageName={'personalDetail'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                            </div>
                        </>
                    )}
                </section>
                <section className=" space-y-3">
                    <h2 className="font-bold  text-primary-500 text:xl sm:text-2xl">
                        {t('remote')}
                    </h2>
                    <Radiofield
                        languageName="personalDetail"
                        fieldName="workFromWork"
                    />
                    {form.watch('workFromWork') === 'yes' && (
                        <div className={cn(formContainer, '')}>
                            <MapPickerField
                                languageName="personalDetail"
                                fieldHeight={fieldHeight}
                                fieldName="remoteLocation"
                            />
                        </div>
                    )}
                </section>
                <ModalConfirmBtns
                    size={isMobile ? 'md' : 'lg'}
                    width="w-[150px]"
                    isLoading={false}
                    editMode={true}
                    language="financialYear"
                    toggle={() => {}}
                />
            </form>
        </Form>
    )
}

export default PersonalDetailForm
