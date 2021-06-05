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
    if (await homeModel.storeMessage(JSON.parse(data), req, res)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

export default {
  getHomePage,
  postHomePage,
};
