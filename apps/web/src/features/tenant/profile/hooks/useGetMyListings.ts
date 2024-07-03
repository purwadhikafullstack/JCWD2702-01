import { useGetMyListingsQuery } from '../api/useGetMyListingsQuery';

export const useGetMyListings = (page?: number) => {
  const {
    data: myListings,
    isSuccess,
    isError,
  } = useGetMyListingsQuery(page || 1);
  return {
    myListings: myListings?.data || [],
  };
};
