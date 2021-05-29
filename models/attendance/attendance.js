"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Attendance_1 = __importDefault(require("../../schema/Attendance"));
const redirection_1 = __importDefault(require("../../util/redirection"));
const DATABASE_ERROR_URL = (BASE_URL) => `${BASE_URL}?serverSideError=yes`;
let authenticateToken;
authenticateToken = async (t, BASE_URL, r) => await Attendance_1.default.findOne({ token: t }).catch((e) => redirection_1.default(r, DATABASE_ERROR_URL(BASE_URL), e));
const updateAttendance = async (t, BASE_URL, r, m) => await Attendance_1.default.updateOne({ token: t }, { fall2021Meetings: m + 1 }).catch((e) => redirection_1.default(r, DATABASE_ERROR_URL(BASE_URL), e));
exports.default = {
    authenticateToken,
    updateAttendance,
};
