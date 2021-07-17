const config = {
    mask: '*',
    textPatterns: ['\\d{4}-\\d{4}-\\d{4}-\\d{4}', '\\+\\d{1,15}'],
    keyPatterns: ['phone.*', 'mobile.*', 'creditCard.*', 'lat', 'lng', 'isVerified', 'isActive', 'birthDate'],
    envVariableNames: ['SECRET1', 'SECRET2'],
    preserveDataLength: true,
};

exports.getConfig = () => {
    return config;
};
