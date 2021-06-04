import { Request, Response } from 'express';

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

export default {
  fetchMessages,
  storeMessage,
};
