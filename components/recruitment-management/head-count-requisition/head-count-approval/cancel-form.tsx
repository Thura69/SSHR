import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import TextAreaFieldWithTitle from '@/components/common/form/fields/text-area-field-with-title'

const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'

const ListItem = ({ title, value }: { title: string; value: string }) => {
    return (
        <li className="flex flex-col w-[33%] gap-1">
            <h3 className="text-[14px] text-zinc-400 font-bold">{title}</h3>
            <p className="text-[16px] text-sideMenuTextColor2">{value}</p>
        </li>
    )
}

const HCCancelForm = ({
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
    const { t } = useTranslation('headCountApproval')
    const isMobile = useMediaQuery('(max-width: 766px)')
    const FormSchema = yup.object({
        head_count_request_id: yup.number().required(),
        reason: yup.string().required(),
    })
    console.log(editData, 'cancel data')
    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            head_count_request_id: editData.head_count_request_id,
        },
    })

    const handleOnSave = (e: any) => {
        console.log(e)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSave)}>
                <div className={cn('space-y-4  px-2 pb-3 overflow-auto')}>
                    <div className={formContainer}>
                        <TextAreaFieldWithTitle
                            title="textareaCancel"
                            fieldName="reason"
                            disabled={detailValue && true}
                            required={detailValue ? false : true}
                            languageName={'headCountApproval'}
                            fieldHeight={cn(' w-full h-[128px]')}
                            fieldWidth={'w-full'}
                            placeholder={t('placeHolder.typeHere')}
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
                        editMode={false}
                        language="skillSet"
                        toggle={toggle}
                    />
                )}
            </form>
        </Form>
    )
}

export default HCCancelForm
