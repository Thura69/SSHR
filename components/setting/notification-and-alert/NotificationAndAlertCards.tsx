'use client'
import React from 'react'
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
import { Button } from '@/components/ui/button'
import { getChangesValues } from '@/lib/utils'
import NotificationAndAlertCard from './notification-and-alert-card'
import { updateAudit } from '@/lib/audit-trail-api'
import useFormStore from '@/state/zustand/form-store'
import Loader from '@/components/common/loaders/loader'

const alert = [
    {
        title: 'lateness',
        type: 'drop',
        formInput: 'Lateness_Allow',
        formDrop: 'Lateness_Allow_Type',
        formCheck: 'Use_LatenessAlert',
    },
    {
        title: 'earlyOut',
        type: 'drop',
        formInput: 'Earlyout_Allow',
        formDrop: 'Earlyout_Allow_Type',
        formCheck: 'Use_EarlyoutAlert',
    },
    {
        title: 'missingSwipes',
        type: 'drop',
        formInput: 'MissingSwipe_Allow',
        formDrop: 'Missing_Swipe_Allow_Type',
        formCheck: 'Use_MissingSwipeAlert',
    },
    {
        title: 'probationDue',
        type: 'day',
        formInput: 'Probation_Due_Alert_Threshold',
        formCheck: 'Use_Probation_Due_Alert',
    },
    {
        title: 'contractDue',
        type: 'day',
        formInput: 'Contract_Due_Alert_Threshold',
        formCheck: 'Use_Contract_Due_Alert',
    },
    {
        title: 'passportExpired',
        type: 'day',
        formInput: 'Visa_Expired_Alert',
        formCheck: 'Use_Visa_Expired_Alert',
    },
    {
        title: 'newlyStaff',
        type: 'day',
        formInput: 'Newly_Staff_Threshold',
        formCheck: 'Use_Newly_Staff',
    },
    {
        title: 'workAnniversary',
        type: 'day',
        formInput: 'Work_Anniversary_Threshold',
        formCheck: 'Use_Work_Anniversary',
    },
    {
        title: 'birthday',
        type: 'day',
        formInput: 'Birthday_Threshold',
        formCheck: 'Use_Birthday',
    },
]

const alertTimeOut = [
    {
        title: 'leave',
        type: 'day',
        formInput: 'Leave_Alert_Time_Out_Threshold',
        formCheck: 'Use_Leave_Alert_Time_Out',
    },
    {
        title: 'overTimeOut',
        type: 'day',
        formInput: 'Overtime_Alert_Time_Out_Threshold',
        formCheck: 'Use_Overtime_Alert_Time_Out',
    },
    {
        title: 'training',
        type: 'day',
        formInput: 'Training_Alert_Time_Out_Threshold',
        formCheck: 'Use_Training_Alert_Time_Out',
    },
    {
        title: 'travel',
        type: 'day',
        formInput: 'Travel_Alert_Time_Out_Threshold',
        formCheck: 'Use_Travel_Alert_Time_Out',
    },
    {
        title: 'expense',
        type: 'day',
        formInput: 'Expense_Alert_Time_Out_Threshold',
        formCheck: 'Use_Expense_Alert_Time_Out',
    },
]

const sendEmail = [
    { title: 'leave', type: undefined, formInput: 'Send_Leave_Email' },
    {
        title: 'overTimeOut',
        type: undefined,
        formInput: 'Send_Overtime_Email',
    },
    {
        title: 'training',
        type: undefined,
        formInput: 'Send_Training_Email',
    },
    {
        title: 'travel',
        type: undefined,
        formInput: 'Send_Travel_Email',
    },
    {
        title: 'expense',
        type: undefined,
        formInput: 'Send_Expense_Email',
    },
    {
        title: 'recruitment',
        type: undefined,
        formInput: 'Send_Recruitment_Email',
    },
]

export interface FormData {
    id?: number | undefined
    Lateness_Allow?: number | undefined
    Lateness_Allow_Type?: AllowType | undefined
    Earlyout_Allow?: number | undefined
    Earlyout_Allow_Type?: AllowType | undefined
    MissingSwipe_Allow?: number | undefined
    Missing_Swipe_Allow_Type?: AllowType | undefined
    Probation_Due_Alert_Threshold?: number | undefined
    Contract_Due_Alert_Threshold?: number | undefined
    Visa_Expired_Alert?: number | undefined
    Newly_Staff_Threshold?: number | undefined
    Work_Anniversary_Threshold?: number | undefined
    Birthday_Threshold?: number | undefined
    Leave_Alert_Time_Out_Threshold?: number | undefined
    Overtime_Alert_Time_Out_Threshold?: number | undefined
    Training_Alert_Time_Out_Threshold?: number | undefined
    Travel_Alert_Time_Out_Threshold?: number | undefined
    Expense_Alert_Time_Out_Threshold?: number | undefined
    Use_Leave_Alert_Time_Out?: boolean
    Use_Overtime_Alert_Time_Out?: boolean
    Use_Training_Alert_Time_Out?: boolean
    Use_Travel_Alert_Time_Out?: boolean
    Use_Expense_Alert_Time_Out?: boolean
    Send_Recruitment_Email?: boolean
    Use_LatenessAlert?: boolean
    Use_EarlyoutAlert?: boolean
    Use_MissingSwipeAle?: boolean
    Use_Probation_Due_Alert?: boolean
    Use_Contract_Due_Alert?: boolean
    Use_Visa_Expired_Alert?: boolean
    Use_Newly_Staff?: boolean
    Use_Work_Anniversary: boolean
    Use_Birthday: boolean
    Send_Leave_Email: boolean
    Send_Overtime_Email: boolean
    Send_Training_Email: boolean
    Send_Travel_Email: boolean
    Send_Expense_Email: boolean
}

