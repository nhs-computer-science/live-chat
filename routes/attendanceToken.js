"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const attendanceToken_1 = __importDefault(require("../controllers/attendance/attendanceToken"));
Router.get('/', attendanceToken_1.default.getAttendanceTokenPage);
Router.post('/', attendanceToken_1.default.postAttendanceTokenPage);
exports.default = Router;
