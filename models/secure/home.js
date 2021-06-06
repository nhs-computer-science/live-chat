"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../../schema/Message"));
const serverSideError_1 = __importDefault(require("../../util/serverSideError"));
const fetchMessages = async () => await Message_1.default.find();
const storeMessage = async (c, req, res) => await Message_1.default.create({
    email: req.session.client.email,
    message: c,
}).catch((e) => {
    console.log(e);
    serverSideError_1.default(res, '/home');
});
exports.default = {
    fetchMessages,
    storeMessage,
};
