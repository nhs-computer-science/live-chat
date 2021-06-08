"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skeleton_1 = __importDefault(require("../../email/skeleton"));
const password_reset_1 = __importDefault(require("../../models/authentication/password-reset"));
const getPasswordResetPage = (req, res) => {
    res.render('auth/password-reset', {
        emailDoesNotExist: req.query.emailDoesNotExist === 'yes' ? true : false,
        tokenSent: req.query.tokenSent === 'yes' ? true : false,
        invalidToken: req.query.invalidToken === 'yes' ? true : false,
        validToken: req.query.validToken === 'yes' ? true : false,
        passwordChanged: req.query.passwordChanged === 'yes' ? true : false,
    });
};
const postPasswordResetPage = async (req, res) => {
    const payload = { ...req.body };
    const URL = '/password-reset/?';
    const QUERY_VALUE = '=yes';
    if (payload.hasOwnProperty('email')) {
        if (await password_reset_1.default.emailExists(payload.email)) {
            req.session.tentativeClient = { clientEmail: payload.email };
            const token = token(8);
            await password_reset_1.default.storeToken(req.session.tentativeClient.clientEmail, token);
            await skeleton_1.default(req.session.tentativeClient.clientEmail, 'Email Confirmation Token', `Token: ${token}`);
            res.redirect(`${URL}tokenSent${QUERY_VALUE}`);
        }
        else {
            res.redirect(`${URL}emailDoesNotExist${QUERY_VALUE}`);
        }
    }
    else if (payload.hasOwnProperty('token')) {
        const compareTokens = await password_reset_1.default.compareTokens(payload.token);
        if (!compareTokens) {
            return res.redirect(`${URL}invalidToken${QUERY_VALUE}`);
        }
        if (!req.session.tentativeClient.hasOwnProperty('clientEmail')) {
            return res.redirect(`${URL}serverSideError${QUERY_VALUE}`);
        }
        if (req.session.tentativeClient.clientEmail === compareTokens.email) {
            req.session.tentativeClient.verifiedEmail = compareTokens.email;
            return res.redirect(`${URL}validToken${QUERY_VALUE}`);
        }
        res.redirect(`${URL}serverSideError${QUERY_VALUE}`);
    }
    else {
        if (req.session.tentativeClient.hasOwnProperty('verifiedEmail')) {
            await password_reset_1.default.changePassword(payload.password, req.session.tentativeClient.verifiedEmail);
            req.session.destroy(() => {
                res.redirect(`${URL}passwordChanged${QUERY_VALUE}`);
            });
        }
        else {
            res.redirect(`${URL}serverSideError${QUERY_VALUE}`);
        }
    }
};
exports.default = {
    getPasswordResetPage,
    postPasswordResetPage,
};
