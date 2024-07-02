import Loading from '@/app/loading';

import { useGetGuestReviews } from '@/features/tenant/review/hooks/useGetReview';
import { GuestReviewCard } from '@/components/cards/GuestReviewCard';

export default function GuestReviews() {
  const { guestReviews } = useGetGuestReviews();

  if (!guestReviews) return <Loading />;

  return (
    <div>
      {guestReviews &&
        guestReviews.map((x: any, i: number) => (
          <GuestReviewCard isTenant={true} review={x} id={x.id} key={i} />
        ))}
    </div>
  );
}
