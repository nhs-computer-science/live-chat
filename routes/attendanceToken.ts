import Express from 'express';
const Router = Express.Router();

import attendanceTokenController from '../controllers/attendance/attendanceToken';

Router.get('/', attendanceTokenController.getAttendanceTokenPage);

export default Router;