"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Attendance_1 = __importDefault(require("../../schema/Attendance"));
const queries_1 = __importDefault(require("../../helpers/queries/queries"));
const authenticateToken = async (t) => await queries_1.default.findOne({
    schema: Attendance_1.default,
    filterProperty: 'token',
    filterValue: t,
});
const updateAttendance = async (t, m) => await queries_1.default.updateOne({ schema: Attendance_1.default, filterProperty: 'token', filterValue: t }, 'fall2021MeetingsAttended', m + 1);
exports.default = {
    authenticateToken,
    updateAttendance,
};
