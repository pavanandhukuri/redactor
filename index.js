const arrayRedactor = require('./redactors/array');
const objectRedactor = require('./redactors/object');
const valueRedactor = require('./redactors/value');
const { setConfig } = require('./config');

exports.initialize = (config) => {
    if (config.mask && typeof config.mask != 'string') {
        throw new Error('mask attribute must be a valid string');
    }

    setConfig(config);
};

exports.default = (input) => {
    try {
        if (Array.isArray(input)) {
            return arrayRedactor(input);
        } else if (typeof input === 'object') {
            return objectRedactor(input);
        } else {
            return valueRedactor(input);
        }
    } catch (e) {
        console.log('Error redacting the passed data. Original value returned as is', e);
        return input;
    }
};
