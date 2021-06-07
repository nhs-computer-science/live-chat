import bcrypt from 'bcrypt';

type BcryptResult = Promise<string | null | boolean>;

const hash = async (password: string, saltRounds: number): BcryptResult =>
  await bcrypt.hash(password, saltRounds);

const compareHash = async (password: string, hash: string): BcryptResult =>
  await bcrypt.compare(password, hash);

export default {
  hash,
  compareHash,
};
