import Loading from '@/app/loading';
import { useGetPastStays } from '@/features/user/review/hooks/useGetReview';
import { isDirty, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { usePostReview } from '@/features/user/review/hooks/useReview';

export const ReviewSchema = z.object({
  rating: z.number(),
  review: z
    .string()
    .min(10, { message: 'Review must be at least 10 characters long.' }),
  listingsId: z.string(),
  bookingsId: z.string(),
});
import PastStayReviewCard from '@/components/cards/PastStayCard';
export default function MyReviews() {
  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      rating: 0,
      review: '',
      listingsId: '',
      bookingsId: '',
    },
  });
  const { pastStays } = useGetPastStays();
  const { mutationPostReview } = usePostReview();

  const handleSubmit = async (values: z.infer<typeof ReviewSchema>) => {
    try {
      await mutationPostReview(values);
      form.reset({ rating: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  if (!pastStays) return <Loading></Loading>;
  return (
    <div className="flex flex-col gap-3">
      {pastStays.length > 0 ? (
        pastStays?.map((x: any, i: number) => (
          <PastStayReviewCard
            key={i}
            data={x}
            index={i}
            form={form}
            submitHandler={handleSubmit}
          />
        ))
      ) : (
        <div className="text-center text-sm font-medium border p-12 rounded-lg text-stone-400">
          No past stays found
        </div>
      )}
    </div>
  );
}
