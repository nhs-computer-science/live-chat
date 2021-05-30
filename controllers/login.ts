import { Request, Response } from 'express';

const getLoginPage = async (req: Request, res: Response) => {
  res.render('login');
};

const postLoginPage = async (req: Request, res: Response) => {};

export default {
  getLoginPage,
  postLoginPage,
};
