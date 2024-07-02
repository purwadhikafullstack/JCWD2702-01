import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

export const useGetSalesQuery = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['sales-report'],
    queryFn: async () => {
      return await axiosInstance.get('/report/');
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
