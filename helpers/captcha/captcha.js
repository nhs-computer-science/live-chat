"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateRandomInteger = (max) => Math.floor(Math.random() * (max ? max : 11));
exports.default = () => {
    return {
        num1: generateRandomInteger(),
        num2: generateRandomInteger(),
    };
};
