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
    console.log(req.session.client);
    const session = req.session.client;
    res.render('secure/home', {
        blacklistedEmails: req.session.client.isAdmin ||
            (await home_1.default.isClientAdmin(session.email))
            ? await home_1.default.fetchBlacklistedEmails()
            : [],
        isAdmin: await home_1.default.isClientAdmin(session.email),
        messages: await home_1.default.fetchMessages(),
        clients: await home_1.default.fetchClients(),
        admins: await home_1.default.fetchAllAdmins(),
        adminPassword: req.session.client.isAdmin
            ? process.env.ADMIN_TOKEN
            : 'Nice Try',
        password: session.password,
        email: session.email,
        notificationsUnavailable: process.env.NOTIFICATIONS_UNAVAILABLE,
        chatFilter: chatFilter_1.default,
        date: date_1.default,
    });
};
const postHomePage = (req, res) => {
    console.log(req.file);
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
        else if (payload.hasOwnProperty('blacklistedEmail')) {
            blacklistEmail(payload.blacklistedEmail, res);
        }
        else if (payload.hasOwnProperty('blacklistedEmailRemoval')) {
            removeBlacklistedEmail(payload.blacklistedEmailRemoval, res);
        }
        else if (payload.hasOwnProperty('image')) {
            console.log(payload.image);
        }
        else if (payload.hasOwnProperty('removeAdminStatus')) {
            updateAdminStatus(null, req, res, true);
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
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    const storeMsg = await home_1.default.storeMessage(c.replace(regex, "").length === 0 ? "[Emoticons are currently unable to be processed and sent as a chat]" : c.replace(regex, ""), req.session.client);
    if (!(await home_1.default.isEmailBlacklisted(e)) && storeMsg) {
        if (!process.env.NOTIFICATIONS_UNAVAILABLE) {
            home_1.default.sendNotifications(e, c);
        }
        res.send({
            status: true,
            client: req.session.client,
            createdAt: storeMsg.createdAt,
            isAdmin: await home_1.default.isClientAdmin(req.session.client.email),
            id: storeMsg._id,
        });
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
const blacklistEmail = async (e, res) => {
    const client = { ...(await home_1.default.findClient(e)) };
    if (JSON.stringify(client) === '{}' ||
        (await home_1.default.isEmailBlacklisted(e))) {
        res.send(false);
    }
    else {
        if (await home_1.default.blacklistClient(client._doc.email, client._doc.firstName, client._doc.lastName)) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
};
const removeBlacklistedEmail = async (e, res) => {
    if (await home_1.default.removeBlacklistedEmail(e)) {
        res.send(true);
    }
    else {
        res.send(false);
    }
};
const updateAdminStatus = async (t, req, res, removeAdmin) => {
    const e = req.session.client.email;
    if (removeAdmin) {
        await home_1.default
            .updateAdminStatus(e, false)
            .catch(() => res.send(false));
        res.send(true);
    }
    else {
        if (t === process.env.ADMIN_TOKEN) {
            await home_1.default.updateAdminStatus(e, true);
            res.send(true);
        }
        else {
            await skeleton_1.default(process.env.NODEMAILER_USER, 'Someone Failed to Authenticate as Admin!', `Client: ${e}`);
            res.send(false);
        }
    }
};
;
exports.default = {
    getHomePage,
    postHomePage,
};
