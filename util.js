const { getConfig } = require('./config');
function getRedactMask(value) {
    const config = getConfig();

    switch (typeof value) {
        case 'string':
            return config.preserveDataLength ? ''.padEnd(value.length, config.mask) : config.mask;
        case 'number':
        case 'bigint':
            return config.preserveDataLength ? ''.padEnd((value + '').length, config.mask) : config.mask;
        case 'boolean':
            return config.preserveDataLength ? ''.padEnd(value ? 4 : 5, config.mask) : config.mask;
        default:
            return config.mask;
    }
}

module.exports = { getRedactMask };
