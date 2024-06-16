import { prisma, mysqlConnection } from '@/connection';
import { addHours, subDays, areIntervalsOverlapping } from 'date-fns';
import { IBooking } from './types';

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
  room_info?.bookings.map((x: any) =>
    unbookable.push({
      start: new Date(x.start_date),
      end: subDays(new Date(x.end_date), 1),
    }),
  );

  for (let unbookable_date of unbookable) {
    const check = areIntervalsOverlapping(booking_duration, unbookable_date);

    if (check) return false;
  }

  return true;
};
