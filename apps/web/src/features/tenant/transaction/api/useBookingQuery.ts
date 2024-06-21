import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

export const useGetAllTenantBookingQuery = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['allBookingRequest'],
    queryFn: async () => {
      return await axiosInstance.get(`/booking/tenant`);
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
