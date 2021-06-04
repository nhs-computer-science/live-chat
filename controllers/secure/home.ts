import { Request, Response } from 'express';

import homeModel from '../../models/secure/home';

const getHomePage = async (req: Request, res: Response) => {
  const messages = [...(await homeModel.fetchMessages())];
  messages.forEach((message) => {
    const m = { ...message };
    m._doc._id = 5;
  });

  res.render('secure/home', {
    chatStored: req.query.chatStored === 'yes' ? true : false,
    messages: await homeModel.fetchMessages(),
  });
};

const postHomePage = async (req: Request, res: Response) => {
  if (await homeModel.storeMessage(req.body.message, req, res)) {
    res.redirect('/home/?chatStored=yes');
  }
};

export default {
  getHomePage,
  postHomePage,
};
