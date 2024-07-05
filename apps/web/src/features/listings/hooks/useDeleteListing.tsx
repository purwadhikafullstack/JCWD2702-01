import { useDeleteListingMutation } from '../api/useDeleteListingMutation';
import { useToast } from '@/components/ui/use-toast';
<<<<<<< HEAD

export const useDeletelisting = () => {
  const { toast } = useToast();

  const { mutate: mutationDeleteListing } = useDeleteListingMutation({
    onSuccess: (res: any) => {
      console.log(res);
=======
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
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return {
    mutationDeleteListing,
  };
};
