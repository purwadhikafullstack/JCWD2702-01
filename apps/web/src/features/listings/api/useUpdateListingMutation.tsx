import { axiosInstance } from '@/utils/AxiosInstance';
import { useMutation } from '@tanstack/react-query';

export const useUpdateListingMutation = ({ onSuccess, onError }: any) => {
  const { mutate } = useMutation({
    mutationFn: async (fd: any) => {
      return await axiosInstance.put('/property/listing', fd);
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};
