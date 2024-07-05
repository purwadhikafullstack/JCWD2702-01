<<<<<<< HEAD
import { DateRange } from 'react-day-picker';
import { useGetMyListingsQuery } from '../api/useGetMyListingsQuery';
import { format } from 'date-fns';
export const useGetMyListings = (params?: string | undefined) => {
=======
import { useGetMyListingsQuery } from '../api/useGetMyListingsQuery';

export const useGetMyListings = (page?: number) => {
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
  const {
    data: myListings,
    isSuccess,
    isError,
<<<<<<< HEAD
  } = useGetMyListingsQuery(params);
  return {
    myListings: myListings?.data.myListing || [],
=======
  } = useGetMyListingsQuery(page || 1);
  return {
    myListings: myListings?.data || [],
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
  };
};
