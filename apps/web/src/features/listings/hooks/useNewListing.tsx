import { useNewListingMutation } from '../api/useNewListingMutation';
import { useToast } from '@/components/ui/use-toast';

export const useNewlisting = () => {
  const { toast } = useToast();

  const { mutate: mutationNewListing } = useNewListingMutation({
    onSuccess: (res: any) => {
      console.log(res);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return {
    mutationNewListing,
  };
};
