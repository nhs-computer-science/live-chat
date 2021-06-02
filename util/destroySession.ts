import { Request } from 'express';
import { SessionData } from 'express-session';

export default (r: Request, cb: Function): Partial<SessionData> =>
  r.session.destroy((): void => cb());
