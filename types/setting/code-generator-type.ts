export type CodeGeneratorColumnDefType = {
    positionType: string
    serialNo: number
    prefix: string
    format: string
    generateCode: string
    remark: string
    employeeStatue:any[]
    employeeStatusName: any
}

export type CodeGeneratorType = {
    created_by: number
    created_date: string
    edited_by: number
    format: string
    generate_new_code: boolean
    is_active: boolean
    period: number
    prefix: string
    prefix_id: number
    serial_no: number
    tenant_id: number
    type: any[]
    remark: string
    employment_statuses: any[]
    employment_status_name: any
}
