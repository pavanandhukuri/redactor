const objectRedactor = require('./object');
const valueRedactor = require('./value');

const arrayRedactor = (arr) => {
    arr.forEach((item, index, originalArr) => {
        if (Array.isArray(item)) {
            originalArr[index] = arrayRedactor(item);
        } else if (typeof item === 'object') {
            originalArr[index] = objectRedactor(item);
        } else {
            originalArr[index] = valueRedactor(item);
        }
    });
    return arr;
};

module.exports = arrayRedactor;
