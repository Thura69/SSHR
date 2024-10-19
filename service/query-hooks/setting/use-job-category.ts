// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import {
//     createJobCategory,
//     deleteJobCategory,
//     getAllJobCategories,
//     updateJobCategory,
// } from '@/service/apis/setting/job-category-api'
// import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
// import { queryStringGenerator } from '@/lib/utils'
// import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
// import usePrevious from '@/hooks/use-previous'

// // constants
// const queryKey = 'JobCategory'
// const getAllFun = getAllJobCategories
// const createFun = createJobCategory
// const updateFun = updateJobCategory
// const deleteFun = deleteJobCategory

// export const useCreateJobCategory = () => {
//     const queryClient = useQueryClient()
//     const [page] = useQueryState(
//         'page',
//         parseAsInteger.withDefault(DEFAULT_PAGE),
//     )
//     const [size] = useQueryState(
//         'size',
//         parseAsInteger.withDefault(DEFAULT_SIZE),
//     )
//     const [name] = useQueryState('name', parseAsString.withDefault(''))
//     const [active] = useQueryState('is_active', parseAsString.withDefault(''))
//     const {
//         isPending,
//         mutate: create,
//         isSuccess,
//     } = useMutation({
//         mutationFn: createFun,
//         onSuccess: (data) => {
//             queryClient.invalidateQueries({
//                 queryKey: [
//                     `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}`,
//                 ],
//             })
//         },
//     })

//     return { create, isPending, isSuccess }
// }

// export const useGetAllJobCategory = () => {
//     const [page] = useQueryState<number>(
//         'page',
//         parseAsInteger.withDefault(DEFAULT_PAGE),
//     )
//     const [size] = useQueryState(
//         'size',
//         parseAsInteger.withDefault(DEFAULT_SIZE),
//     )
//     const [name] = useQueryState('name', parseAsString.withDefault(''))

//     const [active] = useQueryState(
//         'is_active',
//         parseAsString.withDefault(''),
//     )
//     const queryClient = useQueryClient()
//     const prevName = usePrevious(name)
//     const prevActive = usePrevious(active)
//     const isSameName = prevName === name
//     const isSameStatus = prevActive === active

//     const queryString = queryStringGenerator({
//         page: isSameName && isSameStatus ? page : DEFAULT_PAGE,
//         size: isSameName && isSameStatus ? size : DEFAULT_SIZE,
//         name,
//         is_active: active,
//     })

//     // fetch get ALl query
//     const { isLoading, data, isError } = useQuery({
//         queryKey: [
//             `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}`,
//         ],
//         queryFn: () => getAllFun(queryString),
//     })

//     // prefetch query
//     // prev page prefetch
//     if (page > 1) {
//         const prevQueryString = queryStringGenerator({ page: page - 1, size })
//         queryClient.prefetchQuery({
//             queryKey: [
//                 `${queryKey}/page-${
//                     page - 1
//                 }/size-${size}/name-${name}/active-${active}`,
//             ],
//             queryFn: () => getAllFun(prevQueryString),
//         })
//     }

//     // next page prefetch
//     const nextQueryString = queryStringGenerator({ page: page + 1, size })
//     queryClient.prefetchQuery({
//         queryKey: [
//             `${queryKey}/page-${page + 1}/size-${size}/name-${name}/active-${active}`,
//         ],
//         queryFn: () => getAllFun(nextQueryString),
//     })

//     return { isLoading, data, isError }
// }

// // Update Employment Status

// export const useUpdateJobCategory = () => {
//     const queryClient = useQueryClient()
//     const [page] = useQueryState(
//         'page',
//         parseAsInteger.withDefault(DEFAULT_PAGE),
//     )
//     const [size] = useQueryState(
//         'size',
//         parseAsInteger.withDefault(DEFAULT_SIZE),
//     )
//     const [name] = useQueryState('name', parseAsString.withDefault(''))
//     const [active] = useQueryState('is_active', parseAsString.withDefault(''))
//     const {
//         isPending,
//         mutate: update,
//         isError,
//     } = useMutation({
//         mutationFn: updateFun,
//         onSuccess: (data) => {
//             queryClient.invalidateQueries({
//                 queryKey: [
//                     `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}`,
//                 ],
//             })
//         },
//     })

//     return {
//         isPending,
//         update,
//         isError,
//     }
// }

// export const useDeleteJobCategory = () => {
//     const queryClient = useQueryClient()
//     const [page] = useQueryState(
//         'page',
//         parseAsInteger.withDefault(DEFAULT_PAGE),
//     )
//     const [size] = useQueryState(
//         'size',
//         parseAsInteger.withDefault(DEFAULT_SIZE),
//     )
//     const [name] = useQueryState('name', parseAsString.withDefault(''))
//     const [active] = useQueryState('is_active', parseAsString.withDefault(''))
//     const {
//         isPending,
//         mutate: deleteById,
//         isError,
//     } = useMutation({
//         mutationFn: deleteFun,
//         onSuccess: (data) => {
//             queryClient.invalidateQueries({
//                 queryKey: [
//                     `${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}`,
//                 ],
//             })
//         },
//     })

//     return {
//         isPending,
//         deleteById,
//         isError,
//     }
// }
