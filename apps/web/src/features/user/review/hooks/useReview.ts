import { usePostReviewMutation } from '../api/useReviewMutation';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
export const usePostReview = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: mutationPostReview } = usePostReviewMutation({
    onSuccess: (res: any) => {
      toast({
        description: `${res.data.message}`,
      });
      queryClient.invalidateQueries({ queryKey: ['pastStays'] });
    },
    onError: (err: any) => {
      toast({
        variant: 'destructive',
        description: `${err.response.data.message}`,
      });
    },
  });

  return {
    mutationPostReview,
  };
};
