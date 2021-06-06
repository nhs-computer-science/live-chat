"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (l) => {
    let token = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < l; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
};
