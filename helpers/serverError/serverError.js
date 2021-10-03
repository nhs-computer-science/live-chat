"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (r, BASE_URL) => r.status(404).redirect(`${BASE_URL}/?serverSideError=yes`);
