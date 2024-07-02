import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

export const usePostReviewMutation = ({ onSuccess, onError }: any) => {
  const { mutate } = useMutation({
    mutationFn: async (data: {
      bookingsId: string;
      listingsId: string;
      review: string;
      rating: string | number;
    }) => {
      return await axiosInstance.post('/review/user', data);
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};
