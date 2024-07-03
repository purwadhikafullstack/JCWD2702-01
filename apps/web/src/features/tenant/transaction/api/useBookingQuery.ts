import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

export const useGetAllTenantBookingQuery = (page: number) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['allBookingRequest', page],
    queryFn: async () => {
      return await axiosInstance.get(
        `/booking/tenant${page ? `?page=${page}` : '/'}`,
      );
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
