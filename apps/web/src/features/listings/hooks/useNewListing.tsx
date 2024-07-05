import { useNewListingMutation } from '../api/useNewListingMutation';
import { useToast } from '@/components/ui/use-toast';

export const useNewlisting = () => {
  const { toast } = useToast();

  const { mutate: mutationNewListing } = useNewListingMutation({
    onSuccess: (res: any) => {
<<<<<<< HEAD
      console.log(res);
=======
      toast({
        variant: 'success',
        title: `New listing created successfully.`,
        description: "You can now see the listing in My Listing section.",
      });
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return {
    mutationNewListing,
  };
};
