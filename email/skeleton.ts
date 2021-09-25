import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../', './env', '.env') });

export default async (
  recipient: string,
  subject: string,
  text: string
): Promise<object> => {
  const host: string = process.env.NODEMAILER_HOST!;
  const user: string = process.env.NODEMAILER_USER!;
  const pass: string = process.env.NODEMAILER_PASS!;
  const port: any = process.env.NODEMAILER_PORT!;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user,
      pass,
    },
  });

  return await transporter.sendMail({
    from: user,
    to: recipient,
    subject,
    text,
  });
};
