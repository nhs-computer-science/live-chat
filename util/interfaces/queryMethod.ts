import { Response } from 'express';

type QueryResult = Promise<object | null>;

export default interface findOne {
  (a: any, BASE_URL: string, response: Response): QueryResult;
}
