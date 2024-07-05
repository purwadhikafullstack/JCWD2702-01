import { prisma, mysqlConnection } from '@/connection';
import { addHours } from 'date-fns';
import { IBooking } from './types';
import { roomAvailabilitityValidator } from './validatorService';

export const createBilling = async (data: IBooking) => {
  const bookable = await roomAvailabilitityValidator({
    room_typesId: data.room_typesId,
    booking_duration: {
      start: new Date(data.start_date),
      end: new Date(data.end_date),
    },
  });

  if (!bookable)
    throw new Error(
      'Room is already booked during the desired booking duration.',
    );

  return prisma.$transaction(async (prisma) => {
    const booking = await prisma.bookings.create({
      data: {
        ...data,
        expired_at: addHours(new Date(), 1),
      },
    });

    await prisma.booking_histories.create({
      data: {
        bookingsId: booking.id,
        booking_statusId: 1,
        created_at: new Date(),
      },
    });

    const bookingId = booking.id.replace(/-/g, '_');
    const mysql = await mysqlConnection();

    await mysql.query(`
      CREATE EVENT booking_${bookingId}
      ON SCHEDULE AT NOW() + INTERVAL 1 HOUR
      DO 
      BEGIN
        UPDATE bookings SET booking_statusId = 4 WHERE id = '${booking.id}';
        INSERT INTO booking_histories (bookingsId, booking_statusId, updated_at) VALUES ('${booking.id}', 4, UTC_TIMESTAMP());
      END;`);

    return booking;
  });
};

export const getBilling = async (id: string) => {
  const billing = prisma.bookings.findUnique({
    where: {
      id,
    },
    include: {
      status: true,
      booking_histories: true,
      room_type: {
        include: {
          listing: {
            include: {
              tenant: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return billing;
};

export const cancelBilling = async (id: string) => {
  return prisma.$transaction(async (prisma) => {
    await prisma.bookings.update({
      where: {
        id,
      },
      data: {
        booking_statusId: 4,
        deleted_at: new Date(),
      },
    });

    await prisma.booking_histories.create({
      data: {
        bookingsId: id,
        booking_statusId: 4,
        created_at: new Date(),
      },
    });

    const bookingId = id.replace(/-/g, '_');
    const mysql = await mysqlConnection();
    await mysql.query(`DROP EVENT booking_${bookingId}`);
  });
};

export const confirmBilling = async ({
  id,
  files,
  type,
}: {
  id: string;
  files?: any;
  type: string;
}) => {
  return prisma.$transaction(async (prisma) => {
    let booking;
    if (type === 'manual') {
      booking = await prisma.bookings.update({
        where: {
          id,
        },
        data: {
          payment_proof: `${process.env.SERVER_URL as string}/${files[0].path}`,
          booking_statusId: 2,
        },
      });

      await prisma.booking_histories.create({
        data: {
          bookingsId: id,
          booking_statusId: 2,
        },
      });
    } else if (type === 'automatic') {
      booking = await prisma.bookings.update({
        where: {
          id,
        },
        data: {
          booking_statusId: 3,
        },
      });

      await prisma.booking_histories.create({
        data: {
          bookingsId: id,
          booking_statusId: 3,
        },
      });
    } else {
      throw new Error('Invalid type. Use "manual" or "automatic"');
    }

    const bookingId = id.replace(/-/g, '_');
    const mysql = await mysqlConnection();
    await mysql.query(`DROP EVENT booking_${bookingId}`);

    return booking;
  });
};

export const getAllBillingsByUser = async (uid: string, page: number) => {
  const numPerPage = 6;
  const allBillings = await prisma.users.findUnique({
    where: {
      uid,
    },
    include: {
      bookings: {
        skip: (page - 1) * numPerPage,
        take: numPerPage,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          booking_histories: {
            include: {
              booking: true,
              status: true,
            },
          },
          room_type: {
            include: {
              room_images: true,
              seasonal_prices: true,
              listing: {
                include: {
                  listing_images: true,
                  tenant: true,
                },
              },
            },
          },
          status: true,
          payment_type: true,
        },
      },
    },
  });

  return allBillings;
};

export const updatePaymentLink = async (id: string, link: string) => {
  await prisma.bookings.update({
    where: {
      id: id,
    },
    data: {
      payment_url: link,
    },
  });
};
