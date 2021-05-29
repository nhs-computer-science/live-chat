"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if (!req.session || !req.session.client) {
        res.redirect('/register');
    }
    else {
        next();
    }
};
