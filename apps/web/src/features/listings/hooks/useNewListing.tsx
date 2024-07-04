import { useNewListingMutation } from '../api/useNewListingMutation';
import { useToast } from '@/components/ui/use-toast';

export const useNewlisting = () => {
  const { toast } = useToast();

  const { mutate: mutationNewListing } = useNewListingMutation({
    onSuccess: (res: any) => {
      toast({
        variant: 'success',
        title: `New listing created successfully.`,
        description: "You can now see the listing in My Listing section.",
      });
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return {
    mutationNewListing,
  };
};
