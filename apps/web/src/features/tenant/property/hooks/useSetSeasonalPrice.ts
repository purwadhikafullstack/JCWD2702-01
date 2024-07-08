import { useSetSeasonalPriceMutation } from '../api/useSetSeasonalPriceMutation';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
export const useSetSeasonalPrice = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: mutationSetSeasonalPrice } = useSetSeasonalPriceMutation({
    onSuccess: (res: any) => {
      toast({
        variant: 'success',
        description: `${res.data.message}`,
      });
      queryClient.invalidateQueries({queryKey: ["my-listings"]})
    },
    onError: (err: any) => {
      console.log(err);
      toast({
        variant: 'destructive',
        title: 'Uh oh something went wrong!',
        description: `${err.response.data.message}`,
      });
    },
  });
  return {
    mutationSetSeasonalPrice,
  };
};
