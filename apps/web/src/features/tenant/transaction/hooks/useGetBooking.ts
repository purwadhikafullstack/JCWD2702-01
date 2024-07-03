import { useGetAllTenantBookingQuery } from '../api/useBookingQuery';

export const useGetAllTenantBooking = (page: number) => {
  const {
    data: allBookings,
    isSuccess,
    isError,
  } = useGetAllTenantBookingQuery(page);

  return { allBookings: allBookings?.data.data };
};
