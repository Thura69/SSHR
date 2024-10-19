import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useFilterQuery } from '@/hooks/chart/use-filter-query'

export const useOrgchartForm = () => {
    const form = useForm()
    const watchDepartment = form.watch('department_id')
    const watchLocation = form.watch('location_id')
    const watchBranch = form.watch('branch_id')
    const watchCompany = form.watch('company_id')

    const { setDepartmentId, setLocationId, setBranchId, setCompanyId } =
        useFilterQuery()

    useEffect(() => {
        if (watchCompany !== 'null') {
            setCompanyId(watchCompany)
        }
        if (watchDepartment) {
            setDepartmentId(watchDepartment)
        }
        if (watchBranch) {
            setBranchId(watchBranch)
        }
        if (watchLocation) {
            setLocationId(watchLocation)
        }
    }, [watchDepartment, watchBranch, watchLocation, watchCompany])

    return {
        form,
        watchBranch,
        watchCompany,
        watchLocation,
        watchDepartment,
    }
}
