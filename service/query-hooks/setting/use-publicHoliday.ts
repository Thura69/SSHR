import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination'
import { queryStringGenerator } from '@/lib/utils'
import {
    createPublicHoliday,
    deletePublicHoliday,
    getAllPublicHoliday,
    getPublicHolidayByFinancial,
    getPublicHolidayCopy,
    createMany,
    updatePublicHoliday,
} from '@/service/apis/setting/publicholiday-api'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

const queryKey = 'public-holidays'
const getAllFun = getAllPublicHoliday
const createFun = createPublicHoliday
const deleteFun = deletePublicHoliday
const updateFun = updatePublicHoliday
const createManyFun = createMany;
const getCopy = getPublicHolidayCopy;
const getByFinan = getPublicHolidayByFinancial

export const useGetAllPublicHoliday = ()=>{
    const [page] = useQueryState<number>('page',parseAsInteger.withDefault(DEFAULT_PAGE));
    const [size] = useQueryState<number>('size',parseAsInteger.withDefault(DEFAULT_SIZE));
    const [name] = useQueryState('name',parseAsString.withDefault(''));
    const [con] = useQueryState('con',parseAsString.withDefault(''));
    const [active] = useQueryState('is_active',parseAsString.withDefault(''));
    const [financialYear] = useQueryState('financial_year_id',parseAsInteger);
    const [date_from] = useQueryState('calendar_year_from',parseAsString.withDefault(''));
    const [date_to] = useQueryState('calendar_year_to',parseAsString.withDefault(''));
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
  

  const queryString = queryStringGenerator({
    page: page ?? DEFAULT_PAGE,
    size: size ?? DEFAULT_SIZE,
    name,
    is_active: active,
    financial_year_id:financialYear,
    date_from,
    date_to,
    sort_by:sortBy,
    order_by:orderBy,
  });



  const {isLoading,data,isError,refetch,isFetched} = useQuery({
    queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/financial_year_id-${financialYear}/con-${con}/date_from-${date_from}/date-to-${date_to}/sortBy-${sortBy}/orderBy-${orderBy}`],
    queryFn:()=>getAllFun(queryString)
  });

  return {isLoading,data,isError,refetch,isFetched};
};

// export const useGetAllPublicHolidayByFinancialId = ()=>{ 

//   const [page] = useQueryState<number>('page',parseAsInteger.withDefault(DEFAULT_PAGE));
//   const [size] = useQueryState<number>('size',parseAsInteger.withDefault(DEFAULT_SIZE));
//   const [name] = useQueryState('name',parseAsString.withDefault(''));
//   const [active] = useQueryState('is_active',parseAsString.withDefault(''));
//   const [financialYear] = useQueryState('financial_year_id',parseAsString.withDefault(''));

//  const querClient = useQueryClient();

//   const {isPending,isError,mutate:getByFinan} = useMutation({
//     mutationFn:getPublicHolidayByFinancial,
//     onSuccess:(data)=>{
//       querClient:[`${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/financial_year_id-${financialYear}`]
//     }
//   });

//   return {isPending,isError,getByFinan};

// };

export const useGetCopyPublicHolidays = ()=>{
  const [page] = useQueryState<number>('page',parseAsInteger.withDefault(DEFAULT_PAGE));
  const [size] = useQueryState<number>('size',parseAsInteger.withDefault(DEFAULT_SIZE));
  const [active] = useQueryState('is_active',parseAsString.withDefault(''));
  const [financialYear] = useQueryState('financial_year_id',parseAsString.withDefault(''));
  const [currentId] = useQueryState('currentId',parseAsString.withDefault(''));
  const [targetId] = useQueryState('targetId',parseAsString.withDefault(''));
  const [date_from] = useQueryState('calendar_year_from',parseAsString.withDefault(''));
  const [date_to] = useQueryState('calendar_year_to',parseAsString.withDefault(''));
  const [con] = useQueryState('con',parseAsString.withDefault(''));
  const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
  const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
    const queryClient = useQueryClient();

    const {isPending,mutate:copiedById,isError} = useMutation({
      mutationFn:getCopy,
      onSuccess:(data)=>{
        queryClient.invalidateQueries({
          queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/financial_year_id-${financialYear}/con-${con}/date_from-${date_from}/date-to-${date_to}/sortBy-${sortBy}/orderBy-${orderBy}`],
        })
      }

    })

    return {isPending,copiedById,isError};

      // const {
      //   isLoading,
      //   data,
      //   isError
      // } = useQuery({
      //   queryKey:[`${queryKey}/page-${page}/size-${size}/active-${active}/financial_year_id-${financialYear}/current_id-${currentId}/target_id-${targetId}`],
      //   queryFn:shouldFetchData ? () => getCopy(payload) : undefined,
      // });
  
      // return {isLoading,data,isError}
};
export const useGetCopyPublicHolidaysByFinancial = ()=>{
  const [page] = useQueryState<number>('page',parseAsInteger.withDefault(DEFAULT_PAGE));
  const [size] = useQueryState<number>('size',parseAsInteger.withDefault(DEFAULT_SIZE));
  const [name] = useQueryState('name',parseAsString.withDefault(''));
  const [active] = useQueryState('is_active',parseAsString.withDefault(''));
  const [financialYear] = useQueryState('financial_year_id',parseAsString.withDefault(''));
  const [currentId] = useQueryState('currentId',parseAsString.withDefault(''));
  const [con] = useQueryState('con',parseAsString.withDefault(''));
  const [targetId] = useQueryState('targetId',parseAsString.withDefault(''));
  const [date_from] = useQueryState('calendar_year_from',parseAsString.withDefault(''));
  const [date_to] = useQueryState('calendar_year_to',parseAsString.withDefault(''));
  const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
  const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

    const queryClient = useQueryClient();

    const {isPending,mutate:getByFiancial,isError} = useMutation({
      mutationFn:getByFinan,
      onSuccess:(data)=>{
        queryClient.invalidateQueries({
          queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/financial_year_id-${financialYear}/con-${con}/date_from-${date_from}/date-to-${date_to}/sortBy-${sortBy}/orderBy-${orderBy}`],
        }),
        keepPreviousData
      },

    })

    return {isPending,getByFiancial,isError};

      // const {
      //   isLoading,
      //   data,
      //   isError
      // } = useQuery({
      //   queryKey:[`${queryKey}/page-${page}/size-${size}/active-${active}/financial_year_id-${financialYear}/current_id-${currentId}/target_id-${targetId}`],
      //   queryFn:shouldFetchData ? () => getCopy(payload) : undefined,
      // });
  
      // return {isLoading,data,isError}
};


export const useCreatePublicHoliday = ()=>{
  const [page] = useQueryState<number>('page',parseAsInteger.withDefault(DEFAULT_PAGE));
  const [size] = useQueryState<number>('size',parseAsInteger.withDefault(DEFAULT_SIZE));
  const [name] = useQueryState('name',parseAsString.withDefault(''));
  const [date_from] = useQueryState('calendar_year_from',parseAsString.withDefault(''));
  const [date_to] = useQueryState('calendar_year_to',parseAsString.withDefault(''));
  const [con] = useQueryState('con',parseAsString.withDefault(''));
  const [active] = useQueryState('is_active',parseAsString.withDefault(''));
  const [financialYear] = useQueryState('financial_year_id',parseAsString.withDefault(''));
  const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))
  
  const querClient = useQueryClient();

  const {
    isPending,
    mutate:create,
    isSuccess
  } = useMutation({
      mutationFn:createFun,
      onSuccess:(data)=>{
      querClient.invalidateQueries({
        queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/financial_year_id-${financialYear}/con-${con}/date_from-${date_from}/date-to-${date_to}/sortBy-${sortBy}/orderBy-${orderBy}`],
      })
      }
  });

  return {isPending,create,isSuccess}
}

