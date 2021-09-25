"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const destroySession = (r, cb) => r.session.destroy(() => cb());
exports.default = {
    destroySession,
};
