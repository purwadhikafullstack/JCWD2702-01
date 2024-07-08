import { useConfirmBookingMutation } from '../api/useBookingMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export const useConfirmBooking = () => {
  const { toast } = useToast();
  const router = useRouter();
  const useQuery = useQueryClient();
  const { mutate: mutationConfirmBooking } = useConfirmBookingMutation({
    onSuccess: (res: any) => {
      toast({ variant: 'success', description: 'Booking confirmation sent.' });
      useQuery.invalidateQueries({ queryKey: ['allBookingRequest'] });
      router.refresh();
    },
    onError: (err: any) => {
      toast({
        variant: 'destructive',
        description: `${err.response.data.message}`,
      });
    },
  });

  return {
    mutationConfirmBooking,
  };
};
