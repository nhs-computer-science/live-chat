"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendanceToken_1 = __importDefault(require("../../models/attendance/attendanceToken"));
const redirection_1 = __importDefault(require("../../util/redirection"));
const skeleton_1 = __importDefault(require("../../email/skeleton"));
const getAttendanceTokenPage = (req, res) => { };
const postAttendanceTokenPage = async (req, res) => {
    const halves = req.body.email.trim().split('@');
    const e = halves[0] + halves[1];
    const BASE_URL = '/attendanceToken/';
    const QUERY_VALUE = '=yes';
    if (isNaN(halves[0].charAt(halves[0].length - 1)) ||
        halves[1] !== 'student.gn.k12.ny.us') {
        return redirection_1.default(res, `${BASE_URL}?passwordsNotMatching${QUERY_VALUE}`); // TODO Error Path
    }
    if (await attendanceToken_1.default.emailInUse(e, BASE_URL, res)) {
        return redirection_1.default(res, `${BASE_URL}?emailInUse${QUERY_VALUE}`); // TODO Error Path
    }
    const tokenModel = await attendanceToken_1.default.createAttendanceToken(e, BASE_URL, res);
    if (tokenModel) {
        const attendanceEmailTokenSent = await skeleton_1.default(e, attendanceToken_1.default.retrieveEmailSubject(), attendanceToken_1.default.retrieveEmailBody(tokenModel.token));
        if (attendanceEmailTokenSent) {
            redirection_1.default(res, `${BASE_URL}?emailSent${QUERY_VALUE}`); // TODO Success Path
        }
    }
};
exports.default = {
    getAttendanceTokenPage,
    postAttendanceTokenPage,
};
