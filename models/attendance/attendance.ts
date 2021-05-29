import { Response } from 'express';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import AttendanceSchema from '../../schema/Attendance';
import redirection from '../../util/redirection';

type MongooseQueryResult = Promise<object | null>;

const DATABASE_ERROR_URL = (BASE_URL: string): string =>
  `${BASE_URL}?serverSideError=yes`;

const authenticateToken = async (
  t: string,
  BASE_URL: string,
  r: Response
): MongooseQueryResult =>
  await AttendanceSchema.findOne({ token: t }).catch((e: Error): void =>
    redirection(r, DATABASE_ERROR_URL(BASE_URL), e)
  );

const updateAttendance = async (
  t: string,
  BASE_URL: string,
  m: number,
  r: Response
): MongooseQueryResult =>
  await AttendanceSchema.updateOne(
    { token: t },
    { fall2021Meetings: m + 1 }
  ).catch((e: Error): void => redirection(r, DATABASE_ERROR_URL(BASE_URL), e));

export default {
  authenticateToken,
  updateAttendance,
};
