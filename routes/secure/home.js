"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const home_1 = __importDefault(require("../../controllers/secure/home"));
Router.get('/', home_1.default.getHomePage);
Router.post('/', home_1.default.postHomePage);
exports.default = Router;
