import {
  useGetBookingByIdQuery,
  useGetBookingByUserQuery,
} from '../api/useBookingQuery';

export const useGetBookingById = (id: string) => {
  const { data: booking, isSuccess, isError } = useGetBookingByIdQuery(id);

  return {
    booking: booking?.data?.data?.bookingData,
  };
};

export const useGetBookingByUser = () => {
  const { data: allBookings, isSuccess, isError } = useGetBookingByUserQuery();

  return {
    allBookings: allBookings?.data?.data?.allBookings?.bookings,
  };
};
