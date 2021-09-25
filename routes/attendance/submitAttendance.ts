import Express from 'express';
const Router = Express.Router();

import attendanceController from '../../controllers/attendance/submitAttendance';

Router.get('/', attendanceController.getAttendancePage);
Router.post('/', attendanceController.postAttendancePage);

export default Router;
