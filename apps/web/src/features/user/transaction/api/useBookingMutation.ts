import { axiosInstance } from '@/utils/AxiosInstance';
import { useMutation } from '@tanstack/react-query';

export const useNewBookingMutation = ({ onSuccess, onError }: any) => {
  const { mutate } = useMutation({
    mutationFn: async ({
      room_typesId,
      data,
    }: {
      room_typesId: string | number;
      data: any;
    }) => {
      return await axiosInstance.post(`/booking/user/${room_typesId}`, {
        total_price: data.total_price,
        start_date: data.start_date,
        end_date: data.end_date,
        num_of_guests: data.num_of_guests,
        payment_typesId: data.payment,
      });
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};

export const useUploadPaymentProofMutation = ({ onSuccess, onError }: any) => {
  const { mutate } = useMutation({
    mutationFn: async ({ bookingId, fd }: { bookingId: string; fd: any }) => {
      return await axiosInstance.put(
        `/booking/user/confirmation?bookingId=${bookingId}&type=manual`,
        fd,
      );
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};

export const useCancelBookingMutation = ({ onSuccess, onError }: any) => {
  const { mutate } = useMutation({
    mutationFn: async (bookingId: string) => {
      return await axiosInstance.put(`/booking/user/cancellation/${bookingId}`);
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};
