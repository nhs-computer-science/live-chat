import { Response } from 'express';

export default (r: Response, BASE_URL: string): void =>
  r.status(404).redirect(`${BASE_URL}/?serverSideError=yes`);
