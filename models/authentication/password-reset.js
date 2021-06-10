"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("../../schema/Client"));
const queries_1 = __importDefault(require("../../helpers/queries/queries"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const EmailConfirmationToken_1 = __importDefault(require("../../schema/EmailConfirmationToken"));
const emailExists = async (e) => await queries_1.default.findOne({
    schema: Client_1.default,
    filterProperty: 'email',
    filterValue: e,
});
const create = async (payload) => await queries_1.default.create(EmailConfirmationToken_1.default, payload);
const storeToken = async (e, t) => await create({ email: e, token: t });
const compareTokens = async (t) => await queries_1.default.findOne({
    schema: EmailConfirmationToken_1.default,
    filterProperty: 'token',
    filterValue: t,
});
const changePassword = async (p, e) => await queries_1.default.updateOne({ schema: Client_1.default, filterProperty: 'email', filterValue: e }, 'password', await bcrypt_1.default.hash(p, 10));
exports.default = {
    emailExists,
    storeToken,
    compareTokens,
    changePassword,
};
