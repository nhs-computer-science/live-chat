"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const isFile = (current, target) => fs_1.statSync(`${current}/${target}`).isFile();
const errorHandler = (err) => {
    throw err;
};
const ls = (p, results) => {
    child_process_1.exec(`ls ${p}`, (error, stdout, stderr) => {
        error || stderr
            ? errorHandler(error || stderr)
            : results(stdout.split('\n'));
    });
};
const deleteFileExtension = (fileNames, extension, p) => {
    fileNames.forEach((route) => {
        const isDir = !isFile(p, route);
        if (route.endsWith(`.${extension}`) && !isDir) {
            fs_1.unlink(`${p}/${route}`, (err) => err ? errorHandler(err.message) : null);
        }
        else if (isDir && route) {
            ls(`${p}/${route}`, (results) => {
                results.pop();
                results.length > 0
                    ? deleteFileExtension(results, extension, `${p}/${route}`)
                    : null;
            });
        }
    });
};
ls('./', (results) => deleteFileExtension(results, 'js', './'));
