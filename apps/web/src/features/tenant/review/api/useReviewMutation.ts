import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

export const usePostReplyMutation = ({ onSuccess, onError }: any) => {
  const { mutate } = useMutation({
    mutationFn: async (data: { reply: string; reviewsId: string | number }) => {
      return await axiosInstance.post('/review/tenant', data);
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};
