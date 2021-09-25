import { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import attendanceModel from '../../models/attendance/attendance';

dotenv.config({ path: path.join(__dirname, '../', '../', './env', '.env') });

const getAttendancePage = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.render('attendance/attendance', {
    members: req.query.searchText
      ? (await attendanceModel.retrieveAllAttendances()).filter(
          (obj) =>
            obj.email
              .toUpperCase()
              .includes(req.query.searchText.toUpperCase()) ||
            obj.email.toUpperCase() === req.query.searchText.toUpperCase()
        )
      : null,
    searchText: req.query.searchText || false,
    fall2021Meetings: process.env.FALL_2021_MEETINGS,
  });
};

const postAttendancePage = (req: Request, res: Response): void => {
  res.redirect(`/attendance/?searchText=${req.body.member}`);
};

export default {
  getAttendancePage,
  postAttendancePage,
};
