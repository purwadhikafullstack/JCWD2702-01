import { IReqAccessToken } from '@/helpers/Token';
import { NextFunction, Request, Response } from 'express';
import { getAllReviews, newReply } from './reviewServiceTenantSide';

export const allGuestReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload.data;
    const data = await getAllReviews(uid);
    res.status(200).send({
      error: false,
      message: `All guest reviews for tenant ${uid}`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const postReply = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload.data;
    const data = await newReply(req.body);
    res.status(200).send({
      error: false,
      message: `Reply has been sent`,
      data,
    });
  } catch (error) {
    next(error);
  }
};
