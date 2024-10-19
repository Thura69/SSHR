export type menuTypes =
    | 'employmentStatus'
    | 'jobCategory'
    | 'jobGrade'
    | 'jobType'
    | 'subGrade'
    | 'awardType'
    | 'relationship'
    | 'vaccineType'
    | 'contractType'
    | 'location'
    | 'resign'
    | 'typeOfAppointment'


export type CreateSettingType = {
    name: string
    description?: string
    isActive: boolean
}

export type UpdateSettingType = {
    name: string
    description?: string
    isActive: boolean
    id: number
}

export type SettingFormType = {
    name: string
    description?: string
    isActive: boolean
}

export type SettingColumnDefType = {
    name: string
    description: string
    status: boolean
    id: number
}
