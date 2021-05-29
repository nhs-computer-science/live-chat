"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Attendance_1 = __importDefault(require("../../schema/Attendance"));
const redirection_1 = __importDefault(require("../../util/redirection"));
const generateToken_1 = __importDefault(require("../../util/generateToken"));
const DATABASE_ERROR_URL = (BASE_URL) => `${BASE_URL}/?serverSideError=yes`;
let emailInUse;
let createAttendanceToken;
emailInUse = async (e, BASE_URL, r) => await Attendance_1.default.findOne({ email: e }).catch((e) => {
    redirection_1.default(r, DATABASE_ERROR_URL(BASE_URL), e);
});
createAttendanceToken = async (e, BASE_URL, r) => await Attendance_1.default.create({
    token: generateToken_1.default(8),
    email: e,
    fall2021Meetings: 0,
}).catch((e) => {
    redirection_1.default(r, DATABASE_ERROR_URL(BASE_URL), e);
});
const retrieveEmailSubject = () => `Attendance Token Created!`;
const retrieveEmailBody = (t) => `This is an automated response, so please do not respond to this email. Your attendance token is ${t.toString()}. Do not share this information with anyone.`;
exports.default = {
    emailInUse,
    createAttendanceToken,
    retrieveEmailSubject,
    retrieveEmailBody,
};
