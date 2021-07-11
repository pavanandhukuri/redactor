const { getConfig } = require('./config');
function getRedactMask(value) {
    const config = getConfig();
    switch (typeof value) {
        case 'string':
            return ''.padEnd(value.length, config.mask);
        case 'number':
        case 'bigint':
            return ''.padEnd((value + '').length, config.mask);
        case 'boolean':
            return ''.padEnd(value ? 4 : 5, config.mask);
        default:
            return config.mask;
    }
}

module.exports = { getRedactMask };
