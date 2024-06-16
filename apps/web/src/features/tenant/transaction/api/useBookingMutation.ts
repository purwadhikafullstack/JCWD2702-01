import { axiosInstance } from '@/utils/AxiosInstance';
import { useMutation } from '@tanstack/react-query';

export const useConfirmBookingMutation = ({ onSuccess, onError }: any) => {
  const { mutate } = useMutation({
    mutationFn: async ({
      status,
      bookingId,
    }: {
      status: number | string;
      bookingId: string;
    }) => {
      return await axiosInstance.put(
        `/booking/tenant/confirmation?status=${status}&bookingId=${bookingId}`,
      );
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};

