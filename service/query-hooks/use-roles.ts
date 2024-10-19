import { parseAsInteger, useQueryState } from 'nuqs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAuthStore from '@/state/zustand/auth-store'
import {
    createRole,
    deleteRoleById,
    editRole,
    getAllRoles,
    getEmployeeByFilters,
    getRoleById,
    getRoleDynamicMenu,
    getRoleFilters,
    getRoleFiltersByBranch,
    getRoleFiltersByCompany,
    getRoleFiltersByDepartment,
    getRoleFiltersByLocation,
    getVEmployee,
} from '@/service/apis/role-register'
import useToast from '@/hooks/use-toast'
import { MAX_PAGE_SIZE, queryStringGenerator } from '@/lib/utils'

const queryKey = 'Role'

export const useRoles = () => {
    const queryClient = useQueryClient()
    // page and size getter from url
    const [page] = useQueryState<number>('page', parseAsInteger.withDefault(1))
    const [isActive] = useQueryState('is_active', {
        defaultValue: '',
        clearOnDefault: true,
    })
    const [size] = useQueryState('size', parseAsInteger.withDefault(15))
    const [name] = useQueryState('name', {
        clearOnDefault: true,
        defaultValue: '',
    })
    const [orderBy] = useQueryState('order_by', {
        clearOnDefault: true,
        defaultValue: '',
    })
    const [sortBy] = useQueryState('sort_by', {
        clearOnDefault: true,
        defaultValue: '',
    })

    const userId = useAuthStore((state) => state.userData.user_id)

    const commonQuery = {
        user_id: userId,
        isActive,
        name,
        size: Math.min(size, MAX_PAGE_SIZE),
        ...(!name ? { page } : {}),
        sort_by: sortBy,
        order_by: orderBy,
    }


    const currentQuery = queryStringGenerator(commonQuery)

   

    // fetch get-all query
    const { isLoading, data, isError, ...rest } = useQuery({
        queryKey: [`getAllRoles?${currentQuery}`, currentQuery],
        queryFn: () => getAllRoles(currentQuery),
        refetchOnMount: 'always',
    })

    


    // prefetch query
    // prev page prefetch
    if (page > 1) {
        const prevQueryString = queryStringGenerator({
            ...commonQuery,
            page: page - 1,
        })
        queryClient.prefetchQuery({
            queryKey: [`getAllRoles?${prevQueryString}`],
            queryFn: () => getAllRoles(prevQueryString),
        })
    }

    // next page prefetch
    const nextQueryString = queryStringGenerator({
        ...commonQuery,
        page: page + 1,
    })

    queryClient.prefetchQuery({
        queryKey: [`getAllRoles?${nextQueryString}`],
        queryFn: () => getAllRoles(nextQueryString),
    })

    return { isLoading, data, isError, ...rest }
}

export const useGetRoleDynamicMenu = ({ ...params }: Record<string, any>) => {

    const query = queryStringGenerator({ ...params })

    const { isLoading, data,isError, ...rest } = useQuery({
        queryKey: [`getRoleDynamicMenu`],
        queryFn: () => getRoleDynamicMenu(query),
    });



    return { isLoading, data, isError, ...rest }
}

export const useGetVEmployee = ({ ...params }: any) => {
    const [position_id] = useQueryState('position_id')
    const [location_id] = useQueryState('location_id')
    const [department_id] = useQueryState('department_id')
    const [branch_id] = useQueryState('branch_id')
    const [section_id] = useQueryState('section_id')
    const [company_id] = useQueryState('company_id')
    const [page] = useQueryState('page', parseAsInteger.withDefault(1))
    const [size] = useQueryState('size', parseAsInteger.withDefault(15))

    const query = queryStringGenerator({
        page,
        size: Math.min(size, MAX_PAGE_SIZE),
        Position_ID: position_id,
        Location_ID: location_id,
        Department_ID: department_id,
        Branch_ID: branch_id,
        Section_ID: section_id,
        Company_ID: company_id,
    })

    const { isLoading, data, isError, ...rest } = useQuery({
        queryKey: [
            `getVEmployee/page-${page}-size-${Math.min(size, MAX_PAGE_SIZE)}-Position_ID-${position_id}-Location_ID-${location_id}
        -Department_ID-${department_id}-Branch_ID-${branch_id}-Section_ID-${section_id}/Company_ID-${company_id}`,
        ],
        queryFn: () => getVEmployee(query),
        refetchOnMount: 'always',
    })

    return { isLoading, data, isError, ...rest }
}

