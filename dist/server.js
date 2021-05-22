'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const path_1 = __importDefault(require('path'));
const listener_1 = __importDefault(require('./util/listener'));
const app_1 = __importDefault(require('./app'));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const DEFAULT_PORT = 5000;
const FALLBACK_PORT = 3000;
app_1.default.listen(DEFAULT_PORT || FALLBACK_PORT, () => {
  listener_1.default(DEFAULT_PORT || FALLBACK_PORT);
});
