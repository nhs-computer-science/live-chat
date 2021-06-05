"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (r, cb) => r.session.destroy(() => cb());
