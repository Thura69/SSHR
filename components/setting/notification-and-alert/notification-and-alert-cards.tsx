'use client'
import React from 'react'
import NotificationAndAlertCard from './notification-and-alert-card'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    AllowType,
    NotificationAlertType,
} from '@/types/setting/notification-alert'
import * as yup from 'yup'
import { Form } from '@/components/ui/form'
import { useUpdateNotification } from '@/service/query-hooks/setting/use-notificationAndAlert'
import useToast from '@/hooks/use-toast'
import useUserCookie from '@/hooks/use-user'
import useMenu from '@/state/zustand/menu'
import { updateAudit } from '@/lib/audit-trail-api'
import { Button } from '@/components/ui/button'
import Loader from '@/components/common/loaders/loader'
import useFormStore from '@/state/zustand/form-store'
import { getChangesValues } from '@/lib/utils'

const alert = [
    {
        title: 'lateness',
        type: 'drop',
        formInput: 'lateness_allow',
        formDrop: 'lateness_allow_type',
        formCheck: 'use_lateness_alert',
    },
    {
        title: 'earlyOut',
        type: 'drop',
        formInput: 'early_out_allow',
        formDrop: 'early_out_allow_type',
        formCheck: 'use_early_out_alert',
    },
    {
        title: 'missingSwipes',
        type: 'drop',
        formInput: 'missing_swipe_allow',
        formDrop: 'missing_swipe_allow_type',
        formCheck: 'use_missing_swipe_alert',
    },
    {
        title: 'probationDue',
        type: 'day',
        formInput: 'probation_due_alert_threshold',
        formCheck: 'use_probation_due_alert',
    },
    {
        title: 'contractDue',
        type: 'day',
        formInput: 'contract_due_alert_threshold',
        formCheck: 'use_contract_due_alert',
    },
    {
        title: 'passportExpired',
        type: 'day',
        formInput: 'visa_expired_alert',
        formCheck: 'use_visa_expired_alert',
    },
    {
        title: 'newlyStaff',
        type: 'day',
        formInput: 'newly_staff_threshold',
        formCheck: 'use_newly_staff',
    },
    {
        title: 'workAnniversary',
        type: 'day',
        formInput: 'work_anniversary_threshold',
        formCheck: 'use_work_anniversary',
    },
    {
        title: 'birthday',
        type: 'day',
        formInput: 'birthday_threshold',
        formCheck: 'use_birthday',
    },
]

const alertTimeOut = [
    {
        title: 'leave',
        type: 'day',
        formInput: 'leave_alert_time_out_threshold',
        formCheck: 'use_leave_alert_time_out',
    },
    {
        title: 'overTimeOut',
        type: 'day',
        formInput: 'overtime_alert_time_out_threshold',
        formCheck: 'use_overtime_alert_time_out',
    },
    {
        title: 'training',
        type: 'day',
        formInput: 'training_alert_time_out_threshold',
        formCheck: 'use_training_alert_time_out',
    },
    {
        title: 'travel',
        type: 'day',
        formInput: 'travel_alert_time_out_threshold',
        formCheck: 'use_travel_alert_time_out',
    },
    {
        title: 'expense',
        type: 'day',
        formInput: 'expense_alert_time_out_threshold',
        formCheck: 'use_expense_alert_time_out',
    },
]

const sendEmail = [
    { title: 'leave', type: undefined, formInput: 'send_leave_email' },
    {
        title: 'overTimeOut',
        type: undefined,
        formInput: 'send_overtime_email',
    },
    {
        title: 'training',
        type: undefined,
        formInput: 'send_training_email',
    },
    {
        title: 'travel',
        type: undefined,
        formInput: 'send_travel_email',
    },
    {
        title: 'expense',
        type: undefined,
        formInput: 'send_expense_email',
    },
    {
        title: 'recruitment',
        type: undefined,
        formInput: 'send_recruitment_email',
    },
]

