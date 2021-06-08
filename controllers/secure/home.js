"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = __importDefault(require("../../models/secure/home"));
const date_1 = __importDefault(require("../../helpers/date/date"));
const chatFilter_1 = __importDefault(require("../../helpers/chatFilter/chatFilter"));
const getHomePage = async (req, res) => {
    const messages = [...(await home_1.default.fetchMessages())];
    messages.forEach((message) => {
        const m = { ...message };
        m._doc._id = 5;
    });
    res.render('secure/home', {
        messages: await home_1.default.fetchMessages(),
        chatFilter: chatFilter_1.default,
        date: date_1.default,
        email: req.session.client.email,
        password: req.session.client.password,
        clients: await home_1.default.fetchClients(),
    });
};
const postHomePage = (req, res) => {
    if (!req.session || !req.session.client) {
        return res.redirect('/regsiter/?serverSideError=yes');
    }
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', async () => {
        const payload = JSON.parse(data);
        if (payload.hasOwnProperty('password')) {
            const passwordsMatch = await home_1.default.comparePasswords(payload.password, req.session.client.password);
            ``;
            if (passwordsMatch) {
                await home_1.default.deleteAccount(req.session.client.email);
                res.send(true);
            }
            else {
                res.send(false);
            }
        }
        else if (payload.hasOwnProperty('chat')) {
            home_1.default.sendNotifications(req.session.client.email, payload.chat);
            if (await home_1.default.storeMessage(payload.chat, req.session.client.email)) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(404);
            }
        }
        else if (payload.hasOwnProperty('notificationEmails')) {
            if (await home_1.default.updateNotifications(req.session.client.email, payload.notificationEmails)) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(404);
            }
        }
    });
};
exports.default = {
    getHomePage,
    postHomePage,
};
