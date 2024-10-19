import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
import { queryStringGenerator } from '@/lib/utils'
import {
    createCodeGenerators,
    deleteCodeGenerators,
    getAllCodeGenerators,
    updateCodeGenerators,
} from '@/service/apis/setting/code-generator'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

//constants
const queryKey = 'code-generators'
const getAllFun = getAllCodeGenerators
const deleteFun = deleteCodeGenerators
const createFun = createCodeGenerators
const updateFun = updateCodeGenerators

export const useGetAllCodeGenerators = (queryActive?:any)=>{
    const [page] = useQueryState<number>('page',parseAsInteger.withDefault(DEFAULT_PAGE));
    const [size] = useQueryState<number>('size',parseAsInteger.withDefault(DEFAULT_SIZE));
    const [name] = useQueryState('name',parseAsString.withDefault(''));
    const [active] = useQueryState('is_active',parseAsString.withDefault(''));
  
    const [generateNewCode] = useQueryState('generate_new_code',parseAsString.withDefault(''));
    const [serialNo] = useQueryState('serial_no',parseAsInteger);
    const [format] = useQueryState('format',parseAsString);
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [type] = useQueryState('type');
    const [empStatus] = useQueryState('emp_status');

    const queryClient = useQueryClient()

    const queryString = queryStringGenerator({
        page,
        size,
        name,
        generate_new_code: generateNewCode,
        sort_by:sortBy,
        order_by:orderBy,
        serial_no:serialNo,
        format:format,
        type:type,
        emp_status:empStatus

    })

    const {isLoading,data,isError} = useQuery({
        queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/sortBy-${sortBy}/serialNo-${serialNo}/format-${format}/orderBy-${orderBy}/generate-new-code-${generateNewCode}/type-${type}/emp-status-${empStatus}`],
        queryFn:()=>getAllFun(queryString)
    });
    


    return { isLoading, data, isError }
}


export const useCreateCodeGeneraors = () => {
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [active] = useQueryState(
        'generate_new_code',
        parseAsString.withDefault(''),
    )
    const [generateNewCode] = useQueryState('generate_new_code',parseAsString.withDefault(''));
    const [serialNo] = useQueryState('serial_no',parseAsInteger);
    const [format] = useQueryState('format',parseAsString);
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const queryClient = useQueryClient()
    const [type] = useQueryState('type');
    const [empStatus] = useQueryState('emp_status');

    const {
        isPending,
        mutate: create,
        isSuccess,
    } = useMutation({
        mutationFn: createFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/sortBy-${sortBy}/serialNo-${serialNo}/format-${format}/orderBy-${orderBy}/generate-new-code-${generateNewCode}/type-${type}/emp-status-${empStatus}`],
            })
        },
    })

    return {isPending,create,isSuccess};
};


export const useDeleteCodeGenerator = () => {
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [generateNewCode] = useQueryState('generate_new_code',parseAsString.withDefault(''));
    const [serialNo] = useQueryState('serial_no',parseAsInteger);
    const [format] = useQueryState('format',parseAsString);
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [type] = useQueryState('type');
    const [empStatus] = useQueryState('emp_status');

    const queryClient = useQueryClient()

    const {
        isPending,
        mutate: deletebyId,
        isError,
    } = useMutation({
        mutationFn: deleteFun,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/sortBy-${sortBy}/serialNo-${serialNo}/format-${format}/orderBy-${orderBy}/generate-new-code-${generateNewCode}/type-${type}/emp-status-${empStatus}`],
            })
        },
    })

    return { isPending, deletebyId, isError }
}

    
export const useUpdateCodeGenerator = () => {
    const [page] = useQueryState(
        'page',
        parseAsInteger.withDefault(DEFAULT_PAGE),
    )
    const [size] = useQueryState(
        'size',
        parseAsInteger.withDefault(DEFAULT_SIZE),
    )
    const [name] = useQueryState('name', parseAsString.withDefault(''))
    const [active] = useQueryState(
        'generate_new_code',
        parseAsString.withDefault(''),
    )
    const [generateNewCode] = useQueryState('generate_new_code',parseAsString.withDefault(''));
    const [serialNo] = useQueryState('serial_no',parseAsInteger);
    const [format] = useQueryState('format',parseAsString);
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const [type] = useQueryState('type');
    const [empStatus] = useQueryState('emp_status');

    const queryClient = useQueryClient()

    const {isPending,mutate:update,isError} = useMutation({
        mutationFn:updateFun,
        onSuccess:(data)=>{
          queryClient.invalidateQueries({
            queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/sortBy-${sortBy}/serialNo-${serialNo}/format-${format}/orderBy-${orderBy}/generate-new-code-${generateNewCode}/type-${type}/emp-status-${empStatus}`],
          })
        }
    });

    return { isPending, update, isError }
}
