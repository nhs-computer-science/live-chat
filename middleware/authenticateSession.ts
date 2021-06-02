import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.client) {
    next();
  } else {
    console.log(false);
    res.redirect('/register');
  }
};
