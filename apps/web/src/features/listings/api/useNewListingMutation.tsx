import { axiosInstance } from '@/utils/AxiosInstance';
import { useMutation } from '@tanstack/react-query';

export const useNewListingMutation = ({ onSuccess, onError }: any) => {
  const { mutate } = useMutation({
    mutationFn: async (fd: any) => {
      return await axiosInstance.post('/tenant/listing', fd);
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};
