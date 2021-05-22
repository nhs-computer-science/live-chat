import Express from 'express';
const Router = Express.Router();

import attendanceController from '../controllers/attendance/attendance';

Router.get('/', attendanceController.getAttendancePage);

export default Router;