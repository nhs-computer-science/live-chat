import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session || !req.session.client) {
    res.redirect('/register');
  } else {
    next();
  }
}
