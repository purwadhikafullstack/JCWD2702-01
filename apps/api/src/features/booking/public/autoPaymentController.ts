import { prisma, mysqlConnection } from '@/connection';
import { Response, Request, NextFunction } from 'express';
import schedule from 'node-schedule';
import { addMinutes } from 'date-fns';
import {
  sendConfirmationEmail,
  sendReminderEmail,
} from '../tenant/bookingServiceTenantSide';

export const updateAutoPayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookingId } = req.query;
    const bill = await prisma.$transaction(async (prisma) => {
      const booking = await prisma.bookings.update({
        where: {
          id: bookingId as string,
        },
        include: {
          user: true,
        },
        data: {
          booking_statusId: 3,
        },
      });

      await prisma.booking_histories.create({
        data: {
          bookingsId: booking.id,
          booking_statusId: 3,
        },
      });

      const mysql = await mysqlConnection();
      await mysql.query(`DROP EVENT booking_${booking.id.replace(/-/g, '_')}`);
      return booking;
    });

    await sendConfirmationEmail({
      email: bill.user.email,
      bookingId: bookingId as string,
    });

    const date = addMinutes(new Date(), 5);
    schedule.scheduleJob(date, () =>
      sendReminderEmail({
        email: bill.user.email,
        bookingId: bookingId as string,
      }),
    );

    res.status(200).send({
      error: false,
      message: 'Booking data created!',
      data: {
        bill,
      },
    });
  } catch (error) {
    next(error);
  }
};
