jest.mock('../../config');

const mockValueRedactor = jest.fn((value) => {
    if (value === 'Your phone number is +9199223322111') {
        return 'Your phone number is **************';
    } else {
        return value;
    }
});

jest.mock('../value', () => {
    return mockValueRedactor;
});

const mockObjectRedactor = jest.fn((value) => {
    return {
        creditCardNumber: '*******************',
        phoneNumber: '**************',
        name: 'Pavan',
        location: {
            lat: '**',
            lng: '**',
        },
        isActive: '****',
        isVerified: '*****',
        comment: 'Your phone number is **************',
    };
});

jest.mock('../object', () => {
    return mockObjectRedactor;
});

const arrayRedactor = require('../array');
const objectRedactor = require('../object');
const valueRedactor = require('../value');

describe('Array Redactor tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Should redact object arrays', () => {
        const testArr = [
            {
                creditCardNumber: '1234-1234-1234-1234',
                phoneNumber: '+9139238348382',
                name: 'Pavan',
                location: {
                    lat: 62,
                    lng: 34,
                },
                isActive: true,
                isVerified: false,
                comment: 'Your phone number is +9199223322111',
            },
            {
                creditCardNumber: '1234-1234-1234-1234',
                phoneNumber: '+9139238348382',
                name: 'Pavan',
                location: {
                    lat: 62,
                    lng: 34,
                },
                isActive: true,
                isVerified: false,
                comment: 'Your phone number is +9199223322111',
            },
        ];

        const expectedArr = [
            {
                creditCardNumber: '*******************',
                phoneNumber: '**************',
                name: 'Pavan',
                location: {
                    lat: '**',
                    lng: '**',
                },
                isActive: '****',
                isVerified: '*****',
                comment: 'Your phone number is **************',
            },
            {
                creditCardNumber: '*******************',
                phoneNumber: '**************',
                name: 'Pavan',
                location: {
                    lat: '**',
                    lng: '**',
                },
                isActive: '****',
                isVerified: '*****',
                comment: 'Your phone number is **************',
            },
        ];

        expect(arrayRedactor(testArr)).toStrictEqual(expectedArr);
        expect(mockObjectRedactor).toHaveBeenCalledTimes(2);
        expect(mockObjectRedactor).toHaveBeenNthCalledWith(1, {
            creditCardNumber: '1234-1234-1234-1234',
            phoneNumber: '+9139238348382',
            name: 'Pavan',
            location: {
                lat: 62,
                lng: 34,
            },
            isActive: true,
            isVerified: false,
            comment: 'Your phone number is +9199223322111',
        });
        expect(mockObjectRedactor).toHaveBeenNthCalledWith(2, {
            creditCardNumber: '1234-1234-1234-1234',
            phoneNumber: '+9139238348382',
            name: 'Pavan',
            location: {
                lat: 62,
                lng: 34,
            },
            isActive: true,
            isVerified: false,
            comment: 'Your phone number is +9199223322111',
        });
        expect(valueRedactor).not.toBeCalled();
    });

    test('Should redact string arrays', () => {
        const testArr = ['Your phone number is +9199223322111', 'Your phone number is +9199223322111'];
        const expectedArr = ['Your phone number is **************', 'Your phone number is **************'];

        expect(arrayRedactor(testArr)).toStrictEqual(expectedArr);

        expect(valueRedactor).toBeCalledTimes(2);
        expect(objectRedactor).not.toBeCalled();
    });

    test('Should redact array of arrays', () => {
        const testArr = [
            [
                {
                    creditCardNumber: '1234-1234-1234-1234',
                    phoneNumber: '+9139238348382',
                    name: 'Pavan',
                    location: {
                        lat: 62,
                        lng: 34,
                    },
                    isActive: true,
                    isVerified: false,
                    comment: 'Your phone number is +9199223322111',
                },
                {
                    creditCardNumber: '1234-1234-1234-1234',
                    phoneNumber: '+9139238348382',
                    name: 'Pavan',
                    location: {
                        lat: 62,
                        lng: 34,
                    },
                    isActive: true,
                    isVerified: false,
                    comment: 'Your phone number is +9199223322111',
                },
            ],
        ];

        const expectedArr = [
            [
                {
                    creditCardNumber: '*******************',
                    phoneNumber: '**************',
                    name: 'Pavan',
                    location: {
                        lat: '**',
                        lng: '**',
                    },
                    isActive: '****',
                    isVerified: '*****',
                    comment: 'Your phone number is **************',
                },
                {
                    creditCardNumber: '*******************',
                    phoneNumber: '**************',
                    name: 'Pavan',
                    location: {
                        lat: '**',
                        lng: '**',
                    },
                    isActive: '****',
                    isVerified: '*****',
                    comment: 'Your phone number is **************',
                },
            ],
        ];

        expect(arrayRedactor(testArr)).toStrictEqual(expectedArr);
        expect(valueRedactor).not.toBeCalled();
        expect(objectRedactor).toHaveBeenCalledTimes(2);
    });
});
