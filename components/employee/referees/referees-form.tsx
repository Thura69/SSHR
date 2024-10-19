import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import useCandidateStore from '@/state/zustand/candidate'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '@/components/common/form/fields/input-field'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[calc(50%-10px)] w-full'
const formContainer = 'flex flex-col md:flex-row   justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(50%-10px)]'

const RefereesForm = ({
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
    const { t } = useTranslation('referees')
    const isMobile = useMediaQuery('(max-width: 766px)')
    const { setReferees } = useCandidateStore((state) => state)

    const FormSchema = yup.object({
        id: yup.number(),
        name: yup.string(),
        position: yup.string(),
        companyName: yup.string(),
        phoneNo: yup.string(),
        email: yup.string(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    const { formState } = form

    const handleOnSave = (e: any) => {
        if (isControled) {
            e.id = Date.now()
            setReferees(e)
        }

        toggle()
    }

    return (
        <Form {...form}>
            <form
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <div className="space-y-4  px-2 overflow-auto">
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="name"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'referees'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                        />
                        <InputField
                            disabled={detailValue && true}
                            fieldName="position"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'referees'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="companyName"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'referees'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                        />
                        <InputField
                            disabled={detailValue && true}
                            fieldName="phoneNo"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'referees'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                        />
                    </div>
                    <InputField
                        disabled={detailValue && true}
                        fieldName="email"
                        placeholder={t('placeHolder.typeHere')}
                        required={detailValue ? false : true}
                        languageName={'referees'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={'w-full'}
                    />
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

export default RefereesForm
