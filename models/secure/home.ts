import bcrpyt from 'bcrypt';

import ClientSchema from '../../schema/Client';
import MessageSchema from '../../schema/Message';
import queries from '../../helpers/queries/queries';
import email from '../../email/skeleton';

type QueryResult = Promise<object | void>;

const fetchMessages = async (): QueryResult =>
  await queries.findAll(MessageSchema);

const storeMessage = async (c: string, e: string): QueryResult =>
  await queries.create(MessageSchema, {
    email: e,
    message: c,
  });

const comparePasswords = async (
  p: string,
  hash: string
): Promise<boolean | void> => await bcrpyt.compare(p, hash);

const deleteAccount = async (e: string): QueryResult =>
  await queries.deleteEntries({
    schema: ClientSchema,
    filterProperty: 'email',
    filterValue: e,
  });

const updateNotifications = async (e: string, emails: string[]): QueryResult =>
  await queries.updateOne(
    { schema: ClientSchema, filterProperty: 'email', filterValue: e },
    'notifications',
    emails
  );

const fetchClients = async (): QueryResult =>
  await queries.findAll(ClientSchema);

const sendNotifications = async (
  senderEmail: string,
  chat: string
): Promise<void> => {
  const clients: any = { ...(await fetchClients()) };
  for (const client in clients!) {
    const notificationEmails: string[] = clients[client].notifications || [];

    for (const e of clients[client].notifications || []) {
      if (e === senderEmail) {
        email(
          clients[client].email,
          `${senderEmail} Sent a Chat`,
          `${senderEmail} chatted: ${chat}`
        );
      }
    }
  }
};

const isClientAdmin = async (e: string): Promise<boolean> => {
  const client = await queries.findOne({
    schema: ClientSchema,
    filterProperty: 'email',
    filterValue: e,
  });

  return client.isAdmin;
};

const updateAdminStatus = async (e: string): QueryResult =>
  await queries.updateOne(
    {
      schema: ClientSchema,
      filterProperty: 'email',
      filterValue: e,
    },
    'isAdmin',
    true
  );

export default {
  fetchMessages,
  storeMessage,
  comparePasswords,
  deleteAccount,
  updateNotifications,
  fetchClients,
  sendNotifications,
  isClientAdmin,
  updateAdminStatus,
};
