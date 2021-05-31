"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../../models/authentication/login"));
const getLoginPage = async (req, res) => {
    res.render('auth/login', {
        authFailed: req.query.authFailed === 'yes' ? true : false,
    });
};
const postLoginPage = async (req, res) => {
    const payload = req.body;
    const URL = '/login/';
    const accountExists = await login_1.default.accountExists(payload.email, payload.password, res, URL);
    if (typeof accountExists === 'object') {
        req.session.client = accountExists;
        res.redirect('/home');
    }
    else {
        res.redirect('/login/?authFailed=yes');
    }
};
exports.default = {
    getLoginPage,
    postLoginPage,
};
