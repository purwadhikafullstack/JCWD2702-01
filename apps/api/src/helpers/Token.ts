import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

interface IVerifiedToken {
  uid: string;
  email: string;
  isVerified: boolean;
}

interface IAccessToken {
  uid: string;
  username: string;
  roleId: number;
  profilePict: string;
}

export const createToken = ({
  data,
  expiresIn,
}: {
  data: IAccessToken | IVerifiedToken | any;
  expiresIn: string;
}) => {
  return jwt.sign({ data }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: expiresIn,
  });
};

export interface IReqAccessToken extends Request {
  payload: any;
  headers: {
    accesstoken: string;
  };
}

export const tokenVerify = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { accesstoken } = reqToken.headers;

    if (!accesstoken) throw new Error('Token Must Provided!');

    const payload = jwt.verify(
      accesstoken as string,
      process.env.JWT_SECRET_KEY as string,
    );

    reqToken.payload = payload;

    next();
  } catch (error) {
    next(error);
  }
};

export const roleVerify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { rolesId } = reqToken.payload.data;
    if (rolesId !== 2) throw new Error('Only accessible to tenants');

    next();
  } catch (error) {
    next(error);
  }
};
