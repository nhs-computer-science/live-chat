import { Request, Response } from 'express';

import email from '../../email/skeleton';
import generateToken from '../../util/generateToken';
import passwordResetModel from '../../models/authentication/password-reset';
import { compare } from 'bcrypt';

const getPasswordResetPage = (req: Request, res: Response) => {
  res.render('auth/password-reset', {
    emailDoesNotExist: req.query.emailDoesNotExist === 'yes' ? true : false,
    tokenSent: req.query.tokenSent === 'yes' ? true : false,
    invalidToken: req.query.invalidToken === 'yes' ? true : false,
    validToken: req.query.validToken === 'yes' ? true : false,
    passwordChanged: req.query.passwordChanged === 'yes' ? true : false,
  });
};

const postPasswordResetPage = async (req: Request, res: Response) => {
  const payload: object = { ...req.body };

  const URL: string = '/password-reset/?';
  const QUERY_VALUE: string = '=yes';

  if (payload.hasOwnProperty('email')) {
    if (await passwordResetModel.emailExists(payload.email)) {
      req.session.tentativeClient = { clientEmail: payload.email };

      const token = generateToken(8);

      await passwordResetModel.storeToken(
        req.session.tentativeClient.clientEmail,
        token
      );

      await email(
        req.session.tentativeClient.clientEmail,
        'Email Confirmation Token',
        `Token: ${token}`
      );

      res.redirect(`${URL}tokenSent${QUERY_VALUE}`);
    } else {
      res.redirect(`${URL}emailDoesNotExist${QUERY_VALUE}`);
    }
  } else if (payload.hasOwnProperty('token')) {
    const compareTokens = await passwordResetModel.compareTokens(payload.token);

    if (!compareTokens) {
      return res.redirect(`${URL}invalidToken${QUERY_VALUE}`);
    }

    if (!req.session.tentativeClient.hasOwnProperty('clientEmail')) {
      return res.redirect(`${URL}serverSideError${QUERY_VALUE}`);
    }

    if (req.session.tentativeClient.clientEmail === compareTokens.email) {
      req.session.tentativeClient.verifiedEmail = compareTokens.email;
      return res.redirect(`${URL}validToken${QUERY_VALUE}`);
    }

    res.redirect(`${URL}serverSideError${QUERY_VALUE}`);
  } else {
    if (req.session.tentativeClient.hasOwnProperty('verifiedEmail')) {
      await passwordResetModel.changePassword(
        payload.password,
        req.session.tentativeClient.verifiedEmail
      );

      req.session.destroy(() => {
        res.redirect(`${URL}passwordChanged${QUERY_VALUE}`);
      });
    } else {
      res.redirect(`${URL}serverSideError${QUERY_VALUE}`);
    }
  }
};

export default {
  getPasswordResetPage,
  postPasswordResetPage,
};
