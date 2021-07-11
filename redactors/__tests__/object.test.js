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

const objectRedactor = require('../object');

describe('Object Redactor tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Should redact objects and values', () => {
        const testObject = {
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
            birthDate: new Date(),
        };

        const expectedObject = {
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
            birthDate: '*',
        };

        expect(objectRedactor(testObject)).toStrictEqual(expectedObject);
        expect(mockValueRedactor).toBeCalledTimes(2);
        expect(mockValueRedactor).toHaveBeenNthCalledWith(1, 'Pavan');
        expect(mockValueRedactor).toHaveBeenNthCalledWith(2, 'Your phone number is +9199223322111');
        expect();
    });

    test('Should not redact objects if object is null', () => {
        const testObject = null;
        const expectedObject = null;
        expect(objectRedactor(testObject)).toStrictEqual(expectedObject);
    });
});
