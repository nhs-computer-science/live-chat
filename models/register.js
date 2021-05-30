"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientSchema_1 = __importDefault(require("../schema/ClientSchema"));
const EmailConfirmationToken_1 = __importDefault(require("../schema/EmailConfirmationToken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hasStudentEmail = (e) => e.split('@')[1] === 'student.gn.k12.ny.us';
const isFirstNameReal = (fName, e) => fName.charAt(0) === e.charAt(0);
const isLastNameReal = (lName, e) => e.split('@')[0].substring(1).slice(0, -1) === lName;
const doPasswordsMatch = (p1, p2) => p1.trim() === p2.trim();
const isEmailInUse = async (e) => await ClientSchema_1.default.findOne({ email: e });
const storeConfEmailToken = async (e, t) => await EmailConfirmationToken_1.default.create({ email: e, token: t });
const verifyToken = async (t) => await EmailConfirmationToken_1.default.findOne({ token: t });
const hashPassword = async (password, saltRounds) => await bcrypt_1.default.hash(password, saltRounds);
const createAccount = async (payload) => await ClientSchema_1.default.create({ ...payload });
exports.default = {
    hasStudentEmail,
    isFirstNameReal,
    isLastNameReal,
    doPasswordsMatch,
    isEmailInUse,
    storeConfEmailToken,
    verifyToken,
    createAccount,
    hashPassword,
};
