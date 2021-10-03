"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("../../schema/Client"));
const queries_1 = __importDefault(require("../../helpers/queries/queries"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const accountExists = async (e, p) => {
    const account = await queries_1.default.findOne({
        schema: Client_1.default,
        filterProperty: 'email',
        filterValue: e,
    });
    if (!account || !(await bcrypt_1.default.compare(p, account.password))) {
        return false;
    }
    else {
        return account;
    }
};
exports.default = {
    accountExists,
};
