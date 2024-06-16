import { useGetAllTenantBookingQuery } from '../api/useBookingQuery';

export const useGetAllTenantBooking = () => {
  const {
    data: bookingRequest,
    isSuccess,
    isError,
  } = useGetAllTenantBookingQuery();

  const allBookings: any = [];

  bookingRequest?.data?.data.map((x: any) =>
    x.room_types.map((z: any) => allBookings.push(z.bookings)),
  );
  return { allBookings };
};
