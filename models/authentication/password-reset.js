"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const Client_1 = __importDefault(require("../../schema/Client"));
const EmailConfirmationToken_1 = __importDefault(require("../../schema/EmailConfirmationToken"));
const emailExists = async (e) => await Client_1.default.findOne({ email: e });
const storeToken = async (e, t) => await EmailConfirmationToken_1.default.create({ email: e, token: t });
const compareTokens = async (t) => await EmailConfirmationToken_1.default.findOne({ token: t });
const hashPassword = async (password, saltRounds) => await bcrypt_1.default.hash(password, saltRounds);
const changePassword = async (p, e) => Client_1.default.updateOne({ email: e, password: await hashPassword(p, 10) });
exports.default = {
    emailExists,
    storeToken,
    compareTokens,
    changePassword,
};
