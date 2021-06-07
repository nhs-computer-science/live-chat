import bcrypt from 'bcrypt';

import ClientSchema from '../../schema/Client';
import EmailConfirmationTokenSchema from '../../schema/EmailConfirmationToken';

const emailExists = async (e: string): Promise<object | void> =>
  await ClientSchema.findOne({ email: e });

const storeToken = async (e: string, t: string): Promise<object | void> =>
  await EmailConfirmationTokenSchema.create({ email: e, token: t });

const compareTokens = async (t: string): Promise<object | void> =>
  await EmailConfirmationTokenSchema.findOne({ token: t });

const hashPassword = async (
  password: string,
  saltRounds: number
): Promise<string | void> => await bcrypt.hash(password, saltRounds);

const changePassword = async (p: string, e: string): Promise<object | void> =>
  ClientSchema.updateOne({ email: e, password: await hashPassword(p, 10) });

export default {
  emailExists,
  storeToken,
  compareTokens,
  changePassword,
};
