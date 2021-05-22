import { Response } from 'express';

export default (
  res: Response,
  path: string,
  e?: Error,
  statusCode?: number
): void => {
  if (e) {
    console.log(e.message || e);
  }

  !statusCode
    ? res.sendStatus(200).redirect(path)
    : res.sendStatus(statusCode).redirect(path);
};
