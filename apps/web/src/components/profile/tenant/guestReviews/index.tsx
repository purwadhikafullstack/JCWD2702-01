import Loading from '@/app/loading';

import { useGetGuestReviews } from '@/features/tenant/review/hooks/useGetReview';
import { GuestReviewCard } from '@/components/cards/GuestReviewCard';

export default function GuestReviews() {
  const { guestReviews } = useGetGuestReviews();

  if (!guestReviews) return <Loading />;

  return (
    <div>
      {guestReviews.length > 0 ? (
        guestReviews.map((x: any, i: number) => (
          <GuestReviewCard isTenant={true} review={x} id={x.id} key={i} />
        ))
      ) : (
        <div className="text-center font-medium border p-12 text-sm rounded-lg text-stone-400">
          No guest reviews found
        </div>
      )}
    </div>
  );
}
