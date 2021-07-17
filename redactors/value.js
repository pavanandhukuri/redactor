const { getConfig } = require('../config');
const { getRedactMask } = require('../util');

function matchAndRedact(value, pattern) {
    const matches = value.match('(' + pattern + ')');

    if (matches) {
        matches.forEach((match) => {
            value = value.replace(match, getRedactMask(match));
        });
    }
    return value;
}
const valueRedactor = (value) => {
    if (value && typeof value == 'string') {
        getConfig().textPatterns.forEach((pattern) => {
            value = matchAndRedact(value, pattern);
        });

        if (process && process.env) {
            getConfig().envVariableNames.forEach((varName) => {
                const varValue = process.env[varName];
                value = value.replace(varValue, getRedactMask(varValue));
            });
        }
    }

    return value;
};

module.exports = valueRedactor;
