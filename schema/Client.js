"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Client = new mongoose_1.default.Schema({
    email: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    },
    password: {
        type: String,
    },
    notifications: {
        type: Array,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('clients', Client);
