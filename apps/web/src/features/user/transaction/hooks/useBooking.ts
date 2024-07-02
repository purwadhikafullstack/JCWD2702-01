import {
  useAutoPaymentMutation,
  useCancelBookingMutation,
  useNewBookingMutation,
  useUploadPaymentProofMutation,
} from '../api/useBookingMutation';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export const useNewBooking = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate: mutationNewBooking, isPending } = useNewBookingMutation({
    onSuccess: (res: any) => {
      if (res?.data?.data?.bill?.payment_typesId == 2) {
        window.location.assign(`${res.data.data.redirectUrl}`);
      } else {
        router.push(
          `/booking/payment?order_id=${res?.data?.data?.bill?.id}&payment_type=${res?.data?.data?.bill?.payment_typesId}`,
        );
      }
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
    isPending,
  };
};

export const useUploadPaymentProof = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: mutationPaymentProof } = useUploadPaymentProofMutation({
    onSuccess: (res: any) => {
      toast({ description: 'Payment proof sent.' });
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

export const useAutoPayment = () => {
  const { mutate: mutationAutoPayment } = useAutoPaymentMutation({
    onSuccess: (res: any) => {
      window.location.assign(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/booking/payment?order_id=${res?.data?.data?.bill?.id}&payment_type=${res?.data?.data?.bill?.payment_typesId}`,
      );
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return {
    mutationAutoPayment,
  };
};
