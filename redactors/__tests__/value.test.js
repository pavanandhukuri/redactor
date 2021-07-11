jest.mock('../../config');
const valueRedactor = require('../value');

describe('Value redactor tests', () => {
    test('Should redact redactable strings', () => {
        const testString = 'Credit card number is 1234-1234-1234-1234';
        const expectedString = 'Credit card number is *******************';

        expect(valueRedactor(testString)).toBe(expectedString);
    });

    test('Should redact repeated redactable strings', () => {
        const testString = 'Credit card number is 1234-1234-1234-1234 Credit card number is 1234-1234-1234-1234';
        const expectedString = 'Credit card number is ******************* Credit card number is *******************';

        expect(valueRedactor(testString)).toBe(expectedString);
    });

    test('Should redact exact redactable strings', () => {
        const testString = '1234-1234-1234-1234';
        const expectedString = '*******************';

        expect(valueRedactor(testString)).toBe(expectedString);
    });

    test('Should return string as is if no redactable strings are found', () => {
        const testString = 'This is a sample string with no redactable data';
        expect(valueRedactor(testString)).toBe(testString);
    });

    test('Should return null if null is passed', () => {
        const testString = null;
        expect(valueRedactor(testString)).toBe(testString);
    });
});
