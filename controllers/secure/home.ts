import { Request, Response } from 'express';

import homeModel from '../../models/secure/home';
import date from '../../helpers/date/date';
import chatFilter from '../../helpers/chatFilter/chatFilter';
import dotenv from 'dotenv';
import email from '../../email/skeleton';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../env/.env') });

const getHomePage = async (req: Request, res: Response) => {
  console.log(req.session.client);
  const session = req.session.client;
  res.render('secure/home', {
    blacklistedEmails:
      req.session.client.isAdmin ||
      (await homeModel.isClientAdmin(session.email))
        ? await homeModel.fetchBlacklistedEmails()
        : [],
    isAdmin: await homeModel.isClientAdmin(session.email),
    messages: await homeModel.fetchMessages(),
    clients: await homeModel.fetchClients(),
    admins: await homeModel.fetchAllAdmins(),
    adminPassword: req.session.client.isAdmin
      ? process.env.ADMIN_TOKEN
      : 'Nice Try',
    password: session.password,
    email: session.email,
    notificationsUnavailable: process.env.NOTIFICATIONS_UNAVAILABLE,
    chatFilter,
    date,
  });
};

const postHomePage = (req: Request, res: Response) => {
  console.log(req.file);
  if (!req.session || !req.session.client) {
    return res.redirect('/regsiter/?serverSideError=yes');
  }
  let data: string = '';
  req.on('data', (chunk: Buffer): void => {
    data += chunk;
  });

  req.on('end', async (): Promise<void> => {
    const payload: Payload = JSON.parse(data);
    if (payload.hasOwnProperty('password')) {
      deleteAccount(payload.password!, req, res);
    } else if (payload.hasOwnProperty('chat')) {
      storeChatMessage(payload.chat!, req, res);
    } else if (payload.hasOwnProperty('notificationEmails')) {
      updateNotifications(payload.notificationEmails!, req, res);
    } else if (payload.hasOwnProperty('chatMessageId')) {
      deleteChat(payload.chatMessageId!, res);
    } else if (payload.hasOwnProperty('blacklistedEmail')) {
      blacklistEmail(payload.blacklistedEmail!, res);
    } else if (payload.hasOwnProperty('blacklistedEmailRemoval')) {
      removeBlacklistedEmail(payload.blacklistedEmailRemoval!, res);
    } else if (payload.hasOwnProperty('image')) {
      console.log(payload.image);
    } else if (payload.hasOwnProperty('removeAdminStatus')) {
      updateAdminStatus(null, req, res, true);
    } else {
      updateAdminStatus(payload.adminToken!, req, res);
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
  const storeMsg = await homeModel.storeMessage(c, req.session.client);
  if (!(await homeModel.isEmailBlacklisted(e)) && storeMsg) {
    if (!process.env.NOTIFICATIONS_UNAVAILABLE) {
      homeModel.sendNotifications(e, c);
    }

    res.send({
      status: true,
      client: req.session.client,
      createdAt: storeMsg.createdAt,
      isAdmin: await homeModel.isClientAdmin(req.session.client.email),
      id: storeMsg._id,
    });
    // } else {
    //   res.send(false);
    // }
  }

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

  const deleteChat = async (id: string, res: Response): Promise<void> => {
    if (await homeModel.deleteChatMessage(id)) {
      res.send(true);
    } else {
      res.send(false);
    }
  };

  const blacklistEmail = async (e: string, res: Response): Promise<void> => {
    const client = { ...(await homeModel.findClient(e)) };
    if (
      JSON.stringify(client) === '{}' ||
      (await homeModel.isEmailBlacklisted(e))
    ) {
      res.send(false);
    } else {
      if (
        await homeModel.blacklistClient(
          client._doc.email,
          client._doc.firstName,
          client._doc.lastName
        )
      ) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  };

  const removeBlacklistedEmail = async (
    e: string,
    res: Response
  ): Promise<void> => {
    if (await homeModel.removeBlacklistedEmail(e)) {
      res.send(true);
    } else {
      res.send(false);
    }
  };

  const updateAdminStatus = async (
    t: string | null,
    req: Request,
    res: Response,
    removeAdmin?: boolean
  ): Promise<void> => {
    const e = req.session.client.email;

    if (removeAdmin) {
      await homeModel
        .updateAdminStatus(e, false)
        .catch((): Response<void> => res.send(false));
      res.send(true);
    } else {
      if (t === process.env.ADMIN_TOKEN) {
        await homeModel.updateAdminStatus(e, true);
        res.send(true);
      } else {
        await email(
          process.env.NODEMAILER_USER!,
          'Someone Failed to Authenticate as Admin!',
          `Client: ${e}`
        );
        res.send(false);
      }
    }
  };
};

export default {
  getHomePage,
  postHomePage,
};
