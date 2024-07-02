import { useGetAllTenantBookingQuery } from '../api/useBookingQuery';

export const useGetAllTenantBooking = () => {
  const {
    data: allBookings,
    isSuccess,
    isError,
  } = useGetAllTenantBookingQuery();

  return { allBookings: allBookings?.data.data };
};
