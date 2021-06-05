"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const Attendance_1 = __importDefault(require("../../schema/Attendance"));
const generateToken_1 = __importDefault(require("../../util/generateToken"));
const serverSideError_1 = __importDefault(require("../../util/serverSideError"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../', '../', './env', '.env') });
const emailInUse = async (e) => await Attendance_1.default.findOne({ email: e });
const createAttendanceToken = async (e, r, BASE_URL) => await Attendance_1.default.create({
    token: generateToken_1.default(8),
    email: e,
    fall2021MeetingsAttended: 0,
}).catch((e) => {
    console.log(e);
    serverSideError_1.default(r, BASE_URL);
});
const retrieveEmailSubject = () => `Attendance Token Created!`;
const retrieveEmailBody = (t) => `This is an automated response, so please do not respond to this email. Your attendance token is ${t.toString()}. Do not share this information with anyone.`;
exports.default = {
    emailInUse,
    createAttendanceToken,
    retrieveEmailSubject,
    retrieveEmailBody,
};
