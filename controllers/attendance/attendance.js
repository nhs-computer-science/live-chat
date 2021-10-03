"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const attendance_1 = __importDefault(require("../../models/attendance/attendance"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../', '../', './env', '.env') });
const getAttendancePage = async (req, res) => {
    res.render('attendance/attendance', {
        members: req.query.searchText
            ? (await attendance_1.default.retrieveAllAttendances()).filter((obj) => obj.email.toUpperCase() === req.query.searchText.toUpperCase())
            : null,
        searchText: req.query.searchText || false,
        fall2021Meetings: process.env.FALL_2021_MEETINGS,
    });
};
const postAttendancePage = (req, res) => {
    res.redirect(`/attendance/?searchText=${req.body.member}`);
};
exports.default = {
    getAttendancePage,
    postAttendancePage,
};