const NotificationAndAlertCards = ({
    data: incomData,
}: {
    data: NotificationAlertType
}) => {
    const { t } = useTranslation('notificationAndAlert')
    const { isError, isPending, update } = useUpdateNotification()
    const { showNotification } = useToast()
    const user = useUserCookie()
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const { isSubmitting, setIsSubmitting, formInputName, setResetFormInput } =
        useFormStore()

    const FormSchema = yup.object({
        id: yup.number(),
        Lateness_Allow: yup
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
        Lateness_Allow_Type: yup.string().oneOf(Object.values(AllowType)),
        Earlyout_Allow: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Earlyout_Allow_Type: yup.string().oneOf(Object.values(AllowType)),
        MissingSwipe_Allow: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Missing_Swipe_Allow_Type: yup.string().oneOf(Object.values(AllowType)),
        Probation_Due_Alert_Threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Contract_Due_Alert_Threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Visa_Expired_Alert: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Newly_Staff_Threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Work_Anniversary_Threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Birthday_Threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Leave_Alert_Time_Out_Threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Overtime_Alert_Time_Out_Threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Training_Alert_Time_Out_Threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Travel_Alert_Time_Out_Threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Expense_Alert_Time_Out_Threshold: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        Use_Leave_Alert_Time_Out: yup.boolean(),
        Use_Overtime_Alert_Time_Out: yup.boolean(),
        Use_Training_Alert_Time_Out: yup.boolean(),
        Use_Travel_Alert_Time_Out: yup.boolean(),
        Use_Expense_Alert_Time_Out: yup.boolean(),
        Send_Recruitment_Email: yup.boolean(),
        Use_LatenessAlert: yup.boolean(),
        Use_EarlyoutAlert: yup.boolean(),
        Use_MissingSwipeAlert: yup.boolean(),
        Use_Probation_Due_Alert: yup.boolean(),
        Use_Contract_Due_Alert: yup.boolean(),
        Use_Visa_Expired_Alert: yup.boolean(),
        Use_Newly_Staff: yup.boolean(),
        Use_Work_Anniversary: yup.boolean(),
        Use_Birthday: yup.boolean(),
        Send_Leave_Email: yup.boolean(),
        Send_Overtime_Email: yup.boolean(),
        Send_Training_Email: yup.boolean(),
        Send_Travel_Email: yup.boolean(),
        Send_Expense_Email: yup.boolean(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: incomData?.notifications_and_alerts_id,
            Lateness_Allow: incomData?.lateness_allow,
            Lateness_Allow_Type: incomData?.lateness_allow_type,
            Earlyout_Allow: incomData?.early_out_allow,
            Earlyout_Allow_Type: incomData?.early_out_allow_type,
            MissingSwipe_Allow: incomData?.missing_swipe_allow,
            Missing_Swipe_Allow_Type: incomData?.missing_swipe_allow_type,
            Probation_Due_Alert_Threshold:
                incomData?.probation_due_alert_threshold,
            Contract_Due_Alert_Threshold:
                incomData?.contract_due_alert_threshold,
            Visa_Expired_Alert: incomData?.visa_expired_alert,
            Newly_Staff_Threshold: incomData?.newly_staff_threshold,
            Work_Anniversary_Threshold: incomData?.work_anniversary_threshold,
            Birthday_Threshold: incomData?.birthday_threshold,
            Leave_Alert_Time_Out_Threshold:
                incomData?.leave_alert_time_out_threshold,
            Overtime_Alert_Time_Out_Threshold:
                incomData?.overtime_alert_time_out_threshold,
            Training_Alert_Time_Out_Threshold:
                incomData?.training_alert_time_out_threshold,
            Travel_Alert_Time_Out_Threshold:
                incomData?.travel_alert_time_out_threshold,
            Expense_Alert_Time_Out_Threshold:
                incomData?.expense_alert_time_out_threshold,
            Use_Leave_Alert_Time_Out: incomData?.use_leave_alert_time_out,
            Use_Overtime_Alert_Time_Out: incomData?.use_overtime_alert_time_out,
            Use_Training_Alert_Time_Out: incomData?.use_training_alert_time_out,
            Use_Travel_Alert_Time_Out: incomData?.use_travel_alert_time_out,
            Use_Expense_Alert_Time_Out: incomData?.use_expense_alert_time_out,
            Send_Recruitment_Email: incomData?.send_recruitment_email,
            Use_LatenessAlert: incomData?.use_lateness_alert,
            Use_EarlyoutAlert: incomData?.use_early_out_alert,
            Use_MissingSwipeAlert: incomData.use_missing_swipe_alert,
            Use_Probation_Due_Alert: incomData.use_probation_due_alert,
            Use_Contract_Due_Alert: incomData.use_contract_due_alert,
            Use_Visa_Expired_Alert: incomData.use_visa_expired_alert,
            Use_Newly_Staff: incomData.use_newly_staff,
            Use_Work_Anniversary: incomData.use_work_anniversary,
            Use_Birthday: incomData.use_birthday,
            Send_Leave_Email: incomData.send_leave_email,
            Send_Overtime_Email: incomData.send_overtime_email,
            Send_Training_Email: incomData.send_training_email,
            Send_Travel_Email: incomData.send_travel_email,
            Send_Expense_Email: incomData.send_expense_email,
        },
    })

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: 'Notification and Alert Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

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

                updateAudit({
                    ...auditPayload,
                    ValueAfter: afterValue,
                    ValueBefore: beforeValue,
                    Record_Name: `Notification and Alerts`,
                })

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
                            className={`px-9 text-md py-2 md:px-12 md:py-3 ${isPending && 'opacity-50'}`}
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
