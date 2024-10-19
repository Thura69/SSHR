export type DeviceSetUpColumnDefType = {
    Device_ID?: number
    DeviceName: string
    DeviceNumber: string
    Model: string
    Mode: string
    IsActive: boolean
    ConnectionType: string
    BaudRate: number
    IPAddress: string
    PortNumber: number
    Password: string
    Interval: number
    AllowMealAllowance: boolean
}

export type DeviceSetUpType = {
    allow_meal_allowance: boolean
    baud_rate: number
    connection_type: string
    created_by: number
    created_date: string
    device_name: string
    device_number: number
    device_id: number
    edited_by: number
    ip_address: string
    interval: number
    is_active: boolean
    last_read_time: string
    mode: string
    model: string
    password: string
    port_number: number
    tenant_id: number
}
