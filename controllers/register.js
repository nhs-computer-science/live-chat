"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Attendance_1 = __importDefault(require("../schema/Attendance"));
const register_1 = __importDefault(require("../models/register"));
const redirection_1 = __importDefault(require("../util/redirection"));
const getRegisterPage = async (req, res) => {
    console.log(555);
    const r = await Attendance_1.default.findOne({
        token: '123456',
        fall2021Meetings: 0,
        email: 'sdf',
    }).catch((e) => console.log(e));
    console.log(r);
};
const postRegisterPage = async (req, res) => {
    const payload = req.body;
    const BASE_URL = '/register/';
    const QUERY_VALUE = '=yes';
    if (!register_1.default.doPasswordsMatch(req.body.password, req.body.confPassword)) {
        return redirection_1.default(res, `${BASE_URL}?passwordsNotMatching${QUERY_VALUE}`);
    }
    if (!(await register_1.default.isEmailInUse(payload.email.trim(), BASE_URL, res))) {
        return redirection_1.default(res, `${BASE_URL}?emailInUse${QUERY_VALUE}`);
    }
    Reflect.deleteProperty(payload, 'confPassword');
    if (await register_1.default.createClient(payload, BASE_URL, res)) {
        redirection_1.default(res, `${BASE_URL}?accountCreated${QUERY_VALUE}`);
    }
};
exports.default = {
    getRegisterPage,
    postRegisterPage,
};
