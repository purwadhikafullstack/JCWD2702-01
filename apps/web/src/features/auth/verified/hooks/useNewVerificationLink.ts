import { useNewVerificationLinkMutation } from '../api/useNewVerificationLinkMutation';
import { useToast } from '@/components/ui/use-toast';

export const useNewVerificationLink = () => {
  const { toast } = useToast();

  const { mutate: mutationNewVerificationLink } =
    useNewVerificationLinkMutation({
      onSuccess: (res: any) => {
        toast({
          description: "We've sent you a new link, Check your email to Verify!",
        });
      },
      onError: (err: any) => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Make sure your Email is correct!',
        });
      },
    });

  return {
    mutationNewVerificationLink,
  };
};
