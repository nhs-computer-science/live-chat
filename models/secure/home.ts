import { Request, Response } from 'express';
import bcrpyt from 'bcrypt';
import Client from '../../schema/Client';

import MessageSchema from '../../schema/Message';
import serverSideError from '../../util/serverSideError';

const fetchMessages = async () => await MessageSchema.find();

const storeMessage = async (
  c: string,
  req: Request,
  res: Response
): Promise<object | void> =>
  await MessageSchema.create({
    email: req.session.client.email,
    message: c,
  }).catch((e: Error): void => {
    console.log(e);
    serverSideError(res, '/home');
  });

const comparePasswords = async (
  p: string,
  hash: string,
  res: Response
): Promise<boolean | void> => await bcrpyt.compare(p, hash);

const deleteAccount = async (e: string): Promise<object> =>
  await Client.deleteOne({ email: e });

export default {
  fetchMessages,
  storeMessage,
  comparePasswords,
  deleteAccount,
};
