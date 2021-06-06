"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Attendance_1 = __importDefault(require("../../schema/Attendance"));
const authenticateToken = async (t) => await Attendance_1.default.findOne({ token: t });
const updateAttendance = async (t, m) => await Attendance_1.default.updateOne({ token: t }, { fall2021MeetingsAttended: m + 1 });
exports.default = {
    authenticateToken,
    updateAttendance,
};
