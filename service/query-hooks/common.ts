import { useQuery } from '@tanstack/react-query'
import {
    getBranchOptions,
    getCompanyOptions,
    getDepartmentOptions,
    getLocationOptions,
    getPositionOptions,
    getSectionOptions,
} from '@/service/apis/common'
import { getRemainingDays } from '@/components/auth/api/login'

interface BranchProps {
    Branch_ID: number
    Branch_Name: string
}

interface LocationProps {
    Location_ID: number
    Location_Name: string
}

interface CompanyProps {
    Company_ID: number
    Company_Name: string
}

interface DepartmentProps {
    Department_ID: number
    Department_Name: string
}

interface SectionProps {
    Section_ID: number
    Section_Name: string
}

interface PositionProps {
    Position_ID: number
    Position_Name: string
    CreateDate: string
    CreateBy: number
    EditBy: number
    IsActive: boolean
    JobCategory_ID: number
    Tenant_ID: number
    totalEmployees: number
}

interface OptionProps {
    hasEmpty?: boolean
}

const Empty_Option = {
    id: '0',
    label: 'Select',
}



const branchTransformer = (data: any, hasEmpty: boolean) => {
    const branchList = data.data.map((branchOption: BranchProps) => ({
        id: branchOption.Branch_ID,
        value: branchOption.Branch_ID,
        label: branchOption.Branch_Name,
    }))
    if (hasEmpty) {
        return [Empty_Option, ...branchList]
    }
    return [...branchList]
}

const locationTransformer = (data: any, hasEmpty: boolean) => {
    const locationList = data.data.map((locationOption: LocationProps) => ({
        id: locationOption.Location_ID,
        value: locationOption.Location_ID,
        label: locationOption.Location_Name,
    }))
    if (hasEmpty) {
        return [Empty_Option, ...locationList]
    }
    return [...locationList]
}

const positionTransformer = (data: any, hasEmpty: boolean) => {
    const locationList = data.data.map((positionOption: PositionProps) => ({
        id: positionOption.Position_ID,
        value: positionOption.Position_ID,
        label: positionOption.Position_Name,
    }))
    if (hasEmpty) {
        return [Empty_Option, ...locationList]
    }
    return [...locationList]
}

const companyTransformer = (data: any, hasEmpty: boolean) => {
    const companyList = data.data.map((companyOption: CompanyProps) => ({
        id: companyOption.Company_ID,
        value: companyOption.Company_ID,
        label: companyOption.Company_Name,
    }))
    if (hasEmpty) {
        return [Empty_Option, ...companyList]
    }
    return [...companyList]
}

const departmentTransformer = (data: any, hasEmpty: boolean) => {
    const departmentList = data.data.map(
        (departmentOption: DepartmentProps) => ({
            id: departmentOption.Department_ID,
            value: departmentOption.Department_ID,
            label: departmentOption.Department_Name,
        }),
    )
    if (hasEmpty) {
        return [Empty_Option, ...departmentList]
    }
    return [...departmentList]
}

const sectionTransformer = (data: any, hasEmpty: boolean) => {
    const sectionList = data.data.map((sectionOption: SectionProps) => ({
        id: sectionOption.Section_ID,
        value: sectionOption.Section_ID,
        label: sectionOption.Section_Name,
    }))
    if (hasEmpty) {
        return [Empty_Option, ...sectionList]
    }
    return [...sectionList]
}

export const useGetBranchOptions = ({ hasEmpty = true }: OptionProps) => {
    const queryData = useQuery({
        queryKey: ['getBranchOptions'],
        queryFn: getBranchOptions,
        select: (data) => branchTransformer(data, hasEmpty),
    })

    return queryData
}

export const useGetLocationOptions = ({ hasEmpty = true }: OptionProps) => {
    const queryData = useQuery({
        queryKey: ['getLocationOptions'],
        queryFn: getLocationOptions,
        select: (data) => locationTransformer(data, hasEmpty),
    })

    return queryData
}

export const useGetPositionOptions = ({ hasEmpty = true }: OptionProps) => {
    const queryData = useQuery({
        queryKey: ['getPositionOptions'],
        queryFn: getPositionOptions,
        select: (data) => positionTransformer(data, hasEmpty),
    })

    return queryData
}

export const useGetCompanyOptions = ({ hasEmpty = true }: OptionProps) => {
    const queryData = useQuery({
        queryKey: ['getCompanyOptions'],
        queryFn: getCompanyOptions,
        select: (data) => companyTransformer(data, hasEmpty),
    })

    return queryData
}
export const useGetDepartmentOptions = ({ hasEmpty = true }: OptionProps) => {
    const queryData = useQuery({
        queryKey: ['getDepartmentOptions'],
        queryFn: getDepartmentOptions,
        select: (data) => departmentTransformer(data, hasEmpty),
    })

    return queryData
}

export const useGetSectionOptions = ({ hasEmpty = true }: OptionProps) => {
    const queryData = useQuery({
        queryKey: ['getSectionOptions'],
        queryFn: getSectionOptions,
        select: (data) => sectionTransformer(data, hasEmpty),
    })

    return queryData
}

export const useGetTrialRemainingDays = () => {
    const queryData = useQuery({
        queryKey: ['getRemainingDays'],
        queryFn: getRemainingDays,
    })
    return queryData
}
