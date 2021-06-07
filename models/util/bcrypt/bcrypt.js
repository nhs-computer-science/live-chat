"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const hash = async (password, saltRounds) => await bcrypt_1.default.hash(password, saltRounds);
const compareHash = async (password, hash) => await bcrypt_1.default.compare(password, hash);
exports.default = {
    hash,
    compareHash,
};
