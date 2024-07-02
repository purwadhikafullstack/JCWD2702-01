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

export const useGetBookingByUserQuery = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['allBookingData'],
    queryFn: async () => {
      return await axiosInstance.get(`/booking/user/`);
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
