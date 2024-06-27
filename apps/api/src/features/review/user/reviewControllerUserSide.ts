import { IReqAccessToken } from '@/helpers/Token';
import { NextFunction, Request, Response } from 'express';
import { getAllPastStays, newReview } from './reviewServiceUserSide';
export const allPastStays = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload.data;
    const data = await getAllPastStays(uid);
    res.status(200).send({
      error: false,
      message: `All past stays by user ${uid}`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const postReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload.data;
    const data = req.body;
    data.usersId = uid;
    await newReview(data);
    res.status(200).send({
      error: false,
      message: `Review sent!`,
    });
  } catch (error) {
    next(error);
  }
};
