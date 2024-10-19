import EmployeeHeader from '@/components/employee/employee-header'
import EmployeeInformationUpoad from '@/components/employee/employee-information/employee-information-uploadimg'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useBoolean, useMediaQuery } from 'usehooks-ts'
import * as yup from 'yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import InputField from '@/components/common/form/fields/input-field'
import { useTranslation } from 'react-i18next'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import SwitchField from '@/components/common/form/fields/switch-field'
import AutoSuggestField from '@/components/common/form/fields/auto-suggest'
import TextAreaField from '@/components/common/form/fields/textarea-field'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(100%-13px)]'

const InternalForm = ({
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
    const { value, setFalse, setTrue } = useBoolean(false)
    const [selectedImage, setSelectedImage] = useState(
        'https://images.unsplash.com/photo-1719583112932-d2426a3196ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D',
    )
    const isMobileHeight = useMediaQuery('(max-height:750px)')

    const { t } = useTranslation('hiringManager')
    const isMobile = useMediaQuery('(max-width: 766px)')

    const FormSchema = yup.object({
        id: yup.number(),
        imgUrl: yup.string(),
        employeeNumber: yup.string().required(),
        employeeName: yup.string().required(),
        company: yup.string(),
        location: yup.string(),
        branch: yup.string(),
        department: yup.string(),
        section: yup.string(),
        position: yup.string(),
        email: yup.string(),
        assignTo: yup.string().required(),
        active: yup.boolean(),
        remark: yup.string(),
        externalHiring: yup.boolean(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    useEffect(() => {
        form.setValue('active', false)
    }, [])

    const handleOnSave = (e: any) => []

    function handleChange(e: any) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]

            const reader = new FileReader()
            reader.onload = (event: any) => {
                setSelectedImage(event?.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Form {...form}>
            <form
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <div
                    className={cn(
                        'space-y-4 h-[500px] px-2 overflow-auto',
                        isMobileHeight && 'h-[400px]',
                    )}
                >
                    <EmployeeInformationUpoad
                        setTrue={setTrue}
                        selectedImage={selectedImage}
                        handleChange={handleChange}
                    />
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="employeeNumber"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <AutoSuggestField
                            disabled={detailValue && true}
                            fieldName="employeeName"
                            placeHolder={t('placeHolder.search')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            apiFields={{
                                value: 'Branch_ID',
                                label: 'Branch_Name',
                            }}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            disabled={true}
                            fieldName="company"
                            placeholder={''}
                            required={false}
                            requiredLabel={true}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            disabled={true}
                            fieldName="location"
                            placeholder={''}
                            required={false}
                            requiredLabel={true}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            disabled={true}
                            fieldName="branch"
                            placeholder={''}
                            required={false}
                            requiredLabel={true}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            disabled={true}
                            fieldName="department"
                            placeholder={''}
                            required={false}
                            requiredLabel={true}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            disabled={true}
                            fieldName="section"
                            placeholder={''}
                            required={false}
                            requiredLabel={true}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            disabled={true}
                            fieldName="position"
                            placeholder={''}
                            required={false}
                            requiredLabel={true}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            disabled={true}
                            fieldName="email"
                            placeholder={''}
                            required={false}
                            requiredLabel={true}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DropDownField
                            disabled={detailValue && true}
                            fieldName="assignTo"
                            required={true}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-[100%] ', fieldHeight)}
                            fieldWidth={filedWidth}
                            apiFields={{
                                value: 'Branch_ID',
                                label: 'Branch_Name',
                            }}
                        />
                    </div>
                    <TextAreaField
                        disabled={detailValue && true}
                        fieldName="remark"
                        required={detailValue ? false : true}
                        languageName={'hiringManager'}
                        fieldHeight={cn(' w-full h-[128px]')}
                        fieldWidth={'w-full'}
                        placeholder={t('placeHolder.typeHere')}
                    />
                    <div className={formContainer}>
                        <SwitchField
                            disabled={detailValue && true}
                            fieldName="externalHiring"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            flexDirection="flex-row  items-start  justify-start spy"
                        />
                        <SwitchField
                            disabled={detailValue && true}
                            fieldName="active"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'hiringManager'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            flexDirection="flex-row  items-start  justify-start spy"
                        />
                    </div>
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

export default InternalForm
