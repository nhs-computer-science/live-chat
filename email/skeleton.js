"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../', './env', '.env') });
exports.default = async (recipient, subject, text) => {
    const host = process.env.NODEMAILER_HOST;
    const user = process.env.NODEMAILER_USER;
    const pass = process.env.NODEMAILER_PASS;
    const port = process.env.NODEMAILER_PORT;
    const transporter = nodemailer_1.default.createTransport({
        host,
        port,
        secure: false,
        requireTLS: true,
        auth: {
            user,
            pass,
        },
    });
    return await transporter.sendMail({
        from: user,
        to: recipient,
        subject,
        text,
    });
};
