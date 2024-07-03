import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

export const useGetPastStaysQuery = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['pastStays'],
    queryFn: async () => {
      return await axiosInstance.get(`/review/user/`);
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
