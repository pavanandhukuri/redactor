let config = {
    mask: '*',
    textPatterns: [],
    keyPatterns: [],
    preserveDataLength: true,
};

exports.setConfig = (updatedConfig) => {
    config = { ...config, ...updatedConfig };
};

exports.getConfig = () => {
    return config;
};
