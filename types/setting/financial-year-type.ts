export type financialYearType = {
    country_id: string
    created_by: number
    created_date: string
    edited_by: number
    financial_year_id: number
    financial_year_name: number
    financial_year_from_date: string
    financial_year_to_date: string
    calendar_year_from_date: string
    is_active: boolean
    tenant_id: number
    calendar_year_to_date: string
}

export type updateFinancialYearType = {
    calendar: string
    calendarYearFrom: string
    calendarYearTo: string
    country: string
    financial: string
    financialYearName: string
    financialyear: string
    id: number
    isActive: boolean
    payrollFromDate: string
    payrollToDate: string
}
