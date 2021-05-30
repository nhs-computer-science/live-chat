"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = __importDefault(require("../models/register"));
const generateToken_1 = __importDefault(require("../util/generateToken"));
const skeleton_1 = __importDefault(require("../email/skeleton"));
const getRegisterPage = async (req, res) => {
    res.render('register', {
        notStudentEmail: req.query.notStudentEmail === 'yes' ? true : false,
        emailInUse: req.query.emailInUse === 'yes' ? true : false,
        notRealFirstName: req.query.notRealFirstName === 'yes' ? true : false,
        notRealLastName: req.query.notRealLastName === 'yes' ? true : false,
        passwordsNotMatching: req.query.passwordsNotMatching === 'yes' ? true : false,
        confirmationTokenSent: req.query.confirmationTokenSent === 'yes' ? true : false,
        invalidToken: req.query.invalidToken == 'yes' ? true : false,
        accountCreated: req.query.accountCreated === 'yes' ? true : false,
        serverSideError: req.query.serverSideError === 'yes' ? true : false,
    });
};
const postRegisterPage = async (req, res) => {
    const payload = req.body;
    if (payload.email ||
        (payload.email && typeof req.session.tentativeClient === 'object')) {
        req.session.tentativeClient = 'none';
    }
    const URL = '/register';
    const QUERY_VALUE = '=yes';
    const SERVER_SIDE_ERROR = `${URL}/?serverSideError${QUERY_VALUE}`;
    if (req.session.tentativeClient === 'none') {
        if (!register_1.default.hasStudentEmail(payload.email)) {
            return res.redirect(`${URL}/?notStudentEmail${QUERY_VALUE}`);
        }
        if (!register_1.default.isFirstNameReal(payload.firstName, payload.email)) {
            return res.redirect(`${URL}/?notRealFirstName${QUERY_VALUE}`);
        }
        if (!register_1.default.isLastNameReal(payload.lastName, payload.email)) {
            return res.redirect(`${URL}/?notRealLastName${QUERY_VALUE}`);
        }
        if (!register_1.default.doPasswordsMatch(payload.password, payload.passwordConf)) {
            return res.redirect(`${URL}/?passwordsNotMatching${QUERY_VALUE}`);
        }
        const isEmailInUse = await register_1.default.isEmailInUse(payload.email.trim());
        if (isEmailInUse) {
            return res.redirect(`${URL}/?emailInUse${QUERY_VALUE}`);
        }
        const confEmailToken = generateToken_1.default(8);
        const confEmailSent = await skeleton_1.default(payload.email, 'Email Confirmation', `Token: ${confEmailToken.toString()}`);
        if (confEmailSent) {
            req.session.tentativeClient = payload;
            const tokenStored = await register_1.default.storeConfEmailToken(payload.email, confEmailToken);
            if (tokenStored) {
                return res.redirect(`${URL}/?confirmationTokenSent${QUERY_VALUE}`);
            }
        }
    }
    const verifyToken = await register_1.default.verifyToken(payload.token);
    if (verifyToken && verifyToken.email === req.session.tentativeClient.email) {
        const hashedPassword = await register_1.default.hashPassword(req.session.tentativeClient.password, 10);
        if (hashedPassword) {
            Reflect.deleteProperty(req.session.tentativeClient, 'passwordConf');
            Reflect.deleteProperty(req.session.tentativeClient, 'password');
            req.session.tentativeClient.password = hashedPassword;
            if (await register_1.default.createAccount(req.session.tentativeClient)) {
                if (await skeleton_1.default('nhscompsciclub@gmail.com', 'Someone Created an Account!', JSON.stringify(req.session.tentativeClient))) {
                    req.session.destroy(() => {
                        res.redirect(`${URL}/?accountCreated${QUERY_VALUE}`);
                    });
                }
            }
            else {
                res.redirect(SERVER_SIDE_ERROR);
            }
        }
        else {
            res.redirect(SERVER_SIDE_ERROR);
        }
    }
    else {
        res.redirect(`${URL}/?invalidToken${QUERY_VALUE}&confirmationTokenSent${QUERY_VALUE}`);
    }
};
exports.default = {
    getRegisterPage,
    postRegisterPage,
};
