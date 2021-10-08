"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_words_1 = __importDefault(require("bad-words"));
exports.default = (message) => {
    try {
        return new bad_words_1.default({ placeHolder: '*' }).clean(message);
    }
    catch (err) {
        return '[Emoticons are currently unable to be processed and sent as a chat]';
    }
};
