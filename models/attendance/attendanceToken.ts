import { Response } from 'express';

import Attendance from '../../schema/Attendance';
import redirection from '../../util/redirection';
import generateToken from '../../util/generateToken';
import QueryMethod from '../../util/interfaces/queryMethod';

const DATABASE_ERROR_URL = (BASE_URL: string): string =>
  `${BASE_URL}?serverSideError=yes`;

let emailInUse: QueryMethod;
let createAttendanceToken: QueryMethod;

emailInUse = async (e: string, BASE_URL: string, r: Response) =>
  await Attendance.findOne({ email: e }).catch((e: Error): void => {
    redirection(r, DATABASE_ERROR_URL(BASE_URL), e);
  });

createAttendanceToken = async (e: string, BASE_URL: string, r: Response) =>
  await Attendance.create({
    token: generateToken(8),
    email: e,
    fall2021Meetings: 0,
  }).catch((e: Error): void => {
    redirection(r, DATABASE_ERROR_URL(BASE_URL), e);
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
