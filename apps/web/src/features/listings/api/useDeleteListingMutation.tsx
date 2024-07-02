import { axiosInstance } from '@/utils/AxiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteListingMutation = ({ onSuccess, onError }: any) => {
  const { mutate } = useMutation({
    mutationFn: async (listingId: any) => {
      await axiosInstance.delete(`/tenant/listing/${listingId}`);
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};
