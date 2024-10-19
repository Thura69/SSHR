import { useQuery } from '@tanstack/react-query'
import { getEmployeeOrgchart } from '@/service/apis/employee-orgchart'
import { useQueryState } from 'nuqs'
import { queryStringGenerator } from '@/lib/utils'
import useAuthStore from '@/state/zustand/auth-store'

export const useGetEmployeeOrgchart = () => {
    const userData = useAuthStore()

    const userCompany = userData ? userData?.userData?.company_id : undefined

    const [companyId] = useQueryState('company_id', {
        defaultValue: userCompany ? '' + userCompany : '',
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
        queryFn: () => getEmployeeOrgchart(query),
        queryKey: [`getEmployeeOrgchart?${query}`],
    })

    return { data, isError, isLoading, ...rest }
}
