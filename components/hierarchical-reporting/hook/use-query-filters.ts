import { useQueryState } from 'nuqs'

const useQueryFilters = () => {
    const [fromCompanyFilter, setFromCompanyFilter] =
        useQueryState('r_f_company')
    const [fromLocationFilter, setFromLocationFilter] =
        useQueryState('r_f_location')

    const [fromBranchFilter, setFromBranchFilter] = useQueryState('r_f_branch')

    const [fromDepartmentFilter, setFromDepartmentFilter] =
        useQueryState('r_f_department')
    const [fromSectionFilter, setFromSectionFilter] =
        useQueryState('r_f_section')

    const [fromPositionFilter, setFromPositionFilter] =
        useQueryState('r_f_position')

    const [toCompanyFilter, setToCompanyFilter] = useQueryState('r_t_company')
    const [toLocationFilter, setToLocationFilter] =
        useQueryState('r_t_location')

    const [toBranchFilter, setToBranchFilter] = useQueryState('r_f_branch')

    const [toDepartmentFilter, setToDepartmentFilter] =
        useQueryState('r_t_department')
    const [toSectionFilter, setToSectionFilter] = useQueryState('r_t_section')

    const [toPositionFilter, setToPositionFilter] =
        useQueryState('r_t_position')

    const [requestTypeFilter, setRequestTypeFilter] =
        useQueryState('request_type')

        const [page, setPage] =
            useQueryState('page')

    return {
        toPositionFilter,
        setToPositionFilter,
        toSectionFilter,
        setToSectionFilter,
        toDepartmentFilter,
        setToDepartmentFilter,
        toBranchFilter,
        setToBranchFilter,
        toLocationFilter,
        setToLocationFilter,
        toCompanyFilter,
        setToCompanyFilter,
        fromPositionFilter,
        setFromPositionFilter,
        fromSectionFilter,
        setFromSectionFilter,
        fromDepartmentFilter,
        setFromDepartmentFilter,
        fromBranchFilter,
        setFromBranchFilter,
        fromLocationFilter,
        setFromLocationFilter,
        fromCompanyFilter,
        setFromCompanyFilter,
        requestTypeFilter,
        setRequestTypeFilter,
        page,
        setPage
    }
}

export default useQueryFilters
