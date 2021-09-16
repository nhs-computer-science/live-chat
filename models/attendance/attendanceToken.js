"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const Attendance_1 = __importDefault(require("../../schema/Attendance"));
const token_1 = __importDefault(require("../../helpers/token/token"));
const queries_1 = __importDefault(require("../../helpers/queries/queries"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../', '../', './env', '.env') });
const emailInUse = async (e) => await queries_1.default.findOne({
    schema: Attendance_1.default,
    filterProperty: 'email',
    filterValue: e,
});
const createAttendanceToken = async (e) => await queries_1.default.create(Attendance_1.default, {
    token: token_1.default(8),
    email: e,
    fall2021MeetingsAttended: 0,
});
const retrieveEmailSubject = () => `Attendance Token Created!`;
const retrieveEmailBody = (t) => `This is an automated response, so please do not respond to this email. Your attendance token is ${t.toString()}. Do not share this information with anyone.`;
exports.default = {
    emailInUse,
    createAttendanceToken,
    retrieveEmailSubject,
    retrieveEmailBody,
};
