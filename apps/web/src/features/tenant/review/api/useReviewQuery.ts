import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

export const useGetGuestReviewsQuery = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['guestReviews'],
    queryFn: async () => {
      return await axiosInstance.get(`/review/tenant/`);
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
