"use strict";
const merge = (a1, a2) => {
    let k = 0;
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] > a2[k]) {
            const smallerValues = [];
            for (let j = k; j <= k; j++) {
                smallerValues.push(a2[j]);
            }
            const greaterValues = a1.splice(i);
            a1 = [...a1, ...smallerValues, ...greaterValues];
            k++;
        }
    }
    return [...a1, ...a2.splice(k)];
};
(() => {
    const a1 = [1, 1, 3, 3, 5, 5, 6, 7, 7, 8, 13, 13];
    const a2 = [4, 5, 7, 8, 14, 15, 17, 18, 19, 20];
    console.log(merge(a1, a2));
})();
