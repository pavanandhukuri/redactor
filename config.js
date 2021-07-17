let config = {
    mask: '*',
    textPatterns: [],
    keyPatterns: [],
    envVariableNames: [],
    preserveDataLength: true,
};

exports.setConfig = (updatedConfig) => {
    config = { ...config, ...updatedConfig };
};

exports.getConfig = () => {
    return config;
};
