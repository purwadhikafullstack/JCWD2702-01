import { useUpdateListingMutation } from '../api/useUpdateListingMutation';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateListing = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: mutationUpdateListing } = useUpdateListingMutation({
    onSuccess: (res: any) => {
      toast({
<<<<<<< HEAD
=======
        variant: 'success',
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
        description: `${res.data.message}`,
      });
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
    },
    onError: (err: any) => {
      console.log(err);
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: `${err.response.data.message}`,
      });
    },
  });
  return {
    mutationUpdateListing,
  };
};
