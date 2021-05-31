import { Response } from 'express';
import bcrpyt from 'bcrypt';

import ClientSchema from '../../schema/ClientSchema';
import serverSideError from '../../util/serverSideError';

const accountExists = async (
  e: string,
  p: string,
  r: Response,
  URL: string
): Promise<boolean | object> => {
  const account = await ClientSchema.findOne({ email: e });
  if (!account) {
    return false;
  } else {
    const passwordsMatch = await bcrpyt
      .compare(p, account.password)
      .catch((e: Error): void => {
        console.log(e);
        serverSideError(r, URL);
      });

    if (passwordsMatch) {
      return account;
    } else {
      return false;
    }
  }
};

export default {
  accountExists,
};
