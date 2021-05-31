import Express from 'express';
const Router = Express.Router();

import registerController from '../../controllers/auth/register';

Router.get('/', registerController.getRegisterPage);
Router.post('/', registerController.postRegisterPage);

export default Router;
