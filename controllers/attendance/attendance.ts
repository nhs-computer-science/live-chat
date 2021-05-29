import { Request, Response } from 'express';
import path from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import attendanceModel from '../../models/attendance/attendance';
import redirection from '../../util/redirection';

const getAttendancePage = (req: Request, res: Response): void => {};

const postAttendancePage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const BASE_URL = '/attendance/';
  const QUERY_VALUE = '=yes';

  if (!process.env.TAKING_ATTENDANCE_SUBMISSIONS) {
    return redirection(res, `${BASE_URL}?notTakingAttendance${QUERY_VALUE}`); // TODO Error Path
  }

  const t: string = req.body.token.trim();
  const token = await attendanceModel.authenticateToken(t, BASE_URL, res);

  if (token) {
    if (token.fall2021Meetings + 1 > process.env.FALL_2021_MEETINGS!) {
      return redirection(res, `${BASE_URL}?tooManyMeetings${QUERY_VALUE}`); // TODO Error Path
    }

    if (
      await attendanceModel.updateAttendance(
        t,
        BASE_URL,
        token.fall2021Meetings,
        res
      )
    ) {
      redirection(res, `${BASE_URL}?attendanceUpdated${QUERY_VALUE}`); // TODO Success Path
    }
  } else {
    redirection(res, `${BASE_URL}?tokenInvalid${QUERY_VALUE}`);
  }
};

export default {
  getAttendancePage,
  postAttendancePage,
};
