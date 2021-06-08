import ClientSchema from '../../schema/Client';
import queries from '../../helpers/queries/queries';
import bcrypt from 'bcrypt';
import EmailConfirmationTokenSchema from '../../schema/EmailConfirmationToken';

type QueryResult = Promise<object | void>;

const emailExists = async (e: string): QueryResult =>
  await queries.findOne({
    schema: ClientSchema,
    filterProperty: 'email',
    filterValue: e,
  });

const create = async (payload: object): QueryResult =>
  await queries.create(EmailConfirmationTokenSchema, payload);

const storeToken = async (e: string, t: string): QueryResult =>
  await create({ email: e, token: t });

const compareTokens = async (t: string): QueryResult =>
  await create({ token: t });

const changePassword = async (p: string, e: string): QueryResult =>
  await queries.updateOne(
    { schema: ClientSchema, filterProperty: 'email', filterValue: e },
    'password',
    await bcrypt.hash(p, 10)
  );

export default {
  emailExists,
  storeToken,
  compareTokens,
  changePassword,
};
