import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    deleteHierarchicalReport,
    getCCByIdApi,
    getHierarchicalApi,
    getHierarchicalByIdApi,
    getJobGradeApi,
    getPositionListApi,
    getRequestTypeApi,
    postHierarchicalReport,
    updateHierarchicalReport,
} from '@/service/apis/hierarchical-reporting'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { queryStringGenerator } from '@/lib/utils'
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
import useToast from '@/hooks/use-toast'

interface JobGradeProps {
    Job_Grade_ID: string | number
    Job_Grade_Name: string | number
}

interface RequestTypeProps {
    Request_Type: string
}

const jobGradeTransformer = (data: any) => {
    const branchList = data.data.map((jobGradeOptions: JobGradeProps) => ({
        id: jobGradeOptions.Job_Grade_ID,
        value: jobGradeOptions.Job_Grade_ID,
        label: jobGradeOptions.Job_Grade_Name,
    }))

    return [...branchList]
}

const requestTypeTransformer = (data: any) => {
    const branchList = data.data.map((jobGradeOptions: RequestTypeProps) => ({
        id: jobGradeOptions.Request_Type,
        value: jobGradeOptions.Request_Type,
        label: jobGradeOptions.Request_Type,
    }))

    return [...branchList]
}

export const useGetHierarchicalReports = () => {
    const queryClient = useQueryClient()
    const [pageSize] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [currentPage] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )

    const [order_by] = useQueryState('order_by', parseAsString.withDefault(''))

    const [sort_by] = useQueryState('sort_by', parseAsString.withDefault(''))

    const [fromCompanyFilter] = useQueryState('r_f_company')

    const [fromLocationFilter] = useQueryState('r_f_location')

    const [fromBranchFilter] = useQueryState('r_f_branch')

    const [fromDepartmentFilter] = useQueryState('r_f_department')
    const [fromSectionFilter] = useQueryState('r_f_section')

    const [fromPositionFilter] = useQueryState('r_f_position')

    const [toCompanyFilter] = useQueryState('r_t_company')
    const [toLocationFilter] = useQueryState('r_t_location')

    const [toBranchFilter] = useQueryState('r_f_branch')

    const [toDepartmentFilter] = useQueryState('r_t_department')
    const [toSectionFilter] = useQueryState('r_t_section')

    const [toPositionFilter] = useQueryState('r_t_position')

    const [requestTypeFilter] = useQueryState('request_type')

    const commonQuery = {
        size: pageSize,
        r_f_company: fromCompanyFilter,
        r_f_location: fromLocationFilter,
        r_f_department: fromDepartmentFilter,
        r_f_section: fromSectionFilter,
        r_f_position: fromPositionFilter,
        r_f_branch: fromBranchFilter,
        r_t_company: toCompanyFilter,
        r_t_location: toLocationFilter,
        r_t_department: toDepartmentFilter,
        r_t_section: toSectionFilter,
        r_t_position: toPositionFilter,
        r_t_branch: toBranchFilter,
        order_by,
        sort_by,
        r_type: requestTypeFilter,
    }

    const queryString = queryStringGenerator({
        page: currentPage,
        ...commonQuery,
    })
    const { data, isError, isLoading, ...rest } = useQuery({
        queryFn: () => getHierarchicalApi(queryString),
        queryKey: [`getHierarchicalApi?${queryString}`, 'all'],
    })

    // prefetch query
    // prev page prefetch
    if (currentPage > 1) {
        const prevQueryString = queryStringGenerator({
            page: currentPage - 1,
            ...commonQuery,
        })
        queryClient.prefetchQuery({
            queryKey: [`getHierarchicalApi?${prevQueryString}`],
            queryFn: () => getHierarchicalApi(prevQueryString),
        })
    }
    const nextQueryString = queryStringGenerator({
        page: +currentPage + 1,
        ...commonQuery,
    })
    queryClient.prefetchQuery({
        queryKey: [`getHierarchicalApi?${nextQueryString}`],
        queryFn: () => getHierarchicalApi(nextQueryString),
    })

    return { data, isError, isLoading, ...rest }
}

export const useGetHierarchicalReportById = (
    id: string | undefined | null,
    type: 'INDIVIDUAL' | 'GROUP',
) => {
    const response = useQuery({
        queryKey: ['getHierarchicalByIdApi', id],
        queryFn: () => id && getHierarchicalByIdApi(id, type),
        enabled: false,
        gcTime: 0,
        staleTime: 0,
    })

    return response
}

export const useGetCCById = (id: string, type: 'INDIVIDUAL' | 'GROUP') => {
    const response = useQuery({
        queryKey: ['getCCByIdApi', id],
        queryFn: () => id && getCCByIdApi(id, type),
        enabled: false,
        gcTime: 0,
        staleTime: 0,
    })

    return response
}

export const useGetRequestType = () => {
    const { data, isError, isLoading, ...rest } = useQuery({
        queryFn: getRequestTypeApi,
        queryKey: [`getRequestTypeApi`],
        select: requestTypeTransformer,
    })

    return { data, isError, isLoading, ...rest }
}

export const useGetHierarchicalPositions = ({
    company_id,
    branch_id,
    location_id,
    customQuery,
}: {
    company_id: number | string | undefined | null
    branch_id: number | string | undefined | null
    location_id: number | string | undefined | null
    customQuery?: string
}) => {
    const queryString = queryStringGenerator({
        company_id,
        branch_id,
        location_id,
    })
    const { data, isError, isLoading, ...rest } = useQuery({
        queryFn: () => getPositionListApi(queryString),
        queryKey: [`getPositionListApi`, customQuery, queryString],
    })

    return { data, isError, isLoading, ...rest }
}

