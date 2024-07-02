import { useGetPastStaysQuery } from '../api/useReviewQuery';

export const useGetPastStays = () => {
  const { data: pastStays, isSuccess, isError } = useGetPastStaysQuery();

  return {
    pastStays: pastStays?.data?.data,
  };
};
