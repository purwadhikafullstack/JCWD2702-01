import { DateRange } from 'react-day-picker';
import { useGetMyListingsQuery } from '../api/useGetMyListingsQuery';
import { format } from 'date-fns';
export const useGetMyListings = (params?: string | undefined) => {
  const {
    data: myListings,
    isSuccess,
    isError,
  } = useGetMyListingsQuery(params);
  return {
    myListings: myListings?.data.myListing || [],
  };
};
