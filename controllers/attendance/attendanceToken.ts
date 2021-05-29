import { Request, Response } from 'express';

import attendanceTokenModel from '../../models/attendance/attendanceToken';
import redirection from '../../util/redirection';
import email from '../../email/skeleton';

type AwaitData = object | null;

const getAttendanceTokenPage = (req: Request, res: Response): void => {};

const postAttendanceTokenPage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const halves = req.body.email.trim().split('@');
  const e: string = halves[0] + halves[1];

  const BASE_URL: string = '/attendanceToken/';
  const QUERY_VALUE: string = '=yes';

  if (
    isNaN(halves[0].charAt(halves[0].length - 1)) ||
    halves[1] !== 'student.gn.k12.ny.us'
  ) {
    return redirection(res, `${BASE_URL}?passwordsNotMatching${QUERY_VALUE}`);
  }

  if (await attendanceTokenModel.emailInUse(e, BASE_URL, res)) {
    return redirection(res, `${BASE_URL}?emailInUse${QUERY_VALUE}`);
  }

  const tokenModel: AwaitData =
    await attendanceTokenModel.createAttendanceToken(e, BASE_URL, res);

  if (tokenModel) {
    const attendanceEmailTokenSent: AwaitData = await email(
      e,
      attendanceTokenModel.retrieveEmailSubject(),
      attendanceTokenModel.retrieveEmailBody(tokenModel.token)
    );

    if (attendanceEmailTokenSent) {
      redirection(res, `${BASE_URL}?emailSent${QUERY_VALUE}`);
    }
  }
};

export default {
  getAttendanceTokenPage,
  postAttendanceTokenPage,
};
