export enum AllowType {
    FREQUENCY = 'time',
    DAY = 'day',
    HOUR = 'hour',
}

export interface NotificationAlertType {
    birthday_threshold: number
    common_allow_type: AllowType
    contract_due_alert_threshold: number
    created_by: number
    created_date: string
    early_out_allow: number
    edited_by: number
    edited_date: string
    early_out_allow_type: AllowType
    expense_alert_time_out_threshold: number
    lateness_allow: number
    lateness_allow_type: AllowType
    leave_alert_time_out_threshold: number
    missing_swipe_allow: number
    missing_swipe_allow_type: AllowType
    newly_staff_threshold: number
    notifications_and_alerts_id: number
    overtime_alert_time_out_threshold: number
    probation_due_alert_threshold: number
    send_expense_email: boolean
    send_leave_email: boolean
    send_overtime_email: boolean
    send_recruitment_email: boolean
    send_training_email: boolean
    send_travel_email: boolean
    tenant_id: number
    training_alert_time_out_threshold: number
    travel_alert_time_out_threshold: number
    use_birthday: boolean
    use_contract_due_alert: boolean
    use_early_out_alert: boolean
    use_expense_alert_time_out: boolean
    use_lateness_alert: boolean
    use_leave_alert_time_out: boolean
    use_missing_swipe_alert: boolean
    use_newly_staff: boolean
    use_overtime_alert_time_out: boolean
    use_probation_due_alert: boolean
    use_training_alert_time_out: boolean
    use_travel_alert_time_out: boolean
    use_visa_expired_alert: boolean
    use_work_anniversary: boolean
    visa_expired_alert: number
    work_anniversary_threshold: number
}
