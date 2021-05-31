"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendanceToken_1 = __importDefault(require("../../models/attendance/attendanceToken"));
const skeleton_1 = __importDefault(require("../../email/skeleton"));
const serverSideError_1 = __importDefault(require("../../util/serverSideError"));
const getAttendanceTokenPage = (req, res) => {
    res.render('attendance/attendance-token', {
        notStudentEmail: req.query.notStudentEmail === 'yes' ? true : false,
        isEmailInUse: req.query.isEmailInUse === 'yes' ? true : false,
        attendanceTokenSent: req.query.attendanceTokenSent === 'yes' ? true : false,
    });
};
const postAttendanceTokenPage = async (req, res) => {
    const e = req.body.email.trim();
    const URL = '/attendance-token/';
    const QUERY_VALUE = '=yes';
    if (e.split('@')[1] !== 'student.gn.k12.ny.us') {
        return res.redirect(`${URL}?notStudentEmail${QUERY_VALUE}`);
    }
    if (await attendanceToken_1.default.emailInUse(e)) {
        return res.redirect(`${URL}?isEmailInUse${QUERY_VALUE}`);
    }
    const tokenModel = await attendanceToken_1.default.createAttendanceToken(e, res, URL);
    const attendanceEmailTokenSent = await skeleton_1.default(e, attendanceToken_1.default.retrieveEmailSubject(), attendanceToken_1.default.retrieveEmailBody(tokenModel.token)).catch((e) => {
        console.log(e);
        return serverSideError_1.default(res, URL);
    });
    if (attendanceEmailTokenSent) {
        res.redirect(`${URL}?attendanceTokenSent${QUERY_VALUE}`);
    }
};
exports.default = {
    getAttendanceTokenPage,
    postAttendanceTokenPage,
};