export const useGetJobGrade = () => {
    const { data, isError, isLoading, ...rest } = useQuery({
        queryFn: getJobGradeApi,
        queryKey: [`getJobGradeApi`],
        select: jobGradeTransformer,
    })
    return { data, isError, isLoading, ...rest }
}

export const useMutateHierarchicalReport = () => {
    const { showNotification } = useToast()
    const response = useMutation({
        mutationFn: (payload: any) => postHierarchicalReport(payload),
        onSuccess: () => {
            showNotification({ message: 'Saved successfully', type: 'success' })
        },
        onError: (data) => {
            showNotification({ message: data.message, type: 'danger' })
        },
    })

    return { ...response }
}

export const useDeleteReport = () => {
    const [pageSize] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [currentPage] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )

    const [fromCompanyFilter] = useQueryState('r_f_company')

    const [fromLocationFilter] = useQueryState('r_f_location')

    const [fromBranchFilter] = useQueryState('r_f_branch')

    const [fromDepartmentFilter] =
        useQueryState('r_f_department')
    const [fromSectionFilter] =
        useQueryState('r_f_section')

    const [fromPositionFilter] =
        useQueryState('r_f_position')

    const [toCompanyFilter] = useQueryState('r_t_company')
    const [toLocationFilter] =
        useQueryState('r_t_location')

    const [toBranchFilter] = useQueryState('r_f_branch')

    const [toDepartmentFilter] =
        useQueryState('r_t_department')
    const [toSectionFilter] = useQueryState('r_t_section')

    const [toPositionFilter] =
        useQueryState('r_t_position')

    const [order_by] = useQueryState('order_by', parseAsString.withDefault(''))

    const [sort_by] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [requestTypeFilter] = useQueryState('request_type')

    const commonQuery = {
        size: pageSize,
        r_f_company: fromCompanyFilter,
        r_f_location: fromLocationFilter,
        r_f_department: fromDepartmentFilter,
        r_f_section: fromSectionFilter,
        r_f_position: fromPositionFilter,
        r_f_branch: fromBranchFilter,
        r_t_company: toCompanyFilter,
        r_t_location: toLocationFilter,
        r_t_department: toDepartmentFilter,
        r_t_section: toSectionFilter,
        r_t_position: toPositionFilter,
        r_t_branch: toBranchFilter,
        order_by,
        sort_by,
        r_type: requestTypeFilter,
    }

    const queryString = queryStringGenerator({
        page: currentPage,
        ...commonQuery,
    })

    const { showNotification } = useToast()
    const queryClient = useQueryClient()
    const response = useMutation({
        mutationFn: (payload: {
            id: string
            type: 'INDIVIDUAL' | 'GROUP'
            request_group_id: string
        }) =>
            deleteHierarchicalReport(
                payload.id,
                payload.type,
                payload.request_group_id,
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`getHierarchicalApi?${queryString}`, 'all'],
            })
            showNotification({
                message: 'Deleted successfully',
                type: 'success',
            })
        },
        onError: (data) => {
            showNotification({ message: data.message, type: 'danger' })
        },
    })

    return { ...response }
}

export const useUpdateReport = () => {
    const [pageSize] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [currentPage] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )

    const [fromCompanyFilter] = useQueryState('r_f_company')

    const [fromLocationFilter] = useQueryState('r_f_location')

    const [fromBranchFilter] = useQueryState('r_f_branch')

    const [fromDepartmentFilter] = useQueryState('r_f_department')
    const [fromSectionFilter] = useQueryState('r_f_section')

    const [fromPositionFilter] = useQueryState('r_f_position')

    const [toCompanyFilter] = useQueryState('r_t_company')
    const [toLocationFilter] = useQueryState('r_t_location')

    const [toBranchFilter] = useQueryState('r_f_branch')

    const [toDepartmentFilter] = useQueryState('r_t_department')
    const [toSectionFilter] = useQueryState('r_t_section')

    const [toPositionFilter] = useQueryState('r_t_position')

    const commonQuery = {
        size: pageSize,
        r_f_company: fromCompanyFilter,
        r_f_location: fromLocationFilter,
        r_f_department: fromDepartmentFilter,
        r_f_section: fromSectionFilter,
        r_f_position: fromPositionFilter,
        r_f_branch: fromBranchFilter,
        r_t_company: toCompanyFilter,
        r_t_location: toLocationFilter,
        r_t_department: toDepartmentFilter,
        r_t_section: toSectionFilter,
        r_t_position: toPositionFilter,
        r_t_branch: toBranchFilter,
    }

    const queryString = queryStringGenerator({
        page: currentPage,
        ...commonQuery,
    })

    const { showNotification } = useToast()
    const queryClient = useQueryClient()
    const response = useMutation({
        mutationFn: (payload: { id: string; data: any }) =>
            updateHierarchicalReport(payload.id, payload.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    `updateHierarchicalReport?${queryString}`,
                    queryString,
                ],
            })
            showNotification({
                message: 'Updated successfully.',
                type: 'success',
            })
        },
        onError: (data) => {
            showNotification({ message: data.message, type: 'danger' })
        },
    })

    return { ...response }
}
