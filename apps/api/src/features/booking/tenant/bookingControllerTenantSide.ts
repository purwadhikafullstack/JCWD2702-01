import { IReqAccessToken } from '@/helpers/Token';
import { NextFunction, Request, Response } from 'express';
import {
  getBookingsByTenantId,
  confirmBookingByTenant,
} from '@/features/booking/tenant/bookingServiceTenantSide';
import fs from 'fs';
import { transporterNodemailer } from '@/helpers/TransporterMailer';
import Handlebars from 'handlebars';

export const getBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload.data;

    const allBookings = await getBookingsByTenantId(uid);

    res.status(200).send({
      error: false,
      message: `All bookings for tenant ${allBookings?.id}`,
      data: allBookings?.listings,
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
    const reqToken = req as IReqAccessToken;
    let { bookingId, status } = req.query;
    const tenantConfirm = await confirmBookingByTenant(
      bookingId as string,
      Number(status),
    );

    if (tenantConfirm && Number(status) === 3) {
      const verificationHTML = fs.readFileSync(
        process.env.NODEMAILER_BOOKING_SUCCESS as string,
        'utf-8',
      );

      let verificationHTMLCompiled: any =
        await Handlebars.compile(verificationHTML);
      verificationHTMLCompiled = verificationHTMLCompiled({
        bookingId,
      });

      transporterNodemailer.sendMail({
        from: 'Roomer',
        to: tenantConfirm.user.email,
        subject: 'Booking has been confirmed',
        html: verificationHTMLCompiled,
      });

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
