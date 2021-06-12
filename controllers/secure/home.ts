import { Request, Response } from 'express';

import homeModel from '../../models/secure/home';
import date from '../../helpers/date/date';
import chatFilter from '../../helpers/chatFilter/chatFilter';
import dotenv from 'dotenv';
import email from '../../email/skeleton';
import path from 'path';
import { resolveSoa } from 'node:dns';

dotenv.config({ path: path.join(__dirname, '../env/.env') });

const getHomePage = async (req: Request, res: Response) => {
  const session = req.session.client;
  res.render('secure/home', {
    isAdmin: await homeModel.isClientAdmin(session.email),
    messages: await homeModel.fetchMessages(),
    clients: await homeModel.fetchClients(),
    admins: await homeModel.fetchAllAdmins(),
    adminPassword: req.session.client.isAdmin
      ? process.env.ADMIN_TOKEN
      : 'Nice Try',
    password: session.password,
    email: session.email,
    chatFilter,
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
    const payload: object = JSON.parse(data);

    if (payload.hasOwnProperty('password')) {
      deleteAccount(payload.password, req, res);
    } else if (payload.hasOwnProperty('chat')) {
      storeChatMessage(payload.chat, req, res);
    } else if (payload.hasOwnProperty('notificationEmails')) {
      updateNotifications(payload.notificationEmails, req, res);
    } else if (payload.hasOwnProperty('chatMessageId')) {
      deleteChat(payload.chatMessageId, res);
    } else {
      updateAdminStatus(payload.adminToken, req, res);
    }
  });
};

const deleteAccount = async (
  p: string,
  req: Request,
  res: Response
): Promise<void> => {
  if (await homeModel.comparePasswords(p, req.session.client.password)) {
    await homeModel.deleteAccount(req.session.client.email);
    res.send(true);
  } else {
    res.send(false);
  }
};

const storeChatMessage = async (
  c: string,
  req: Request,
  res: Response
): Promise<void> => {
  const e: string = req.session.client.email;
  if (await homeModel.storeMessage(c, e)) {
    homeModel.sendNotifications(e, c);
    res.send(true);
  } else {
    res.send(false);
  }
};

const updateNotifications = async (
  e: string[],
  req: Request,
  res: Response
): Promise<void> => {
  if (await homeModel.updateNotifications(req.session.client.email, e)) {
    res.send(true);
  } else {
    res.send(false);
  }
};

const deleteChat = async (id: string, res: Response) => {
  if (await homeModel.deleteChatMessage(id)) {
    res.send(true);
  } else {
    res.send(false);
  }
};

const updateAdminStatus = async (
  t: string,
  req: Request,
  res: Response
): Promise<void> => {
  const e = req.session.client.email;
  if (t === process.env.ADMIN_TOKEN) {
    await homeModel.updateAdminStatus(e);
    res.send(true);
  } else {
    await email(
      process.env.NODEMAILER_USER!,
      'Someone Failed to Authenticate as Admin!',
      `Client: ${e}`
    );
    res.send(false);
  }
};

export default {
  getHomePage,
  postHomePage,
};
