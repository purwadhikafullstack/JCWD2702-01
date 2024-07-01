import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

export const useGetMyListingsQuery = (params: string | undefined) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['my-listings', params],
    queryFn: async () => {
      return await axiosInstance.get(
        '/tenant/my-listings' + (params ? `?${params}` : '/'),
      );
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
