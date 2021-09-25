"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = __importDefault(require("../../helpers/queries/queries"));
const Attendance_1 = __importDefault(require("../../schema/Attendance"));
const retrieveAllAttendances = async () => {
    const members = await queries_1.default.findAll(Attendance_1.default);
    return members;
};
exports.default = {
    retrieveAllAttendances,
};
