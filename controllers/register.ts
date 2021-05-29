import { Request, Response } from 'express';

import registerModel from '../models/register';
import redirection from '../util/redirection';
import e from '../email/skeleton';

const getRegisterPage = async (req: Request, res: Response) => {
  const s = await e('akhazzam1@student.gn.k12.ny.us', 'fsfd', '123');
  console.log(s);
  res.send('dfrd');
};

const postRegisterPage = async (req: Request, res: Response) => {
  const payload = req.body;

  const BASE_URL = '/register/';
  const QUERY_VALUE = '=yes';

  if (
    !registerModel.doPasswordsMatch(req.body.password, req.body.confPassword)
  ) {
    return redirection(res, `${BASE_URL}?passwordsNotMatching${QUERY_VALUE}`);
  }

  if (
    !(await registerModel.isEmailInUse(payload.email.trim(), BASE_URL, res))
  ) {
    return redirection(res, `${BASE_URL}?emailInUse${QUERY_VALUE}`);
  }

  Reflect.deleteProperty(payload, 'confPassword');

  if (await registerModel.createClient(payload, BASE_URL, res)) {
    redirection(res, `${BASE_URL}?accountCreated${QUERY_VALUE}`);
  }
};

export default {
  getRegisterPage,
  postRegisterPage,
};
