import { Request, Response } from 'express';

const getHomePage = async (req: Request, res: Response) => {
  res.render('secure/home', {});
};

export default {
  getHomePage,
};
