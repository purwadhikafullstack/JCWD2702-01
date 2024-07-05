import nodemailer from 'nodemailer';

export const transporterNodemailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'roomer702@gmail.com',
    pass: 'vajnnsxydanzpzeb',
  },
  tls: {
    rejectUnauthorized: true,
  },
});
