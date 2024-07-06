import { IReqAccessToken } from '@/helpers/Token';
import { NextFunction, Request, Response } from 'express';
import {
  createBilling,
  getBilling,
  cancelBilling,
  confirmBilling,
  getAllBillingsByUser,
  updatePaymentLink,
} from '@/features/booking/user/bookingServiceUserSide';
import { midtransBooking } from './midtrans';

export const newBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload.data;
    let { type, room_typesId } = req.query;
    const data = req.body;
    const { start_date, end_date } = req.body;
    data.usersId = uid;
    data.start_date = new Date(start_date);
    data.end_date = new Date(end_date);
    data.room_typesId = Number(room_typesId);

    const bill = await createBilling(data);

    if (Number(type) == 2) {
      const redirectUrl = await midtransBooking(bill);
      if (!redirectUrl) throw new Error('Midtrans error.');

      await updatePaymentLink(bill.id, redirectUrl);

      res.status(200).send({
        error: false,
        message: 'Booking data created!',
        data: {
          bill,
          redirectUrl,
        },
      });
    } else {
      res.status(200).send({
        error: false,
        message: 'Booking data created!',
        data: {
          bill,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookingId } = req.params;

    await cancelBilling(bookingId);

    res.status(200).send({
      error: false,
      message: `Booking with ID ${bookingId} has been cancelled`,
    });
  } catch (error) {
    next(error);
  }
};

export const confirmPayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { type, bookingId } = req.query;

    if (!type || !bookingId) {
      return res.status(400).send({
        error: true,
        message: 'Type and booking ID are required',
      });
    }

    type = type.toString().toLowerCase();
    bookingId = bookingId as string;

    let updateBooking;
    if (type === 'manual') {
      if (req.files) {
        const uploadedFiles = Array.isArray(req.files)
          ? req.files
          : req.files['images'];

        if (!uploadedFiles) throw new Error('Payment proof image is required!');

        updateBooking = await confirmBilling({
          id: bookingId,
          files: uploadedFiles,
          type,
        });

        return res.status(200).send({
          error: false,
          message: `Payment proof for booking with ID ${bookingId} is received. Waiting for tenant confirmation.`,
          data: updateBooking,
        });
      }
    } else {
      updateBooking = await confirmBilling({
        id: bookingId,
        type,
      });

      return res.status(200).send({
        error: false,
        message: `Booking with ID ${bookingId} has been confirmed`,
        data: updateBooking,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const checkBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookingId } = req.params;

    const bookingData = await getBilling(bookingId);

    if (!bookingData) {
      res.status(404).send({
        error: true,
        message: `Booking with ID ${bookingId} not found`,
      });
    }

    res.status(200).send({
      error: false,
      message: `Booking with ID ${bookingId} found`,
      data: { bookingData },
    });
  } catch (error) {
    next(error);
  }
};

export const allBookingsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload.data;
    const { page } = req.query;
    console.log(page);
    const allBookings = await getAllBillingsByUser(uid, Number(page) || 1);

    res.status(200).send({
      error: false,
      message: `All bookings by user with UID ${uid}`,
      data: { allBookings },
    });
  } catch (error) {
    next(error);
  }
};
