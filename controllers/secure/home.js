"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getHomePage = async (req, res) => {
    res.render('secure/home', {});
};
exports.default = {
    getHomePage,
};
