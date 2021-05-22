"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientSchema_1 = __importDefault(require("../schema/ClientSchema"));
const redirection_1 = __importDefault(require("../util/redirection"));
const DATABASE_ERROR_URL = (BASE_URL) => `${BASE_URL}?databaseError=yes`;
const isEmailInUse = async (e, BASE_URL, r) => await ClientSchema_1.default.findOne({ e }).catch((e) => redirection_1.default(r, DATABASE_ERROR_URL(BASE_URL), e));
const createClient = async (payload, BASE_URL, r) => await ClientSchema_1.default.create({ payload }).catch((e) => redirection_1.default(r, DATABASE_ERROR_URL(BASE_URL), e));
const doPasswordsMatch = (p1, p2) => p1.trim() === p2.trim();
exports.default = {
    isEmailInUse,
    doPasswordsMatch,
    createClient,
};
