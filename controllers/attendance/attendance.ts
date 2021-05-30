import { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../', '../', './env', '.env') });

import attendanceModel from '../../models/attendance/attendance';
import email from '../../email/skeleton';

const getAttendancePage = (req: Request, res: Response): void => {
  res.render('attendance/attendance', {
    notTakingAttendance: req.query.notTakingAttendance == 'yes' ? true : false,
    invalidToken: req.query.invalidToken === 'yes' ? true : false,
    meetingOverflow: req.query.meetingOverflow == 'yes' ? true : false,
    attendanceUpdated: req.query.attendanceUpdated == 'yes' ? true : false,
    date: process.env.CURRENT_DATE,
  });
};

const postAttendancePage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const URL: string = '/attendance';
  const QUERY_VALUE: string = '=yes';

  if (process.env.TAKING_ATTENDANCE_SUBMISSIONS! === 'no') {
    return res.redirect(`${URL}/?notTakingAttendance${QUERY_VALUE}`);
  }

  const t: string = req.body.token.trim();
  const token = await attendanceModel.authenticateToken(t);

  if (token) {
    if (
      parseInt(token.fall2021MeetingsAttended) + 1 >
      parseInt(process.env.FALL_2021_MEETINGS!)
    ) {
      return res.redirect(`${URL}/?meetingOverflow${QUERY_VALUE}`);
    } else if (
      await attendanceModel.updateAttendance(t, token.fall2021MeetingsAttended)
    ) {
      const emailSent = await email(
        process.env.NODEMAILER_USER!,
        'Attendance Submitted!',
        `${token.email} submitted his or her attendance!`
      );

      if (emailSent) {
        res.redirect(`${URL}/?attendanceUpdated${QUERY_VALUE}`);
      }
    }
  } else {
    res.redirect(`${URL}/?invalidToken${QUERY_VALUE}`);
  }
};

export default {
  getAttendancePage,
  postAttendancePage,
};
