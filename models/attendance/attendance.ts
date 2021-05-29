import { Response } from 'express';

import AttendanceSchema from '../../schema/Attendance';
import redirection from '../../util/redirection';
import QueryMethod from '../../util/interfaces/queryMethod';

type MongooseQueryResult = Promise<object | null>;

const DATABASE_ERROR_URL = (BASE_URL: string): string =>
  `${BASE_URL}?serverSideError=yes`;

let authenticateToken: QueryMethod;

authenticateToken = async (
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
  r: Response,
  m: number
): MongooseQueryResult =>
  await AttendanceSchema.updateOne(
    { token: t },
    { fall2021Meetings: m + 1 }
  ).catch((e: Error): void => redirection(r, DATABASE_ERROR_URL(BASE_URL), e));

export default {
  authenticateToken,
  updateAttendance,
};
