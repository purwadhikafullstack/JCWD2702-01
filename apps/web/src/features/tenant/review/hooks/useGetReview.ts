import { useGetGuestReviewsQuery } from '../api/useReviewQuery';

export const useGetGuestReviews = () => {
  const { data: guestReviews, isSuccess, isError } = useGetGuestReviewsQuery();

  return {
    guestReviews: guestReviews?.data?.data,
  };
};
