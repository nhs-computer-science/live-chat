import Express from 'express';
const Router = Express.Router();

import attendanceTokenController from '../../controllers/attendance/attendanceToken';

Router.get('/', attendanceTokenController.getAttendanceTokenPage);
Router.post('/', attendanceTokenController.postAttendanceTokenPage);

export default Router;
