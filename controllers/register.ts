import { Request, Response } from 'express';
import AttendanceSchema from '../schema/Attendance';

import registerModel from '../models/register';
import redirection from '../util/redirection';

const getRegisterPage = async (req: Request, res: Response) => {
  console.log(555);
  const r = await AttendanceSchema.findOne({
    token: '123456',
    fall2021Meetings: 0,
    email: 'sdf',
  }).catch((e: Error) => console.log(e));
  console.log(r);
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
