"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_1 = __importDefault(require("../../models/attendance/attendance"));
const redirection_1 = __importDefault(require("../../util/redirection"));
const getAttendancePage = (req, res) => { };
const postAttendancePage = async (req, res) => {
    const BASE_URL = '/attendance/';
    const QUERY_VALUE = '=yes';
    if (!process.env.TAKING_ATTENDANCE_SUBMISSIONS) {
        return redirection_1.default(res, `${BASE_URL}?notTakingAttendance${QUERY_VALUE}`); // TODO Error Path
    }
    const t = req.body.token.trim();
    const token = await attendance_1.default.authenticateToken(t, BASE_URL, res);
    if (token) {
        if (token.fall2021Meetings + 1 > process.env.FALL_2021_MEETINGS) {
            return redirection_1.default(res, `${BASE_URL}?tooManyMeetings${QUERY_VALUE}`); // TODO Error Path
        }
        if (await attendance_1.default.updateAttendance(t, BASE_URL, token.fall2021Meetings, res)) {
            redirection_1.default(res, `${BASE_URL}?attendanceUpdated${QUERY_VALUE}`); // TODO Success Path
        }
    }
    else {
        redirection_1.default(res, `${BASE_URL}?tokenInvalid${QUERY_VALUE}`);
    }
};
exports.default = {
    getAttendancePage,
    postAttendancePage,
};
