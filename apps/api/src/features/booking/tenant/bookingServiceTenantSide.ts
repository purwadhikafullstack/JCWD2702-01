import { prisma, mysqlConnection } from '@/connection';
import { transporterNodemailer } from '@/helpers/TransporterMailer';
import { addHours } from 'date-fns';
import fs from 'fs';
import Handlebars from 'handlebars';

export const getBookingsByTenantId = async (id: string, page: number) => {
  const numPerPage = 6;
  const listingsByTenant = await prisma.tenants.findUnique({
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
                  user: true,
                  payment_type: true,
                  status: true,
                  room_type: {
                    include: {
                      listing: {
                        include: {
                          listing_images: true,
                          tenant: true,
                        },
                      },
                      room_images: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!listingsByTenant) {
    return 'no listing';
  }

  const bookings = [];
  for (let listing of listingsByTenant?.listings) {
    for (let room of listing.room_types) {
      for (let book of room.bookings) {
        bookings.push(book);
      }
    }
  }

  return bookings
    .sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice((page - 1) * numPerPage, numPerPage * page);
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
          room_type: {
            include: {
              listing: true,
            },
          },
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

export const sendConfirmationEmail = async ({
  email,
  bookingId,
  listing_title,
  address,
  start_date,
  end_date,
  phone,
}: {
  email: string;
  bookingId: string;
  listing_title: string;
  address: string;
  start_date: string;
  end_date: string;
  phone: string;
}) => {
  const verificationHTML = fs.readFileSync(
    process.env.NODEMAILER_BOOKING_SUCCESS_TEMPLATE_PATH as string,
    'utf-8',
  );

  let verificationHTMLCompiled: any =
    await Handlebars.compile(verificationHTML);
  verificationHTMLCompiled = verificationHTMLCompiled({
    bookingId,
    listing_title,
    address,
    start_date,
    end_date,
    phone,
  });

  transporterNodemailer.sendMail({
    from: 'Roomer',
    to: email,
    subject: 'Booking has been confirmed',
    html: verificationHTMLCompiled,
  });
};

export const sendReminderEmail = async ({
  email,
  bookingId,
  listing_title,
  address,
  start_date,
  end_date,
  phone,
}: {
  email: string;
  bookingId: string;
  listing_title: string;
  address: string;
  start_date: string;
  end_date: string;
  phone: string;
}) => {
  const verificationHTML = fs.readFileSync(
    process.env.NODEMAILER_BOOKING_REMINDER_TEMPLATE_PATH as string,
    'utf-8',
  );

  let verificationHTMLCompiled: any =
    await Handlebars.compile(verificationHTML);
  verificationHTMLCompiled = verificationHTMLCompiled({
    bookingId,
    listing_title,
    address,
    start_date,
    end_date,
    phone,
  });

  transporterNodemailer.sendMail({
    from: 'Roomer',
    to: email,
    subject: 'Booking Reminder',
    html: verificationHTMLCompiled,
  });
};
