"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = __importDefault(require("../../models/secure/home"));
const date_1 = __importDefault(require("../../helpers/date/date"));
const chatFilter_1 = __importDefault(require("../../helpers/chatFilter/chatFilter"));
const dotenv_1 = __importDefault(require("dotenv"));
const skeleton_1 = __importDefault(require("../../email/skeleton"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../env/.env') });
const getHomePage = async (req, res) => {
    const session = req.session.client;
    res.render('secure/home', {
        isAdmin: await home_1.default.isClientAdmin(session.email),
        messages: await home_1.default.fetchMessages(),
        clients: await home_1.default.fetchClients(),
        admins: await home_1.default.fetchAllAdmins(),
        adminPassword: req.session.client.isAdmin
            ? process.env.ADMIN_TOKEN
            : 'Nice Try',
        password: session.password,
        email: session.email,
        chatFilter: chatFilter_1.default,
        date: date_1.default,
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
            deleteAccount(payload.password, req, res);
        }
        else if (payload.hasOwnProperty('chat')) {
            storeChatMessage(payload.chat, req, res);
        }
        else if (payload.hasOwnProperty('notificationEmails')) {
            updateNotifications(payload.notificationEmails, req, res);
        }
        else if (payload.hasOwnProperty('chatMessageId')) {
            deleteChat(payload.chatMessageId, res);
        }
        else {
            updateAdminStatus(payload.adminToken, req, res);
        }
    });
};
const deleteAccount = async (p, req, res) => {
    if (await home_1.default.comparePasswords(p, req.session.client.password)) {
        await home_1.default.deleteAccount(req.session.client.email);
        res.send(true);
    }
    else {
        res.send(false);
    }
};
const storeChatMessage = async (c, req, res) => {
    const e = req.session.client.email;
    if (await home_1.default.storeMessage(c, e)) {
        home_1.default.sendNotifications(e, c);
        res.send(true);
    }
    else {
        res.send(false);
    }
};
const updateNotifications = async (e, req, res) => {
    if (await home_1.default.updateNotifications(req.session.client.email, e)) {
        res.send(true);
    }
    else {
        res.send(false);
    }
};
const deleteChat = async (id, res) => {
    if (await home_1.default.deleteChatMessage(id)) {
        res.send(true);
    }
    else {
        res.send(false);
    }
};
const updateAdminStatus = async (t, req, res) => {
    const e = req.session.client.email;
    if (t === process.env.ADMIN_TOKEN) {
        await home_1.default.updateAdminStatus(e);
        res.send(true);
    }
    else {
        await skeleton_1.default(process.env.NODEMAILER_USER, 'Someone Failed to Authenticate as Admin!', `Client: ${e}`);
        res.send(false);
    }
};
exports.default = {
    getHomePage,
    postHomePage,
};
