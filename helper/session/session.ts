import { Request } from 'express';
import { SessionData } from 'express-session';

const destroySession = (r: Request, cb: Function): Partial<SessionData> =>
  r.session.destroy((): void => cb());

export default {
  destroySession,
};
