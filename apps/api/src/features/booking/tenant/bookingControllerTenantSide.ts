import { IReqAccessToken } from '@/helpers/Token';
import { NextFunction, Request, Response } from 'express';
import {
  getBookingsByTenantId,
  confirmBookingByTenant,
  sendConfirmationEmail,
  sendReminderEmail,
} from '@/features/booking/tenant/bookingServiceTenantSide';
import schedule from 'node-schedule';
import { addMinutes, format } from 'date-fns';

export const getBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload.data;
    const { page } = req.query;
    const allBookings = await getBookingsByTenantId(uid, Number(page) || 1);

    res.status(200).send({
      error: false,
      message: `All bookings for tenant`,
      data: allBookings,
    });
  } catch (error) {
    next(error);
  }
};

export const confirmBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { bookingId, status } = req.query;
    const tenantConfirm = await confirmBookingByTenant(
      bookingId as string,
      Number(status),
    );

    tenantConfirm;
    console.log(tenantConfirm);

    if (tenantConfirm && Number(status) === 3) {
      await sendConfirmationEmail({
        email: tenantConfirm.user.email,
        bookingId: bookingId as string,
        listing_title: tenantConfirm.room_type?.listing.title as string,
        address: tenantConfirm.room_type?.listing.address as string,
        phone: tenantConfirm.room_type?.listing.contact_person as string,
        start_date: `${format(tenantConfirm.start_date, 'eee, MMMM dd yyyy')} 14:00`,
        end_date: `${format(tenantConfirm.end_date, 'eee, MMMM dd yyyy')} 11:00`,
      });

      const date = addMinutes(new Date(), 5);
      schedule.scheduleJob(date, () =>
        sendReminderEmail({
          email: tenantConfirm.user.email,
          bookingId: bookingId as string,
        }),
      );

      res.status(200).send({
        error: false,
        message: `Your booking has been confirmed. Booking voucher has been sent to the email`,
        data: tenantConfirm,
      });
    } else {
      res.status(200).send({
        error: false,
        message: `Booking status updated`,
        data: tenantConfirm,
      });
    }
  } catch (error) {
    next(error);
  }
};