export const useDeleteRole = () => {
    const [page] = useQueryState<number>('page', parseAsInteger.withDefault(1))
    const [isActive] = useQueryState('is_active')
    const [size] = useQueryState('size', parseAsInteger.withDefault(15))
    const [name] = useQueryState('name', {
        clearOnDefault: true,
        defaultValue: '',
    })

    const [sort_by] = useQueryState('sort_by', {
        clearOnDefault: true,
        defaultValue: '',
    })
    const [order_by] = useQueryState('order_by', {
        clearOnDefault: true,
        defaultValue: '',
    })
    const userId = useAuthStore((state) => state.userData.user_id)
    const commonQuery = {
        User_ID: userId,
        isActive,
        name,
        size: Math.min(size, MAX_PAGE_SIZE),
        page,
        sort_by: sort_by,
        order_by: order_by,
    }

    const currentQuery = queryStringGenerator(commonQuery)

    const queryClient = useQueryClient()

    const { showNotification } = useToast()

    const {
        isPending,
        mutate: deleteById,
        isError,
    } = useMutation({
        mutationFn: deleteRoleById,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [`getAllRoles?${currentQuery}`, currentQuery],
            })
        },
        onError: (data) => {
            showNotification({ message: data.message, type: 'danger' })
        },
    })

    return {
        isPending,
        deleteById,
        isError,
    }
}

