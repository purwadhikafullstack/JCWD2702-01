import { useDeleteListingMutation } from '../api/useDeleteListingMutation';
import { useToast } from '@/components/ui/use-toast';

export const useDeletelisting = () => {
  const { toast } = useToast();

  const { mutate: mutationDeleteListing } = useDeleteListingMutation({
    onSuccess: (res: any) => {
      console.log(res);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return {
    mutationDeleteListing,
  };
};
