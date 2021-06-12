"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("../../schema/Client"));
const EmailConfirmationToken_1 = __importDefault(require("../../schema/EmailConfirmationToken"));
const queries_1 = __importDefault(require("../../helpers/queries/queries"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hasStudentEmail = (e) => e.split('@')[1] === 'student.gn.k12.ny.us' ||
    e.split('@')[1] === 'greatneck.k12.ny.us';
const isFirstNameReal = (fName, e) => fName.charAt(0) === e.charAt(0);
const isLastNameReal = (lName, e) => e.split('@')[0].substring(1).slice(0, -1) === lName;
const doPasswordsMatch = (p1, p2) => p1.trim() === p2.trim();
const isEmailInUse = async (e) => await queries_1.default.findOne({
    schema: Client_1.default,
    filterProperty: 'email',
    filterValue: e,
});
const storeConfEmailToken = async (e, t) => await queries_1.default.create(EmailConfirmationToken_1.default, { email: e, token: t });
const verifyToken = async (t) => await queries_1.default.findOne({
    schema: EmailConfirmationToken_1.default,
    filterProperty: 'token',
    filterValue: t,
});
const hashPassword = async (p, saltRounds) => await bcrypt_1.default.hash(p, saltRounds);
const createAccount = async (payload) => await queries_1.default.create(Client_1.default, { ...payload });
exports.default = {
    hasStudentEmail,
    isFirstNameReal,
    isLastNameReal,
    doPasswordsMatch,
    isEmailInUse,
    storeConfEmailToken,
    verifyToken,
    hashPassword,
    createAccount,
};