export const useCreateRole = () => {
    const queryClient = useQueryClient()
    const [isActive] = useQueryState('is_active')
    const [page] = useQueryState('page', parseAsInteger.withDefault(1))
    const [size] = useQueryState('size', parseAsInteger.withDefault(15))
    const { showNotification } = useToast()

    const {
        isPending,
        mutate: create,
        isError,
    } = useMutation({
        mutationFn: (data: any) => {
            return createRole(data)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}/size-${Math.min(size, MAX_PAGE_SIZE)}`,
                    `${queryKey}/page-${page}/size-${Math.min(size, MAX_PAGE_SIZE)}/isActive-${isActive}`,
                ],
            })
        },
        onError: (data) => {
            showNotification({ message: data.message, type: 'danger' })
        },
    })

    return {
        isPending,
        create,
        isError,
    }
}

export const useEditRole = ({ roleId }: { roleId: string }) => {
    const queryClient = useQueryClient()

    const [page] = useQueryState<number>('page', parseAsInteger.withDefault(1))
    const [isActive] = useQueryState('is_active')
    const [size] = useQueryState('size', parseAsInteger.withDefault(15))
    const [name] = useQueryState('name', {
        clearOnDefault: true,
        defaultValue: '',
    })
    const userId = useAuthStore((state) => state.userData.user_id)

    const commonQuery = {
        User_ID: userId,
        isActive,
        name,
        size: Math.min(size, MAX_PAGE_SIZE),
        page,
    }

    const currentQuery = queryStringGenerator(commonQuery)

    const {
        isPending,
        mutate: edit,
        isError,
        ...rest
    } = useMutation({
        mutationFn: (data: any) => {
            return editRole(data)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [`getAllRoles?${currentQuery}`],
            })
        },
    })

    return {
        isPending,
        edit,
        isError,
        ...rest,
    }
}

export const useGetRoleById = (roleId: string) => {
    // fetch get-all query
    const { showNotification } = useToast()

    const { isLoading, data, isError, error, ...rest } = useQuery({
        queryKey: ['getRoleById', roleId],
        queryFn: () => getRoleById(roleId),
        enabled: !!roleId,
    })

    if (isError) {
        showNotification({ message: error.message, type: 'danger' })
    }

    return { isLoading, data, isError, ...rest }
}

export const useGetAllRoleFilters = () => {
    const {
        data: filters,
        isLoading: loadingFilters,
        isError,
        refetch,
    } = useQuery({
        queryKey: [`getRoleFilters`],
        queryFn: () => getRoleFilters(),
        enabled: false,
    })

    return {
        allFilters: filters,
        isError,
        loadingFilters,
        refetchAllFilters: refetch,
    }
}

export const useGetAllRoleFiltersByCompany = ({
    company_id,
}: {
    company_id: number | string
}) => {
    const query = queryStringGenerator({ company_id })

    const {
        data,
        isLoading: loadingFilters,
        isError,
        refetch,
    } = useQuery({
        queryKey: [`getRoleFiltersByCompany?${query}`],
        queryFn: () => getRoleFiltersByCompany({ company_id: company_id }),
        enabled: false,
    })

    return {
        rolesFiltersByCompany: data,
        isError,
        loadingFilters,
        fetchFiltersByCompany: refetch,
    }
}

export const useGetAllRoleFiltersByLocation = ({
    company_id,
    location_id,
    customQuery,
}: {
    company_id?: number | string
    location_id: number | string
    customQuery?: string
}) => {
    const query = queryStringGenerator({ company_id, location_id })

    const {
        data,
        isLoading: loadingFilters,
        isError,
        refetch,
    } = useQuery({
        queryKey: [`getRoleFiltersByLocation?${query}`, customQuery],
        queryFn: () => getRoleFiltersByLocation({ company_id, location_id }),
        enabled: false,
    })

    return {
        rolesFiltersByLocation: data,
        isError,
        loadingFilters,
        fetchFiltersByLocation: refetch,
    }
}

export const useGetAllRoleFiltersByBranch = ({
    company_id,
    location_id,
    branch_id,
    customQuery,
}: {
    company_id?: number | string
    location_id?: number | string
    branch_id: number | string
    customQuery?: string
}) => {
    const query = queryStringGenerator({ company_id, location_id, branch_id })

    const {
        data,
        isLoading: loadingFilters,
        isError,
        refetch,
    } = useQuery({
        queryKey: [`getRoleFiltersByBranch?${query}`, customQuery],
        queryFn: () =>
            getRoleFiltersByBranch({ company_id, location_id, branch_id }),
        enabled: false,
    })

    return {
        rolesFiltersByBranch: data,
        isError,
        loadingFilters,
        fetchFiltersByBranch: refetch,
    }
}

export const useGetAllRoleFiltersByDepartment = ({
    company_id,
    location_id,
    branch_id,
    department_id,
}: {
    company_id?: number | string
    location_id?: number | string
    branch_id?: number | string
    department_id: number | string
}) => {
    const query = queryStringGenerator({
        company_id,
        location_id,
        branch_id,
        department_id,
    })

    const {
        data,
        isLoading: loadingFilters,
        isError,
        refetch,
    } = useQuery({
        queryKey: [`getRoleFiltersByDepartment?${query}`],
        queryFn: () =>
            getRoleFiltersByDepartment({
                company_id,
                location_id,
                branch_id,
                department_id,
            }),
        enabled: false,
    })

    return {
        rolesFiltersByDepartment: data,
        isError,
        loadingFilters,
        fetchFiltersByDepartment: refetch,
    }
}

export const useGetEmployeeByFilters = (
    props: Partial<{
        company_id: number
        location_id: number
        branch_id: number
        department_id: number
        section_id: number
        is_active?: boolean
    }>,
) => {
    const query = queryStringGenerator(props)
    const {
        data: employee,
        isLoading: loadingEmp,
        error,
        isError,
        refetch,
    } = useQuery({
        queryKey: [`getEmployeeByFilters?${query}`],
        queryFn: () => getEmployeeByFilters(query),
        enabled: false,
    })

   


    return { employee, isError, loadingEmp, refetch }
}
