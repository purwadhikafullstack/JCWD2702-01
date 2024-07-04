import { useDeleteListingMutation } from '../api/useDeleteListingMutation';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';

export const useDeletelisting = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: mutationDeleteListing } = useDeleteListingMutation({
    onSuccess: (res: any) => {
      toast({
        variant: 'success',
        title: `Listing deleted successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return {
    mutationDeleteListing,
  };
};
