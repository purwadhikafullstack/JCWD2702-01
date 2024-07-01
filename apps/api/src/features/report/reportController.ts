import { NextFunction, Request, Response } from 'express';
import { getAllSales } from './reportService';
import { IReqAccessToken } from '@/helpers/Token';

export const allSales = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload.data;

    const data = await getAllSales(uid);
    console.log(data);
    res.status(200).send({
      error: false,
      message: 'Sales fetched successfully.',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
