"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = __importDefault(require("../../models/secure/home"));
const getHomePage = async (req, res) => {
    const messages = [...(await home_1.default.fetchMessages())];
    messages.forEach((message) => {
        const m = { ...message };
        m._doc._id = 5;
    });
    res.render('secure/home', {
        chatStored: req.query.chatStored === 'yes' ? true : false,
        messages: await home_1.default.fetchMessages(),
    });
};
const postHomePage = async (req, res) => {
    if (await home_1.default.storeMessage(req.body.message, req, res)) {
        res.redirect('/home/?chatStored=yes');
    }
};
exports.default = {
    getHomePage,
    postHomePage,
};
