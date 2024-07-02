import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

export const useGetBookingByIdQuery = (bookingId: string) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['bookingData'],
    queryFn: async () => {
      return await axiosInstance.get(`/booking/user/${bookingId}`);
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};

export const useGetBookingByUserQuery = (page: number) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['allBookingData', page],
    queryFn: async () => {
      return await axiosInstance.get(
        `/booking/user${page ? `?page=${page}` : '/'}`,
      );
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
