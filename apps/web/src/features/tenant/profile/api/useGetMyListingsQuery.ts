import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

export const useGetMyListingsQuery = () => {
    const { data, isSuccess, isError } = useQuery({
        queryKey: ['my-listings'],
        queryFn: async () => {
            return await axiosInstance.get('/tenant/my-listings')
        }
    })

    return {
        data,
        isSuccess,
        isError,
    };
}