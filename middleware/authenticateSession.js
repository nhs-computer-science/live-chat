"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if (req.session && req.session.client) {
        console.log('in middleware');
        next();
    }
    else {
        res.redirect('/register');
    }
};