export const useDeletePublicHoliday = ()=>{
    const [page] = useQueryState<number>('page',parseAsInteger.withDefault(DEFAULT_PAGE));
    const [size] = useQueryState<number>('size',parseAsInteger.withDefault(DEFAULT_SIZE));
    const [name] = useQueryState('name',parseAsString.withDefault(''));
    const [active] = useQueryState('is_active',parseAsString.withDefault(''));
    const [financialYear] = useQueryState('financial_year_id',parseAsString.withDefault(''));
    const [con] = useQueryState('con',parseAsString.withDefault(''));
    const [date_from] = useQueryState('calendar_year_from',parseAsString.withDefault(''));
    const [date_to] = useQueryState('calendar_year_to',parseAsString.withDefault(''));
    const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

   const queryClient = useQueryClient();

   const {isPending,mutate:deleteById,isError} = useMutation({
    mutationFn:deleteFun,
    onSuccess:(data)=>{
    queryClient.invalidateQueries({
      queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/financial_year_id-${financialYear}/con-${con}/date_from-${date_from}/date-to-${date_to}/sortBy-${sortBy}/orderBy-${orderBy}`],
    })
    }
   });

   return {isPending,deleteById,isError};
}

export const useUpdatePublicHoliday = ()=>{
  const [page] = useQueryState<number>('page',parseAsInteger.withDefault(DEFAULT_PAGE));
  const [size] = useQueryState<number>('size',parseAsInteger.withDefault(DEFAULT_SIZE));
  const [name] = useQueryState('name',parseAsString.withDefault(''));
  const [active] = useQueryState('is_active',parseAsString.withDefault(''));
  const [financialYear] = useQueryState('financial_year_id',parseAsString.withDefault(''));
  const [date_from] = useQueryState('calendar_year_from',parseAsString.withDefault(''));
  const [date_to] = useQueryState('calendar_year_to',parseAsString.withDefault(''));
  const [con] = useQueryState('con',parseAsString.withDefault(''));
  const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
    const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''))

  const queryClient = useQueryClient();

   const {isPending,mutate:update,isError} = useMutation({
    mutationFn:updateFun,
    onSuccess:(data)=>{
      queryClient.invalidateQueries({
        queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/financial_year_id-${financialYear}/con-${con}/date_from-${date_from}/date-to-${date_to}/sortBy-${sortBy}/orderBy-${orderBy}`],
      })
    }
   });

   return {isPending,update,isError}


}

