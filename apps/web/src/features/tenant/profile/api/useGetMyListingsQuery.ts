import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

<<<<<<< HEAD
export const useGetMyListingsQuery = (params: string | undefined) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['my-listings', params],
    queryFn: async () => {
      return await axiosInstance.get(
        '/tenant/my-listings' + (params ? `?${params}` : '/'),
      );
    },
  });
=======

export const useGetMyListingsQuery = (page: number) => {
    const { data, isSuccess, isError } = useQuery({
        queryKey: ['my-listings', page],
        queryFn: async () => {
            return await axiosInstance.get(`/tenant/my-listings?page=${page}`)
        }
    })
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853

  return {
    data,
    isSuccess,
    isError,
  };
};
