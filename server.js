"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, './env', '.env') });
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => {
    console.log(`Listening to request on port ${PORT}`);
});
const merge = (firstHalf, secondHalf) => {
    for (let i = 0; i < firstHalf.length; i++) {
        for (let k = 0; k < secondHalf.length; k++) {
            if (firstHalf[i] > secondHalf[k]) {
                const smallerValues = [];
                let c = 0;
                while (c <= k) {
                    smallerValues[c] = secondHalf[c];
                    secondHalf.shift();
                    c++;
                }
                const greaterValues = firstHalf.splice(i);
                firstHalf = [...firstHalf, ...smallerValues, ...greaterValues];
            }
        }
    }
    return firstHalf.length > 0 ? [...firstHalf, ...secondHalf] : [...firstHalf];
};
const mergeSort = (a1) => {
    if (a1.length < 2) {
        return a1;
    }
    const firstHalf = a1.splice(0, a1.length / 2);
    return merge(mergeSort(firstHalf), mergeSort(a1));
};
const init = () => {
    const a1 = [];
    for (let i = 0; i < 10; i++) {
        a1[i] = Math.floor(Math.random() * 10);
    }
    console.log(mergeSort(a1));
};
init();
