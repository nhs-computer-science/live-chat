"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendanceToken_1 = __importDefault(require("../../models/attendance/attendanceToken"));
const skeleton_1 = __importDefault(require("../../email/skeleton"));
const getAttendanceTokenPage = (req, res) => {
    res.render('attendance/attendance-token', {
        notStudentEmail: req.query.notStudentEmail === 'yes' ? true : false,
        isEmailInUse: req.query.isEmailInUse === 'yes' ? true : false,
        attendanceTokenSent: req.query.attendanceTokenSent === 'yes' ? true : false,
    });
};
const postAttendanceTokenPage = async (req, res) => {
    const e = req.body.email.trim();
    const URL = '/attendance-token';
    if (e.split('@')[1] !== 'student.gn.k12.ny.us') {
        return res.redirect(`${URL}/?notStudentEmail=yes`);
    }
    if (await attendanceToken_1.default.emailInUse(e, URL, res)) {
        return res.redirect(`${URL}/?isEmailInUse=yes`);
    }
    const tokenModel = await attendanceToken_1.default.createAttendanceToken(e, URL, res);
    if (tokenModel) {
        const attendanceEmailTokenSent = await skeleton_1.default(e, attendanceToken_1.default.retrieveEmailSubject(), attendanceToken_1.default.retrieveEmailBody(tokenModel.token));
        if (attendanceEmailTokenSent) {
            res.redirect(`${URL}/?attendanceTokenSent=yes`);
        }
    }
};
exports.default = {
    getAttendanceTokenPage,
    postAttendanceTokenPage,
};