export const useCreateManyPublicHoliday = ()=>{
  const [page] = useQueryState<number>('page',parseAsInteger.withDefault(DEFAULT_PAGE));
  const [size] = useQueryState<number>('size',parseAsInteger.withDefault(DEFAULT_SIZE));
  const [name] = useQueryState('name',parseAsString.withDefault(''));
  const [active] = useQueryState('is_active',parseAsString.withDefault(''));
  const [financialYear] = useQueryState('financial_year_id',parseAsString.withDefault(''));
  const [date_from] = useQueryState('calendar_year_from',parseAsString.withDefault(''));
  const [date_to] = useQueryState('calendar_year_to',parseAsString.withDefault(''));
  const [con] = useQueryState('con',parseAsString.withDefault(''));
  const [orderBy] = useQueryState('order_by', parseAsString.withDefault(''))
  const [sortBy] = useQueryState('sort_by', parseAsString.withDefault(''));

  const queryClient = useQueryClient();

   const {isPending,mutate:createMany,isError} = useMutation({
    mutationFn:createManyFun,
    onSuccess:(data)=>{
      queryClient.invalidateQueries({
        queryKey:[`${queryKey}/page-${page}/size-${size}/name-${name}/active-${active}/financial_year_id-${financialYear}/con-${con}/date_from-${date_from}/date-to-${date_to}/sortBy-${sortBy}/orderBy-${orderBy}`],
      })
    }
   });

   return {isPending,createMany,isError}
}