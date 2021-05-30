import path from 'path';
import dotenv from 'dotenv';

import Attendance from '../../schema/Attendance';
import generateToken from '../../util/generateToken';

dotenv.config({ path: path.join(__dirname, '../', '../', './env', '.env') });

const emailInUse = async (e: string) => await Attendance.findOne({ email: e });

const createAttendanceToken = async (e: string) =>
  await Attendance.create({
    token: generateToken(8),
    email: e,
    fall2021MeetingsAttended: 0,
  });

const retrieveEmailSubject = (): string => `Attendance Token Created!`;

const retrieveEmailBody = (t: string): string =>
  `This is an automated response, so please do not respond to this email. Your attendance token is ${t.toString()}. Do not share this information with anyone.`;

export default {
  emailInUse,
  createAttendanceToken,
  retrieveEmailSubject,
  retrieveEmailBody,
};
