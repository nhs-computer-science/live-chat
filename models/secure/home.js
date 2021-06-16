"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const Client_1 = __importDefault(require("../../schema/Client"));
const Message_1 = __importDefault(require("../../schema/Message"));
const queries_1 = __importDefault(require("../../helpers/queries/queries"));
const skeleton_1 = __importDefault(require("../../email/skeleton"));
const blacklistedEmail_1 = __importDefault(require("../../schema/blacklistedEmail"));
const fetchMessages = async () => await queries_1.default.findAll(Message_1.default);
const storeMessage = async (c, client) => await queries_1.default.create(Message_1.default, {
    email: client.email,
    firstName: client.firstName,
    lastName: client.lastName,
    message: c,
});
const comparePasswords = async (p, hash) => await bcrypt_1.default.compare(p, hash);
const deleteAccount = async (e) => await queries_1.default.deleteEntries({
    schema: Client_1.default,
    filterProperty: 'email',
    filterValue: e,
});
const updateNotifications = async (e, emails) => await queries_1.default.updateOne({ schema: Client_1.default, filterProperty: 'email', filterValue: e }, 'notifications', emails);
const fetchClients = async () => await queries_1.default.findAll(Client_1.default);
const sendNotifications = async (senderEmail, chat) => {
    const clients = { ...(await fetchClients()) };
    for (const client in clients) {
        const notificationEmails = clients[client].notifications || [];
        for (const e of notificationEmails) {
            if (e === senderEmail) {
                skeleton_1.default(clients[client].email, `${senderEmail} Sent a Chat`, `${senderEmail} chatted: ${chat}`);
            }
        }
    }
};
const findClient = async (e) => await queries_1.default.findOne({
    schema: Client_1.default,
    filterProperty: 'email',
    filterValue: e,
});
const isClientAdmin = async (e) => {
    const client = await queries_1.default.findOne({
        schema: Client_1.default,
        filterProperty: 'email',
        filterValue: e,
    });
    return client.isAdmin;
};
const deleteChatMessage = async (id) => await queries_1.default.deleteEntries({
    schema: Message_1.default,
    filterProperty: '_id',
    filterValue: id,
});
const blacklistClient = async (e, fn, ln) => {
    console.log('in here');
    return await queries_1.default.create(blacklistedEmail_1.default, {
        email: e,
        firstName: fn,
        lastName: ln,
    });
};
const fetchAllAdmins = async () => await queries_1.default.findAll(Client_1.default, {
    filterProperty: 'isAdmin',
    filterValue: true,
});
const fetchBlacklistedEmails = async () => await queries_1.default.findAll(blacklistedEmail_1.default);
const isEmailBlacklisted = async (e) => await queries_1.default.findOne({
    schema: blacklistedEmail_1.default,
    filterProperty: 'email',
    filterValue: e,
});
const removeBlacklistedEmail = async (e) => await queries_1.default.deleteEntries({
    schema: blacklistedEmail_1.default,
    filterProperty: 'email',
    filterValue: e,
});
const updateAdminStatus = async (e, isAdmin) => await queries_1.default.updateOne({
    schema: Client_1.default,
    filterProperty: 'email',
    filterValue: e,
}, 'isAdmin', isAdmin);
exports.default = {
    fetchMessages,
    storeMessage,
    comparePasswords,
    deleteAccount,
    updateNotifications,
    fetchClients,
    sendNotifications,
    isClientAdmin,
    deleteChatMessage,
    fetchAllAdmins,
    findClient,
    fetchBlacklistedEmails,
    isEmailBlacklisted,
    updateAdminStatus,
    removeBlacklistedEmail,
    blacklistClient,
};
