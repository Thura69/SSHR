export type CreateCurrencyType = {
    id?: number
    currencyType: string
    vaccineTypeName?:string,
    description?: string
    default?: boolean
}

export type CurrencyType = {
    CreateBy: number
    CreateDate: string
    CurrencyType: string
    Currency_ID: number
    Default_Currency: false
    Description: string
    EditBy: number
    IsActive: boolean
    Tenant_ID: number
}

export type CreatePostCurrencyType = {
    CurrencyType: string
    Default_Currency: boolean
    Description: string
}
