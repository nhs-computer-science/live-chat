import path from 'path';
import dotenv from 'dotenv';

import AttendanceSchema from '../../schema/Attendance';
import token from '../../helpers/token/token';
import queries from '../../helpers/queries/queries';

dotenv.config({ path: path.join(__dirname, '../', '../', './env', '.env') });

const emailInUse = async (e: string) =>
  await queries.findOne({
    schema: AttendanceSchema,
    filterProperty: 'email',
    filterValue: e,
  });

const createAttendanceToken = async (e: string) =>
  await queries.create(AttendanceSchema, {
    token: token(8),
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
