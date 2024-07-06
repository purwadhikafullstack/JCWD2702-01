import { useConfirmBookingMutation } from '../api/useBookingMutation';
import { useDispatch } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export const useConfirmBooking = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate: mutationConfirmBooking } = useConfirmBookingMutation({
    onSuccess: (res: any) => {
      console.log(res);
      toast({ variant: 'success', description: 'Booking confirmation sent.' });
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
