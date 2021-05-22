"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '.env') });
let DEFAULT_PORT = process.env.DEFAULT_PORT;
let FALLBACK_PORT = process.env.FALLBACK_PORT;
app_1.default.listen(DEFAULT_PORT || FALLBACK_PORT, () => {
    console.log('listening to request on port ' + DEFAULT_PORT || FALLBACK_PORT);
});
