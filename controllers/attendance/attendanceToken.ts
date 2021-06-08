import { Request, Response } from 'express';

import attendanceTokenModel from '../../models/attendance/attendanceToken';
import email from '../../email/skeleton';
import serverError from '../../helper/serverError/serverError';

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

  const URL: string = '/attendance-token/';
  const QUERY_VALUE: string = '=yes';

  if (e.split('@')[1] !== 'student.gn.k12.ny.us') {
    return res.redirect(`${URL}?notStudentEmail${QUERY_VALUE}`);
  }

  if (await attendanceTokenModel.emailInUse(e)) {
    return res.redirect(`${URL}?isEmailInUse${QUERY_VALUE}`);
  }

  const tokenModel = await attendanceTokenModel.createAttendanceToken(e);

  const attendanceEmailTokenSent = await email(
    e,
    attendanceTokenModel.retrieveEmailSubject(),
    attendanceTokenModel.retrieveEmailBody(tokenModel.token)
  ).catch((e: Error): void => {
    return serverError(res, URL);
  });

  if (attendanceEmailTokenSent) {
    res.redirect(`${URL}?attendanceTokenSent${QUERY_VALUE}`);
  }
};

export default {
  getAttendanceTokenPage,
  postAttendanceTokenPage,
};
