describe('Redactor tests', () => {
    jest.mock('../config');

    const mockValueRedactor = jest.fn((value) => {
        if (value === 'Your phone number is +9199223322111') {
            return 'Your phone number is **************';
        } else {
            return value;
        }
    });

    jest.mock('../redactors/value', () => {
        return mockValueRedactor;
    });

    const mockRedactedObj = {
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

    const mockObjectRedactor = jest.fn((value) => {
        return mockRedactedObj;
    });

    jest.mock('../redactors/object', () => {
        return mockObjectRedactor;
    });

    const mockRedactedArr = [
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

    const mockArrayRedactor = jest.fn((value) => {
        return mockRedactedArr;
    });

    jest.mock('../redactors/array', () => {
        return mockArrayRedactor;
    });

    const redactor = require('..').default;
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Should redact an object', () => {
        const obj = {
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
        };
        expect(redactor(obj)).toStrictEqual(mockRedactedObj);
        expect(mockObjectRedactor).toBeCalledWith(obj);
    });

    test('Should redact a string', () => {
        expect(redactor('Your phone number is +9199223322111')).toStrictEqual('Your phone number is **************');
        expect(mockValueRedactor).toBeCalledWith('Your phone number is +9199223322111');
    });

    test('Should redact an array', () => {
        const mockArr = [
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
        expect(redactor(mockArr)).toStrictEqual(mockRedactedArr);
        expect(mockArrayRedactor).toBeCalledWith(mockArr);
    });
});
