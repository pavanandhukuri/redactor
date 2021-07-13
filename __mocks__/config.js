const config = {
    mask: '*',
    textPatterns: ['\\d{4}-\\d{4}-\\d{4}-\\d{4}', '\\+\\d{1,15}'],
    keyPatterns: ['phone.*', 'mobile.*', 'creditCard.*', 'lat', 'lng', 'isVerified', 'isActive', 'birthDate'],
    preserveDataLength: true,
};

exports.getConfig = () => {
    return config;
};
