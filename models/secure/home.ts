import bcrpyt from 'bcrypt';
import ClientSchema from '../../schema/Client';
import MessageSchema from '../../schema/Message';
import queries from '../../helpers/queries/queries';
import email from '../../email/skeleton';
import BlacklistedSchema from '../../schema/blacklistedEmail';

type QueryResult = Promise<object | void>;

const fetchMessages = async (): QueryResult =>
  await queries.findAll(MessageSchema);

interface Message {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
}

const storeMessage = async (c: string, client: Message): QueryResult =>
  await queries.create(MessageSchema, {
    email: client.email,
    firstName: client.firstName,
    lastName: client.lastName,
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
  console.log(true);
  const clients: any = { ...(await fetchClients()) };
  for (const client in clients!) {
    const notificationEmails: string[] = clients[client].notifications || [];

    for (const e of notificationEmails) {
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

const findClient = async (e: string): Promise<object | void> =>
  await queries.findOne({
    schema: ClientSchema,
    filterProperty: 'email',
    filterValue: e,
  });

const isClientAdmin = async (e: string): Promise<boolean> => {
  const client = await queries.findOne({
    schema: ClientSchema,
    filterProperty: 'email',
    filterValue: e,
  });

  return client.isAdmin;
};

const deleteChatMessage = async (id: string): QueryResult =>
  await queries.deleteEntries({
    schema: MessageSchema,
    filterProperty: '_id',
    filterValue: id,
  });

const blacklistClient = async (
  e: string,
  fn: string,
  ln: string
): Promise<object | void> => {
  console.log('in here');
  return await queries.create(BlacklistedSchema, {
    email: e,
    firstName: fn,
    lastName: ln,
  });
};

const fetchAllAdmins = async (): QueryResult =>
  await queries.findAll(ClientSchema, {
    filterProperty: 'isAdmin',
    filterValue: true,
  });

const fetchBlacklistedEmails = async (): QueryResult =>
  await queries.findAll(BlacklistedSchema);

const isEmailBlacklisted = async (e: string): QueryResult =>
  await queries.findOne({
    schema: BlacklistedSchema,
    filterProperty: 'email',
    filterValue: e,
  });

const removeBlacklistedEmail = async (e: string): QueryResult =>
  await queries.deleteEntries({
    schema: BlacklistedSchema,
    filterProperty: 'email',
    filterValue: e,
  });

const updateAdminStatus = async (e: string, isAdmin: boolean): QueryResult =>
  await queries.updateOne(
    {
      schema: ClientSchema,
      filterProperty: 'email',
      filterValue: e,
    },
    'isAdmin',
    isAdmin
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
  deleteChatMessage,
  fetchAllAdmins,
  findClient,
  fetchBlacklistedEmails,
  isEmailBlacklisted,
  updateAdminStatus,
  removeBlacklistedEmail,
  blacklistClient,
};
