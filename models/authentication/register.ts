import ClientSchema from '../../schema/Client';
import EmailConfirmationTokenSchema from '../../schema/EmailConfirmationToken';
import queries from '../../helpers/queries/queries';
import bcrypt from 'bcrypt';

type QueryResult = Promise<object | void>;

const hasStudentEmail = (e: string): boolean =>
  e.split('@')[1] === 'student.gn.k12.ny.us' ||
  e.split('@')[1] === 'greatneck.k12.ny.us';

const isFirstNameReal = (fName: string, e: string): boolean =>
  fName.charAt(0).toUpperCase() === e.charAt(0).toUpperCase();

const isLastNameReal = (lName: string, e: string): boolean =>
  e.split('@')[0].substring(1).slice(0, -1).toUpperCase() ===
  lName.toUpperCase();

const doPasswordsMatch = (p1: string, p2: string): boolean =>
  p1.trim() === p2.trim();

const isEmailInUse = async (e: string): QueryResult =>
  await queries.findOne({
    schema: ClientSchema,
    filterProperty: 'email',
    filterValue: e,
  });

const storeConfEmailToken = async (e: string, t: string): QueryResult =>
  await queries.create(EmailConfirmationTokenSchema, { email: e, token: t });

const verifyToken = async (t: string): QueryResult =>
  await queries.findOne({
    schema: EmailConfirmationTokenSchema,
    filterProperty: 'token',
    filterValue: t,
  });

const isPasswordSecure = (p: string): boolean => {
  if (
    p.length < 10 ||
    p.includes('=') ||
    p.includes('!') ||
    p.includes('.') ||
    p.includes('(') ||
    p.includes(')')
  ) {
    return false;
  }

  return true;
};

const hashPassword = async (
  p: string,
  saltRounds: number
): Promise<string | void> => await bcrypt.hash(p, saltRounds);

const createAccount = async (payload: object): QueryResult =>
  await queries.create(ClientSchema, { ...payload });

export default {
  hasStudentEmail,
  isFirstNameReal,
  isLastNameReal,
  doPasswordsMatch,
  isEmailInUse,
  storeConfEmailToken,
  verifyToken,
  isPasswordSecure,
  hashPassword,
  createAccount,
};
