import Express from 'express';
const Router = Express.Router();

import passwordResetController from '../../controllers/auth/password-reset';

Router.get('/', passwordResetController.getPasswordResetPage);
Router.post('/', passwordResetController.postPasswordResetPage);

export default Router;
