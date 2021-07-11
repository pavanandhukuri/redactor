const { getConfig } = require('../config');
const { getRedactMask } = require('../util');
const valueRedactor = require('./value');

const objectRedactor = (obj) => {
    if (obj) {
        for (const property in obj) {
            if (getConfig().keyPatterns.filter((pattern) => property.match(pattern)).length > 0) {
                obj[property] = getRedactMask(obj[property]);
            } else if (typeof obj[property] === 'object') {
                obj[property] = objectRedactor(obj[property]);
            } else {
                obj[property] = valueRedactor(obj[property]);
            }
        }
    }
    return obj;
};

module.exports = objectRedactor;
