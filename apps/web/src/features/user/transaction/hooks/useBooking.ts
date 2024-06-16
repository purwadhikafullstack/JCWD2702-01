import {
  useCancelBookingMutation,
  useNewBookingMutation,
  useUploadPaymentProofMutation,
} from '../api/useBookingMutation';
import { useDispatch } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export const useNewBooking = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate: mutationNewBooking } = useNewBookingMutation({
    onSuccess: (res: any) => {
      toast({ description: 'OK!' });
      console.log(res.data);
      router.push(`/booking/payment?bookingId=${res?.data?.data?.bill?.id}`);
    },
    onError: (err: any) => {
      toast({
        variant: 'destructive',
        description: `${err.response.data.message}`,
      });
    },
  });

  return {
    mutationNewBooking,
  };
};

export const useUploadPaymentProof = () => {
  const { toast } = useToast();

  const { mutate: mutationPaymentProof } = useUploadPaymentProofMutation({
    onSuccess: (res: any) => {
      toast({ description: 'Payment proof sent.' });
      console.log(res.data);
    },
    onError: (err: any) => {
      toast({
        variant: 'destructive',
        description: `${err.response.data.message}`,
      });
    },
  });

  return {
    mutationPaymentProof,
  };
};

export const useCancelBooking = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate: mutationCancelBooking } = useCancelBookingMutation({
    onSuccess: (res: any) => {
      toast({ description: 'Booking cancelled.' });
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
    mutationCancelBooking,
  };
};
