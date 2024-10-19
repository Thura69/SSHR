import { useQuery } from "@tanstack/react-query"
import { getAllDropDownApi } from "../apis/get-all-dropdown"


const getAllFun = getAllDropDownApi

export const useGetAllDropDownValues = (endpoint: string) => {
    const { isLoading, data, isError } = useQuery({
        queryKey: [`drop_down_${endpoint}`],
        queryFn: () => getAllFun(endpoint)
    });

    return { data, isLoading, isError };
}