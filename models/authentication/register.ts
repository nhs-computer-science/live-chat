import { Response } from 'express';
import serverSideError from '../../util/serverSideError';

import ClientSchema from '../../schema/Client';
import EmailConfirmationToken from '../../schema/EmailConfirmationToken';
import bcrypt from 'bcrypt';

const hasStudentEmail = (e: string): boolean =>
  e.split('@')[1] === 'student.gn.k12.ny.us' ||
  e.split('@')[1] === 'greatneck.k12.ny.us';

const isFirstNameReal = (fName: string, e: string): boolean =>
  fName.charAt(0) === e.charAt(0);

const isLastNameReal = (lName: string, e: string): boolean =>
  e.split('@')[0].substring(1).slice(0, -1) === lName;

const doPasswordsMatch = (p1: string, p2: string): boolean =>
  p1.trim() === p2.trim();

const isEmailInUse = async (e: string) =>
  await ClientSchema.findOne({ email: e });

const storeConfEmailToken = async (
  e: string,
  t: string,
  BASE_URL: string,
  r: Response
): Promise<object | null> =>
  await EmailConfirmationToken.create({ email: e, token: t }).catch(
    (e: Error): void => {
      console.log(e);
      serverSideError(r, BASE_URL);
    }
  );

const verifyToken = async (t: string) =>
  await EmailConfirmationToken.findOne({ token: t });

const hashPassword = async (
  password: string,
  saltRounds: number,
  BASE_URL: string,
  r: Response
): Promise<string | void> =>
  await bcrypt.hash(password, saltRounds).catch((e: Error): void => {
    console.log(e);
    serverSideError(r, BASE_URL);
  });

const createAccount = async (
  payload: object,
  BASE_URL: string,
  r: Response
): Promise<object | null> =>
  await ClientSchema.create({ ...payload }).catch((e: Error): void => {
    console.log(e);
    serverSideError(r, BASE_URL);
  });

export default {
  hasStudentEmail,
  isFirstNameReal,
  isLastNameReal,
  doPasswordsMatch,
  isEmailInUse,
  storeConfEmailToken,
  verifyToken,
  createAccount,
  hashPassword,
};
