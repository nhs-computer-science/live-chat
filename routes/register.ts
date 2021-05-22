import Express from 'express';
const Router = Express.Router();

import registerController from '../controllers/register';

Router.get('/', registerController.getRegisterPage);

export default Router;