import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

export const useGetMyListingsQuery = (page: number) => {
    const { data, isSuccess, isError } = useQuery({
        queryKey: ['my-listings', page],
        queryFn: async () => {
            return await axiosInstance.get(`/tenant/my-listings?page=${page}`)
        }
    })

    return {
        data,
        isSuccess,
        isError,
    };
}