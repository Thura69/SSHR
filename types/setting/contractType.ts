export type CreateContractType = {
    id?: number
    name?: string
    description?: string
    active?: boolean
}

export type ContractType = {
    Contract_Description: string
    Contract_ID: number
    Contract_Name: string
    Contract_Term: number
    CreateBy: number
    CreateDate: string
    EditBy: number
    IsActive: boolean
    Tenant_ID: number
}

export type CreatePostContractType = {
    Contract_Name: string
   Contract_Description: string
    IsActive: boolean
}