export interface FormData {
    id?: number | undefined
    lateness_allow?: number | undefined
    lateness_allow_type?: AllowType | undefined
    early_out_allow?: number | undefined
    early_out_allow_type?: AllowType | undefined
    missing_swipe_allow?: number | undefined
    missing_swipe_allow_type?: AllowType | undefined
    probation_due_alert_threshold?: number | undefined
    contract_due_alert_threshold?: number | undefined
    visa_expired_alert?: number | undefined
    newly_staff_threshold?: number | undefined
    work_anniversary_threshold?: number | undefined
    birthday_threshold?: number | undefined
    leave_alert_time_out_threshold?: number | undefined
    overtime_alert_time_out_threshold?: number | undefined
    training_alert_time_out_threshold?: number | undefined
    travel_alert_time_out_threshold?: number | undefined
    expense_alert_time_out_threshold?: number | undefined
    use_leave_alert_time_out?: boolean
    use_overtime_alert_time_out?: boolean
    use_training_alert_time_out?: boolean
    use_travel_alert_time_out?: boolean
    use_expense_alert_time_out?: boolean
    send_recruitment_email?: boolean
    use_lateness_alert?: boolean
    use_early_out_alert?: boolean
    use_missing_swipe_alert?: boolean
    use_probation_due_alert?: boolean
    use_contract_due_alert?: boolean
    use_visa_expired_alert?: boolean
    use_newly_staff?: boolean
    use_work_anniversary: boolean
    use_birthday: boolean
    send_leave_email: boolean
    send_overtime_email: boolean
    send_training_email: boolean
    send_travel_email: boolean
    send_expense_email: boolean
}

