import { parseAsInteger, useQueryState } from 'nuqs'

const userUserQueryFilters = () => {

    const [branchFilter, setBranchFilter] = useQueryState('branch_id')

    const [departmentFilter, setDepartmentFilter] = useQueryState('department_id')

    const [positionFilter, setPositionFilter] = useQueryState('position_id')

    const [roleFilter, setRoleFilter] = useQueryState('role_id')

    const [statusFilter, setStatusFilter] = useQueryState('is_active')

    const [page, setPage] = useQueryState('page', parseAsInteger)

    return {
        branchFilter, setBranchFilter,
        departmentFilter, setDepartmentFilter,
        positionFilter, setPositionFilter,
        roleFilter, setRoleFilter,
        statusFilter, setStatusFilter,
        page, setPage
    }
}

export default userUserQueryFilters
