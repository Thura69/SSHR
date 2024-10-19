import { useGetHierarchicalPositions } from '@/service/query-hooks/use-hierarchical-report'
import {
    useGetAllRoleFilters,
    useGetAllRoleFiltersByBranch,
    useGetAllRoleFiltersByCompany,
    useGetAllRoleFiltersByLocation,
} from '@/service/query-hooks/use-roles'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import * as _ from 'lodash'

interface useNestedFiltersProps {
    customQueryType: 'from' | 'to' | 'cc'
}

const useNestedFilters = ({ customQueryType }: useNestedFiltersProps) => {
    const form = useFormContext()
    const [companyOptions, setCompanyOptions] = useState<any[]>([])
    const [locationOptions, setLocationOptions] = useState<any[]>([])
    const [branchOptions, setBranchOptions] = useState<any[]>([])

    const watchCompany = form.watch('company')

    const watchFromLocation = form.watch(`${customQueryType}_location`)
    const watchFromBranch = form.watch(`${customQueryType}_branch`)

    const { allFilters, loadingFilters, refetchAllFilters } =
        useGetAllRoleFilters()

    const {
        fetchFiltersByCompany,
        rolesFiltersByCompany,
        loadingFilters: loadingFiltersByCompany,
    } = useGetAllRoleFiltersByCompany({ company_id: watchCompany })

    const {
        fetchFiltersByLocation,
        rolesFiltersByLocation,
        loadingFilters: loadingFiltersByLocation,
    } = useGetAllRoleFiltersByLocation({
        company_id: watchCompany,
        location_id: watchFromLocation,
        customQuery: `${customQueryType}_location`,
    })

    const {
        fetchFiltersByBranch,
        rolesFiltersByBranch,
        loadingFilters: loadingFiltersByBranch,
    } = useGetAllRoleFiltersByBranch({
        company_id: watchCompany,
        location_id: watchFromLocation,
        branch_id: watchFromBranch,
        customQuery: `${customQueryType}_branch`,
    })

    const { data: hierarchicalCheckTree } = useGetHierarchicalPositions({
        company_id: watchCompany,
        branch_id: watchFromBranch,
        location_id: watchFromLocation,
        customQuery: `${customQueryType}_positions`,
    })

    const setFilterOptions = (filters: any) => {
        if ('Company' in filters.data) {
            const companyData = _.map(filters.data.Company, (company) => ({
                value: company.Company_ID,
                label: company?.Company_Name ?? 'No Name',
            }))
            setCompanyOptions([...companyData])
        }
        if ('Location' in filters.data) {
            const locationData = _.map(filters.data.Location, (location) => ({
                value: location.Location_ID,
                label: location?.Location_Name ?? 'No Name',
            }))
            setLocationOptions([...locationData])
        }
        if ('Branch' in filters.data) {
            const branchData = _.map(filters.data.Branch, (branch) => ({
                value: branch.Branch_ID,
                label: branch?.Branch_Name ?? 'No Name',
            }))
            setBranchOptions([...branchData])
        }
    }

    useEffect(() => {
        refetchAllFilters()
    }, [])

    useEffect(() => {
        if (!loadingFilters && allFilters && allFilters?.data) {
            setFilterOptions(allFilters)
        }
    }, [allFilters, loadingFilters])

    useEffect(() => {
        if (watchCompany !== undefined) {
            fetchFiltersByCompany()
        } else {
            refetchAllFilters()
        }
    }, [watchCompany])

    useEffect(() => {
        if (rolesFiltersByCompany) {
            setFilterOptions(rolesFiltersByCompany)
        }
    }, [rolesFiltersByCompany])

    /// --- location
    useEffect(() => {
        if (watchFromLocation !== undefined) {
            fetchFiltersByLocation()
        } else {
            refetchAllFilters()
        }
    }, [watchFromLocation])

    useEffect(() => {
        if (rolesFiltersByLocation) {
            setFilterOptions(rolesFiltersByLocation)
        }
    }, [rolesFiltersByLocation])

    /// --- branch
    useEffect(() => {
        if (watchFromBranch !== undefined) {
            fetchFiltersByBranch()
        } else {
            refetchAllFilters()
        }
    }, [watchFromBranch])

    useEffect(() => {
        if (rolesFiltersByBranch) {
            setFilterOptions(rolesFiltersByBranch)
        }
    }, [rolesFiltersByBranch])

    const loading =
        loadingFilters ||
        loadingFiltersByBranch ||
        loadingFiltersByCompany ||
        loadingFiltersByLocation

    return {
        companyOptions,
        branchOptions,
        locationOptions,
        hierarchicalCheckTree,
        loading,
        allFilters,
    }
}

export default useNestedFilters
