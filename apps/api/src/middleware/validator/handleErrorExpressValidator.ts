import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const handleErrorValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorResult = validationResult(req);

  if (errorResult.isEmpty() === false) {
    res.status(300).send({
      error: true,
      message: errorResult.array()[0].msg,
      data: null,
    });
  } else {
    next();
  }
};

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
