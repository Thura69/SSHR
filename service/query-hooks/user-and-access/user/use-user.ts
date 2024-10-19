import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { queryStringGenerator } from '@/lib/utils'
import {
    createUserApi,
    deleteUserApi,
    editUserApi,
    getAllVUsersApi,
    getUserApi,
    getUserFilters,
    getUserRoleFilters,
    getUsersApi,
} from '@/service/apis/user-and-access/user-api'
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
const queryKey = 'user&Access/user'

interface BranchProps {
    Branch_ID: number
    Branch_Name: string
}

interface RoleProps {
    Role_ID: number
    Role_Name: string
}

interface DepartmentProps {
    Department_ID: number
    Department_Name: string
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

export const useFetchUser = ({
    user_id,
    employee_id,
}: {
    user_id?: string
    employee_id?: string
}) => {
    const queryString = queryStringGenerator({ user_id, employee_id })
    const { isLoading, data, isError } = useQuery({
        queryKey: [`${queryKey}/User_ID-${user_id}/Employee_ID-${employee_id}`],
        queryFn: () => getUserApi(queryString),
    })

    return { isLoading, data, isError }
}

export const useSearchUser = () => {
    const [Employee_Name] = useQueryState(
        'Employee_Name',
        parseAsString.withDefault(''),
    )
    const [Employee_No] = useQueryState(
        'Employee_No',
        parseAsString.withDefault(''),
    )
    const queryString = queryStringGenerator({ Employee_Name, Employee_No })
    // fetch get ALl query
    const { isLoading, data, isError } = useQuery({
        queryKey: [
            `${queryKey}/Employee_Name-${Employee_Name}/Employee_No-${Employee_No}`,
        ],
        queryFn: () => getUserApi(queryString),
    })
    return { isLoading, data, isError }
}

export const useUserFilterOptions = () => {
    const queryString = queryStringGenerator({ Is_Emp_Permission: true })
    const { isLoading, data, isError } = useQuery({
        queryKey: [`${queryKey}`],
        queryFn: () => getUserFilters(queryString),
    })

    return { isLoading, data, isError }
}

export const useUserRoleFilterOptions = () => {
    const queryString = queryStringGenerator({})
    const { isLoading, data, isError } = useQuery({
        queryKey: [`${queryKey}`],
        queryFn: () => getUserRoleFilters(queryString),
    })
    return { isLoading, data, isError }
}

export const useGetAllUsers = () => {
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )

    const [sort_by] = useQueryState('sort_by')

    const [order_by] = useQueryState('order_by')
    const [branch_id] = useQueryState(
        'branch_id'
    )
    const [position_id] = useQueryState(
        'position_id'

    )
    const [department_id] = useQueryState(
        'department_id'
    )
    const [role_id] = useQueryState('role_id')
    const [is_active] = useQueryState(
        'is_active'
    )

    const [employee_no] = useQueryState('employee_no')
    const [employee_name] = useQueryState('employee_name')
    const queryClient = useQueryClient()

    const queryString = queryStringGenerator({
        page,
        size,
        sort_by,
        order_by,
        branch_id,
        position_id,
        department_id,
        role_id,
        is_active,
        employee_no,
        employee_name
    })

    // fetch get ALl query
    const { isLoading, data, isError } = useQuery({
        queryKey: [
            `${queryKey}/page-${page}/size-${size}/sort_by-${sort_by}/order_by-${order_by}/branch_id-${branch_id}/position_id-${position_id}/department_id-${department_id}/role_id-${role_id}/is_active-${is_active}/employee_no-${employee_no}/employee_name-${employee_name}`,
        ],
        queryFn: () => getUsersApi(queryString)
    })

    // prefetch query
    // prev page prefetch
    if (page > 1) {
        const prevQueryString = queryStringGenerator({
            page: page - 1,
            size,
        })
        queryClient.prefetchQuery({
            queryKey: [`${queryKey}/page-${page - 1}/size-${size}`],
            queryFn: () => getUsersApi(prevQueryString),
        })
    }

