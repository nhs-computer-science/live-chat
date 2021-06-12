"use strict";
const POSTRequest = (url, payload, cb) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(async (responseData) => {
        const parsedData = await responseData.text();
        cb(parsedData);
    })
        .catch(() => cb(false));
};
