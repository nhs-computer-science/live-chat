"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (res, path, e, statusCode) => {
    if (e) {
        console.log(e.message || e);
    }
    !statusCode
        ? res.sendStatus(200).redirect(path)
        : res.sendStatus(statusCode).redirect(path);
};
