import { Request, Response } from 'express';

import homeModel from '../../models/secure/home';
import date from '../../util/date';
import filterMessage from '../../util/filterMessage';

const getHomePage = async (req: Request, res: Response) => {
  const messages = [...(await homeModel.fetchMessages())];
  messages.forEach((message) => {
    const m = { ...message };
    m._doc._id = 5;
  });

  res.render('secure/home', {
    messages: await homeModel.fetchMessages(),
    filterMessage,
    date,
    email: req.session.client.email,
    password: req.session.client.password,
  });
};

const postHomePage = (req: Request, res: Response) => {
  if (!req.session || !req.session.client) {
    return res.redirect('/regsiter/?serverSideError=yes');
  }

  let data: string = '';

  req.on('data', (chunk: Buffer): void => {
    data += chunk;
  });
  req.on('end', async (): Promise<void> => {
    const payload: object = JSON.parse(data);

    if (payload.hasOwnProperty('password')) {
      const passwordsMatch = await homeModel.comparePasswords(
        payload.password,
        req.session.client.password,
        res
      );
      ``;
      if (passwordsMatch) {
        const accountDeleted = await homeModel.deleteAccount(
          req.session.client.email
        );

        res.send(true);
      } else {
        res.send(false);
      }
    } else if (payload.hasOwnProperty('chat')) {
      if (await homeModel.storeMessage(payload.chat, req, res)) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    }
  });
};

export default {
  getHomePage,
  postHomePage,
};
