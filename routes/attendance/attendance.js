"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const attendance_1 = __importDefault(require("../../controllers/attendance/attendance"));
Router.get('/', attendance_1.default.getAttendancePage);
Router.post('/', attendance_1.default.postAttendancePage);
exports.default = Router;