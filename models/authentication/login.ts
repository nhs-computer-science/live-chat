import ClientSchema from '../../schema/Client';
import queries from '../../helpers/queries/queries';
import bcrypt from 'bcrypt';

const accountExists = async (
  e: string,
  p: string
): Promise<boolean | object> => {
  const account = await queries.findOne({
    schema: ClientSchema,
    filterProperty: 'email',
    filterValue: e,
  });

  if (!account || !(await bcrypt.compare(p, account.password))) {
    return false;
  } else {
    return account;
  }
};

export default {
  accountExists,
};
