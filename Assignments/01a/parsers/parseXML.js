import { parseString } from 'xml2js';

export function parseXML(data) {
    return new Promise((resolve, reject) => {
        parseString(data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}