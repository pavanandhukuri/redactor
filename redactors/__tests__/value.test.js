jest.mock('../../config');
const valueRedactor = require('../value');

describe('Value redactor tests', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules(); // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
    });

    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    });

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

    test('Should redact env variable data', () => {
        process.env.SECRET1 = 'SHOULD_REDACT_THIS';
        process.env.SECRET2 = 'REDACT2';

        expect(valueRedactor('This string contains a secret called SHOULD_REDACT_THIS')).toBe(
            'This string contains a secret called ******************'
        );

        expect(valueRedactor('This string contains a secret called REDACT2')).toBe(
            'This string contains a secret called *******'
        );

        expect(valueRedactor('This one should not be redacted')).toBe('This one should not be redacted');
    });

    test('Should not redact env variable data when process.env is not present', () => {
        delete process.env;

        expect(valueRedactor('This one should not be redacted')).toBe('This one should not be redacted');
    });
});