    // next page prefetch
    const nextQueryString = queryStringGenerator({
        page: page + 1,
        size,
    })
    queryClient.prefetchQuery({
        queryKey: [`${queryKey}/page-${page + 1}/size-${size}`],
        queryFn: () => getUsersApi(nextQueryString),
    })

    return { isLoading, data, isError }
}

export const useDeleteUsers = () => {
    const queryClient = useQueryClient()

    const [sort_by] = useQueryState('sort_by')

    const [order_by] = useQueryState('order_by')
    const [branch_id] = useQueryState(
        'branch_id'
    )
    const [position_id] = useQueryState(
        'position_id'

    )
    const [department_id] = useQueryState(
        'department_id'
    )
    const [role_id] = useQueryState('role_id')
    const [is_active] = useQueryState(
        'is_active'
    )

    const [employee_no] = useQueryState('employee_no')
    const [employee_name] = useQueryState('employee_name')
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )

    const {
        isPending,
        mutate: deleteById,
        isError,
    } = useMutation({
        mutationFn: deleteUserApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    `${queryKey}/page-${page}/size-${size}/sort_by-${sort_by}/order_by-${order_by}/branch_id-${branch_id}/position_id-${position_id}/department_id-${department_id}/role_id-${role_id}/is_active-${is_active}/employee_no-${employee_no}/employee_name-${employee_name}`,
                ],
            })
        },
    })

    return {
        isPending,
        deleteById,
        isError,
    }
}

export const userUserCreate = () => {
    const queryClient = useQueryClient()
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const {
        isPending,
        mutate: create,
        isSuccess,
    } = useMutation({
        mutationFn: createUserApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [`${queryKey}/page-${page}/size-${size}`],
            })
        },
    })

    return { create, isPending, isSuccess }
}

export const userUserEdit = () => {
    const queryClient = useQueryClient()
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const {
        isPending,
        mutate: edit,
        isSuccess,
    } = useMutation({
        mutationFn: editUserApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [`${queryKey}/page-${page}/size-${size}`],
            })
        },
    })

    return { edit, isPending, isSuccess }
}

export const useGetUsers = ({
    transformer = (user: any) => user,
}: {
    transformer?: (user: any) => Record<any, any> | undefined
}) => {
    const response = useQuery({
        queryFn: getAllVUsersApi,
        queryKey: ['getAllVUsersApi'],
        select: (data) => {
            return data?.data?.map(transformer)
        },
    })

    return response
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const {
        isPending,
        mutate: deleteById,
        isError,
    } = useMutation({
        mutationFn: deleteUserApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [`${queryKey}/page-${page}/size-${size}`],
            })
        },
    })

    return {
        isPending,
        deleteById,
        isError,
    }
}

export const useGetUserOptions = ({ hasEmpty = true }: OptionProps) => {
    const queryString = queryStringGenerator({ Is_Emp_Permission: true })
    const queryData = useQuery({
        queryKey: ['getUserOptions'],
        queryFn: () => getUserFilters(queryString),
        select: (data) => optionTransformer(data, hasEmpty),
    })

    return queryData
}

const optionTransformer = (data: any, hasEmpty?: any) => {

    const positionList = data.data.Position.map((branchOption: PositionProps) => {

        return {
            id: branchOption.Position_ID,
            value: branchOption.Position_ID,
            label: branchOption.Position_Name,
        }
    }) || []


    const branchList = (data.data.Branch || []).map((branchOption: BranchProps) => {
        return {
            id: branchOption.Branch_ID,
            value: branchOption.Branch_ID,
            label: branchOption.Branch_Name,
        }
    }) || []

    const departmentList = (data.data.Department || []).map((branchOption: DepartmentProps) => {

        return {
            id: branchOption.Department_ID,
            value: branchOption.Department_ID,
            label: branchOption.Department_Name,
        }
    }) || []



    const roleList = data.data.Role.map((branchOption: RoleProps) => {

        return {
            id: branchOption.Role_ID,
            value: branchOption.Role_ID,
            label: branchOption.Role_Name,
        }
    }) || []

    return {
        Branch: branchList,
        Department: departmentList,
        Position: positionList,
        Role: roleList
    }
}
