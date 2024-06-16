import { prisma, mysqlConnection } from '@/connection';
import { addHours } from 'date-fns';

export const getBookingsByTenantId = async (id: string) => {
  return await prisma.tenants.findUnique({
    where: {
      usersId: id,
    },
    include: {
      listings: {
        include: {
          room_types: {
            include: {
              bookings: {
                include: {
                  payment_type: true,
                  status: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const confirmBookingByTenant = async (id: string, status: number) => {
  return prisma.$transaction(async (prisma) => {
    if (status === 3) {
      const confirm = await prisma.bookings.update({
        where: {
          id,
        },
        data: {
          booking_statusId: status,
        },
        include: {
          user: true,
        },
      });

      await prisma.booking_histories.create({
        data: {
          bookingsId: id,
          booking_statusId: status,
        },
      });

      return confirm;
    } else if (status === 1) {
      const reject = await prisma.bookings.update({
        where: {
          id,
        },
        data: {
          booking_statusId: status,
          expired_at: addHours(new Date(), 1),
        },
      });

      await prisma.booking_histories.create({
        data: {
          bookingsId: id,
          booking_statusId: status,
        },
      });

      const mysql = await mysqlConnection();
      const bookingId = id.replace(/-/g, '_');

      await mysql.query(`
        CREATE EVENT booking_${bookingId}
        ON SCHEDULE AT NOW() + INTERVAL 1 HOUR
        DO 
        BEGIN
          UPDATE bookings SET booking_statusId = 4 WHERE id = '${bookingId}';
          INSERT INTO booking_histories (bookingsId, booking_statusId, updated_at) VALUES ('${id}', 4, UTC_TIMESTAMP());
        END;`);
    } else {
      const cancel = await prisma.bookings.update({
        where: {
          id,
        },
        data: {
          booking_statusId: status,
        },
      });

      await prisma.booking_histories.create({
        data: {
          bookingsId: id,
          booking_statusId: status,
        },
      });
    }
  });
};
