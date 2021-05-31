"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const ClientSchema_1 = __importDefault(require("../../schema/ClientSchema"));
const serverSideError_1 = __importDefault(require("../../util/serverSideError"));
const accountExists = async (e, p, r, URL) => {
    const account = await ClientSchema_1.default.findOne({ email: e });
    if (!account) {
        return false;
    }
    else {
        const passwordsMatch = await bcrypt_1.default
            .compare(p, account.password)
            .catch((e) => {
            console.log(e);
            serverSideError_1.default(r, URL);
        });
        if (passwordsMatch) {
            return account;
        }
        else {
            return false;
        }
    }
};
exports.default = {
    accountExists,
};
