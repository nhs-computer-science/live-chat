import Express from 'express';
const Router = Express.Router();

import homeController from '../../controllers/secure/home';

Router.get('/', homeController.getHomePage);
Router.post('/', homeController.postHomePage);

export default Router;
