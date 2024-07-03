import { prisma } from '@/connection';
import { areIntervalsOverlapping, isWithinInterval } from 'date-fns';

interface Intervals {
  start: Date;
  end: Date;
}
export const roomAvailabilitityValidator = async ({
  room_typesId,
  booking_duration,
}: {
  room_typesId: number;
  booking_duration: Intervals;
}) => {
  const room_info = await prisma.room_types.findUnique({
    where: {
      id: room_typesId,
    },
    include: {
      bookings: {
        include: {
          status: true,
        },
      },
      nonavailability: true,
    },
  });

  const unbookable: any[] = [];
  room_info?.nonavailability.map((x: any) =>
    unbookable.push({
      start: new Date(x.start_date),
      end: new Date(x.end_date),
    }),
  );

  const bookedRooms = room_info?.bookings.filter((x) => x.booking_statusId < 4);

  if (bookedRooms && bookedRooms.length > 0) {
    const overlappingBookings = [];
    for (let booked of bookedRooms) {
      const check = areIntervalsOverlapping(
        booking_duration,
        { start: new Date(booked.start_date), end: new Date(booked.end_date) },
        { inclusive: false },
      );
      if (check) {
        overlappingBookings.push(true);
      }
    }
    if (room_info?.stock! == overlappingBookings.length) return false;
  }

  for (let unbookable_date of unbookable) {
    const check = areIntervalsOverlapping(booking_duration, unbookable_date);
    const check2 = isWithinInterval(unbookable_date.start, booking_duration);
    if (check || check2) return false;
  }

  return true;
};
