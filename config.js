let config = {
    mask: '*',
    textPatterns: [],
    keyPatterns: [],
};

exports.setConfig = (updatedConfig) => {
    config = { ...config, ...updatedConfig };
};

exports.getConfig = () => {
    return config;
};
