import { Response } from 'express';

import ClientSchema from '../schema/ClientSchema';
import redirection from '../util/redirection';

type MongooseQueryResult = Promise<object | null>;

const DATABASE_ERROR_URL = (BASE_URL: string): string => `${BASE_URL}?databaseError=yes`;

const isEmailInUse = async (e: string, BASE_URL: string, r: Response): MongooseQueryResult =>
  await ClientSchema.findOne({ e }).catch(
    (e: Error): void => redirection(r, DATABASE_ERROR_URL(BASE_URL), e)
  );

const createClient = async (
  payload: object,
  BASE_URL: string,
  r: Response
): MongooseQueryResult =>
  await ClientSchema.create({ payload }).catch(
    (e: Error): void => redirection(r, DATABASE_ERROR_URL(BASE_URL), e)
  );

const doPasswordsMatch = (p1: string, p2: string): boolean =>
  p1.trim() === p2.trim();

export default {
  isEmailInUse,
  doPasswordsMatch,
  createClient,
};
