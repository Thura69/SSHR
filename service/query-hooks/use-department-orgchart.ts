import { useQuery } from '@tanstack/react-query'
import { queryStringGenerator } from '@/lib/utils'
import { getDepartmentOrgchart } from '@/service/apis/department-orgchart'
import { useQueryState } from 'nuqs'

export const useGetDepartmentOrgchart = () => {
    const [companyId] = useQueryState('company_id', {
        defaultValue: '',
        clearOnDefault: true,
    })
    const [branchId] = useQueryState('branch_id', {
        defaultValue: '',
        clearOnDefault: true,
    })
    const [locationId] = useQueryState('location_id', {
        defaultValue: '',
        clearOnDefault: true,
    })
    const [departmentId] = useQueryState('department_id', {
        defaultValue: '',
        clearOnDefault: true,
    })

    const query = queryStringGenerator({
        company_id: companyId,
        branch_id: branchId,
        location_id: locationId,
        department_id: departmentId,
    })

    const { data, isError, isLoading, ...rest } = useQuery({
        queryFn: () => getDepartmentOrgchart(query),
        queryKey: [`getDepartmentOrgchart?${query}`],
    })

    return { data, isError, isLoading, ...rest }
}
