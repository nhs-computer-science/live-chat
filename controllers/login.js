"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getLoginPage = async (req, res) => {
    res.render('login');
};
const postLoginPage = async (req, res) => { };
exports.default = {
    getLoginPage,
    postLoginPage,
};
