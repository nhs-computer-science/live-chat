"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EmailConfirmationToken = new mongoose_1.default.Schema({
    email: {
        type: String,
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        expires: '2m',
        default: Date.now(),
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('EmailConfirmationTokens', EmailConfirmationToken);
