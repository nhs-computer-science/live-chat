import Express from 'express';
const Router = Express.Router();

import loginController from '../controllers/login';

Router.get('/', loginController.getLoginPage);
Router.post('/', loginController.postLoginPage);

export default Router;
