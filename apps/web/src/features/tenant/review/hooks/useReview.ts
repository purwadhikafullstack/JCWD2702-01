import { usePostReplyMutation } from '../api/useReviewMutation';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
export const usePostReply = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: mutationPostReply } = usePostReplyMutation({
    onSuccess: (res: any) => {
      toast({
        description: `${res.data.message}`,
      });
      queryClient.invalidateQueries({ queryKey: ['guestReviews'] });
    },
    onError: (err: any) => {
      toast({
        variant: 'destructive',
        description: `${err.response.data.message}`,
      });
    },
  });

  return {
    mutationPostReply,
  };
};
