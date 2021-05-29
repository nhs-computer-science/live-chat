import { Request, Response } from 'express';

import attendanceTokenModel from '../../models/attendance/attendanceToken';
import email from '../../email/skeleton';

type AwaitData = object | null;

const getAttendanceTokenPage = (req: Request, res: Response): void => {
  res.render('attendance/attendance-token', {
    notStudentEmail: req.query.notStudentEmail === 'yes' ? true : false,
    isEmailInUse: req.query.isEmailInUse === 'yes' ? true : false,
    attendanceTokenSent: req.query.attendanceTokenSent === 'yes' ? true : false,
  });
};

const postAttendanceTokenPage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const e: string = req.body.email.trim();

  const URL: string = '/attendance-token';

  if (e.split('@')[1] !== 'student.gn.k12.ny.us') {
    return res.redirect(`${URL}/?notStudentEmail=yes`);
  }

  if (await attendanceTokenModel.emailInUse(e, URL, res)) {
    return res.redirect(`${URL}/?isEmailInUse=yes`);
  }

  const tokenModel: AwaitData =
    await attendanceTokenModel.createAttendanceToken(e, URL, res);

  if (tokenModel) {
    const attendanceEmailTokenSent: AwaitData = await email(
      e,
      attendanceTokenModel.retrieveEmailSubject(),
      attendanceTokenModel.retrieveEmailBody(tokenModel.token)
    );

    if (attendanceEmailTokenSent) {
      res.redirect(`${URL}/?attendanceTokenSent=yes`);
    }
  }
};

export default {
  getAttendanceTokenPage,
  postAttendanceTokenPage,
};
