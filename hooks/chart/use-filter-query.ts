import { useQueryState } from 'nuqs'

export const useFilterQuery = () => {
    const [companyId, setCompanyId] = useQueryState('company_id', {
        defaultValue: '0',
        clearOnDefault: true,
    })
    const [branchId, setBranchId] = useQueryState('branch_id', {
        defaultValue: '0',
        clearOnDefault: true,
    })
    const [locationId, setLocationId] = useQueryState('location_id', {
        defaultValue: '0',
        clearOnDefault: true,
    })
    const [departmentId, setDepartmentId] = useQueryState('department_id', {
        defaultValue: '0',
        clearOnDefault: true,
    })

    return {
        companyId,
        setCompanyId,
        branchId,
        setBranchId,
        locationId,
        setLocationId,
        departmentId,
        setDepartmentId,
    }
}