function NotificationAndAlertCards({
    data: incomData,
}: {
    data: NotificationAlertType
}) {
    const { t } = useTranslation('notificationAndAlert')
    const { isPending, update } = useUpdateNotification()
    const { showNotification } = useToast()
    const user = useUserCookie()
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const { setIsSubmitting, formInputName, setResetFormInput } = useFormStore()

    const FormSchema = yup.object({
        id: yup.number(),
        lateness_allow: yup
            .number()
            .integer(t('integerError'))
            .min(0, t('positiveError'))
            .required('Required')
            .typeError('required')
            .test(
                'noEOrSign', // type of the validator (should be unique)
                "Number had an 'e' or sign.", // error message
                (value) =>
                    typeof value === 'number' &&
                    !/[eE+-]/.test(value.toString()),
            ),
        lateness_allow_type: yup.string().oneOf(Object.values(AllowType)),
        early_out_allow: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        early_out_allow_type: yup.string().oneOf(Object.values(AllowType)),
        missing_swipe_allow: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        missing_swipe_allow_type: yup.string().oneOf(Object.values(AllowType)),
        probation_due_alert_threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        contract_due_alert_threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        visa_expired_alert: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        newly_staff_threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        work_anniversary_threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        birthday_threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        leave_alert_time_out_threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        overtime_alert_time_out_threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        training_alert_time_out_threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        travel_alert_time_out_threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        expense_alert_time_out_threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        use_leave_alert_time_out: yup.boolean(),
        use_overtime_alert_time_out: yup.boolean(),
        use_training_alert_time_out: yup.boolean(),
        use_travel_alert_time_out: yup.boolean(),
        use_expense_alert_time_out: yup.boolean(),
        send_recruitment_email: yup.boolean(),
        use_lateness_alert: yup.boolean(),
        use_early_out_alert: yup.boolean(),
        use_missing_swipe_alert: yup.boolean(),
        use_probation_due_alert: yup.boolean(),
        use_contract_due_alert: yup.boolean(),
        use_visa_expired_alert: yup.boolean(),
        use_newly_staff: yup.boolean(),
        use_work_anniversary: yup.boolean(),
        use_birthday: yup.boolean(),
        send_leave_email: yup.boolean(),
        send_overtime_email: yup.boolean(),
        send_training_email: yup.boolean(),
        send_travel_email: yup.boolean(),
        send_expense_email: yup.boolean(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: incomData?.notifications_and_alerts_id,
            lateness_allow: incomData?.lateness_allow,
            lateness_allow_type: incomData?.lateness_allow_type,
            early_out_allow: incomData?.early_out_allow,
            early_out_allow_type: incomData?.early_out_allow_type,
            missing_swipe_allow: incomData?.missing_swipe_allow,
            missing_swipe_allow_type: incomData?.missing_swipe_allow_type,
            probation_due_alert_threshold:
                incomData?.probation_due_alert_threshold,
            contract_due_alert_threshold:
                incomData?.contract_due_alert_threshold,
            visa_expired_alert: incomData?.visa_expired_alert,
            newly_staff_threshold: incomData?.newly_staff_threshold,
            work_anniversary_threshold: incomData?.work_anniversary_threshold,
            birthday_threshold: incomData?.birthday_threshold,
            leave_alert_time_out_threshold:
                incomData?.leave_alert_time_out_threshold,
            overtime_alert_time_out_threshold:
                incomData?.overtime_alert_time_out_threshold,
            training_alert_time_out_threshold:
                incomData?.training_alert_time_out_threshold,
            travel_alert_time_out_threshold:
                incomData?.travel_alert_time_out_threshold,
            expense_alert_time_out_threshold:
                incomData?.expense_alert_time_out_threshold,
            use_leave_alert_time_out: incomData?.use_leave_alert_time_out,
            use_overtime_alert_time_out: incomData?.use_overtime_alert_time_out,
            use_training_alert_time_out: incomData?.use_training_alert_time_out,
            use_travel_alert_time_out: incomData?.use_travel_alert_time_out,
            use_expense_alert_time_out: incomData?.use_expense_alert_time_out,
            send_recruitment_email: incomData?.send_recruitment_email,
            use_lateness_alert: incomData?.use_lateness_alert,
            use_early_out_alert: incomData?.use_early_out_alert,
            use_missing_swipe_alert: incomData.use_missing_swipe_alert,
            use_probation_due_alert: incomData.use_probation_due_alert,
            use_contract_due_alert: incomData.use_contract_due_alert,
            use_visa_expired_alert: incomData.use_visa_expired_alert,
            use_newly_staff: incomData.use_newly_staff,
            use_work_anniversary: incomData.use_work_anniversary,
            use_birthday: incomData.use_birthday,
            send_leave_email: incomData.send_leave_email,
            send_overtime_email: incomData.send_overtime_email,
            send_training_email: incomData.send_training_email,
            send_travel_email: incomData.send_travel_email,
            send_expense_email: incomData.send_expense_email,
        },
    })

    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.employee_name!,
    //     Page_Name: 'notification and Alert Page',
    //     Parent_Menu_ID: selectedMenuId!,
    //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
    //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    // }

    const hideActionBtn = selectedGrandSubMenu?.is_edit

    const { dirtyFields } = form.formState

    const handleOnSave = async (data: any) => {
        setIsSubmitting(true)

        if (formInputName.length > 0) {
            formInputName.forEach((name) => {
                data[name] = 0
                form.setValue(name, 0)
            })
        }

        update(data, {
            onSuccess: (updateNoti) => {
                showNotification({
                    message: updateNoti.message,
                    type: 'success',
                })

                const { afterValue, beforeValue } = getChangesValues(
                    dirtyFields,
                    form,
                    incomData,
                )

                const result = Object.keys(dirtyFields).join(', ')

                // updateAudit({
                //     ...auditPayload,
                //     ValueAfter: afterValue,
                //     ValueBefore: beforeValue,
                //     Record_Name: result,
                // })

                setResetFormInput([])
            },
            onError: (error) => {
                showNotification({
                    message: error.message,
                    type: 'danger',
                })
            },
        })

        form.reset({}, { keepValues: true })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSave)} className=" mt-5">
                <div className=" space-y-10">
                    <NotificationAndAlertCard
                        form={form}
                        data={alert}
                        title={t('alert')}
                    />
                    <NotificationAndAlertCard
                        form={form}
                        data={alertTimeOut}
                        title={t('alertTimeOut')}
                    />
                    <NotificationAndAlertCard
                        form={form}
                        data={sendEmail}
                        title={t('sendEmail')}
                    />
                </div>
                {hideActionBtn && (
                    <div className="w-full mt-[20px] flex justify-end gap-2">
                        <Button
                            type="submit"
                            variant="primary"
                            className={`px-9 text-md w-[120px] h-[50px] py-2 md:px-12 md:py-3 ${isPending && 'opacity-50'}`}
                            disabled={isPending}
                        >
                            {isPending ? <Loader /> : t('save')}
                            {/* Save */}
                        </Button>
                    </div>
                )}
            </form>
        </Form>
    )
}

export default NotificationAndAlertCards
