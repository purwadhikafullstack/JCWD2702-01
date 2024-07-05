import { NextFunction, Response, Request } from 'express';
import { createUser } from './signupService';
import { transporterNodemailer } from '@/helpers/TransporterMailer';
import { IReqAccessToken, createToken } from '@/helpers/Token';
import fs from 'fs';
import Handlebars from 'handlebars';

export const newUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { uid, email, display_name, is_verified, image_url } = req.body;

    const createdUser = await createUser({
      uid,
      email,
      display_name,
      is_verified,
      image_url,
    });

    if (createdUser?.is_verified === false) {
      const accesstoken = await createToken({
        data: {
          uid: createdUser.uid,
          email: createdUser.email,
          isVerified: createdUser.is_verified,
        },
        expiresIn: '1h',
      });

      const verificationHTML = fs.readFileSync(
        process.env.NODEMAILER_TEMPLATE_PATH as string,
        'utf-8',
      );
      let verificationHTMLCompiled: any =
        await Handlebars.compile(verificationHTML);
      verificationHTMLCompiled = verificationHTMLCompiled({
        username: email,
        link: `${process.env.WEB_URL}/verification/${accesstoken}`,
      });

      transporterNodemailer.sendMail({
        from: 'Roomer',
        to: email,
        subject: 'Complete your Roomer registration!',
        html: verificationHTMLCompiled,
      });
    }

    res.status(201).send({
      error: false,
      message: 'Account Created!',
      provider: createdUser?.providersId,
    });
  } catch (error) {
    next(error);
  }
};
