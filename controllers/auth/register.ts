import { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

import registerModel from '../../models/authentication/register';
import generateToken from '../../util/generateToken';
import email from '../../email/skeleton';
import serverSideError from '../../util/serverSideError';
import destroySession from '../../util/destroySession';

dotenv.config({ path: path.join(__dirname, '../', 'env', '.env') });

const getRegisterPage = async (req: Request, res: Response) => {
  res.render('auth/register', {
    notStudentEmail: req.query.notStudentEmail === 'yes' ? true : false,
    emailInUse: req.query.emailInUse === 'yes' ? true : false,
    notRealFirstName: req.query.notRealFirstName === 'yes' ? true : false,
    notRealLastName: req.query.notRealLastName === 'yes' ? true : false,
    passwordsNotMatching:
      req.query.passwordsNotMatching === 'yes' ? true : false,
    confirmationTokenSent:
      req.query.confirmationTokenSent === 'yes' ? true : false,
    invalidToken: req.query.invalidToken == 'yes' ? true : false,
    accountCreated: req.query.accountCreated === 'yes' ? true : false,
    serverSideError: req.query.serverSideError === 'yes' ? true : false,
  });
};

const postRegisterPage = async (req: Request, res: Response) => {
  const payload: object = req.body;

  if (
    payload.email ||
    (payload.email && typeof req.session.tentativeClient === 'object')
  ) {
    req.session.tentativeClient = 'none';
  }

  const URL: string = '/register/';
  const QUERY_VALUE: string = '=yes';

  if (req.session.tentativeClient === 'none') {
    if (!registerModel.hasStudentEmail(payload.email)) {
      return res.redirect(`${URL}?notStudentEmail${QUERY_VALUE}`);
    }

    if (!registerModel.isFirstNameReal(payload.firstName, payload.email)) {
      return res.redirect(`${URL}?notRealFirstName${QUERY_VALUE}`);
    }

    if (!registerModel.isLastNameReal(payload.lastName, payload.email)) {
      return res.redirect(`${URL}?notRealLastName${QUERY_VALUE}`);
    }

    if (
      !registerModel.doPasswordsMatch(payload.password, payload.passwordConf)
    ) {
      return res.redirect(`${URL}?passwordsNotMatching${QUERY_VALUE}`);
    }

    const isEmailInUse = await registerModel.isEmailInUse(payload.email.trim());

    if (isEmailInUse) {
      return res.redirect(`${URL}?emailInUse${QUERY_VALUE}`);
    }

    const confEmailToken = generateToken(8);
    const confEmailSent = await email(
      payload.email,
      'Email Confirmation',
      `Token: ${confEmailToken.toString()}`
    );

    if (confEmailSent) {
      req.session.tentativeClient = payload;
      const tokenStored = await registerModel.storeConfEmailToken(
        payload.email,
        confEmailToken,
        URL,
        res
      );

      if (tokenStored) {
        return res.redirect(`${URL}?confirmationTokenSent${QUERY_VALUE}`);
      }
    }
  }

  const verifyToken = await registerModel.verifyToken(payload.token);
  if (verifyToken && verifyToken.email === req.session.tentativeClient.email) {
    const hashedPassword = await registerModel.hashPassword(
      req.session.tentativeClient.password,
      10,
      URL,
      res
    );

    if (hashedPassword) {
      Reflect.deleteProperty(req.session.tentativeClient, 'passwordConf');
      Reflect.deleteProperty(req.session.tentativeClient, 'password');

      req.session.tentativeClient.password = hashedPassword;

      if (
        await registerModel.createAccount(req.session.tentativeClient, URL, res)
      ) {
        if (
          await email(
            process.env.NODEMAILER_USER!,
            'Someone Created an Account!',
            JSON.stringify(req.session.tentativeClient)
          )
        ) {
          destroySession(req, (): void => {
            res.redirect(`${URL}?accountCreated${QUERY_VALUE}`);
          });
        }
      }
    } else {
      serverSideError(res, URL);
    }
  } else {
    res.redirect(
      `${URL}?invalidToken${QUERY_VALUE}&confirmationTokenSent${QUERY_VALUE}`
    );
  }
};

export default {
  getRegisterPage,
  postRegisterPage,
};
