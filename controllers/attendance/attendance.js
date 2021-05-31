"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../', '../', './env', '.env') });
const attendance_1 = __importDefault(require("../../models/attendance/attendance"));
const skeleton_1 = __importDefault(require("../../email/skeleton"));
const serverSideError_1 = __importDefault(require("../../util/serverSideError"));
const getAttendancePage = (req, res) => {
    res.render('attendance/attendance', {
        notTakingAttendance: req.query.notTakingAttendance == 'yes' ? true : false,
        invalidToken: req.query.invalidToken === 'yes' ? true : false,
        meetingOverflow: req.query.meetingOverflow == 'yes' ? true : false,
        attendanceUpdated: req.query.attendanceUpdated == 'yes' ? true : false,
        date: process.env.CURRENT_DATE,
    });
};
const postAttendancePage = async (req, res) => {
    const URL = '/attendance/';
    const QUERY_VALUE = '=yes';
    if (process.env.TAKING_ATTENDANCE_SUBMISSIONS === 'no') {
        return res.redirect(`${URL}?notTakingAttendance${QUERY_VALUE}`);
    }
    const t = req.body.token.trim();
    const token = await attendance_1.default.authenticateToken(t);
    if (token) {
        if (parseInt(token.fall2021MeetingsAttended) + 1 >
            parseInt(process.env.FALL_2021_MEETINGS)) {
            return res.redirect(`${URL}?meetingOverflow${QUERY_VALUE}`);
        }
        else if (await attendance_1.default.updateAttendance(t, token.fall2021MeetingsAttended)) {
            const emailSent = await skeleton_1.default(process.env.NODEMAILER_USER, 'Attendance Submitted!', `${token.email} submitted his or her attendance!`);
            if (emailSent) {
                res.redirect(`${URL}?attendanceUpdated${QUERY_VALUE}`);
            }
        }
        else {
            serverSideError_1.default(res, URL);
        }
    }
    else {
        res.redirect(`${URL}?invalidToken${QUERY_VALUE}`);
    }
};
exports.default = {
    getAttendancePage,
    postAttendancePage,
};
