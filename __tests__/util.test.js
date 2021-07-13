describe('Util Tests with length retained', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('Should return value with length retained when preserveDataLength is true', () => {
        jest.setMock('../config', {
            getConfig: () => {
                return {
                    mask: '*',
                    preserveDataLength: true,
                };
            },
        });
        const { getRedactMask } = require('../util');

        expect(getRedactMask('abc')).toBe('***');
    });

    test('Should return value with length retained when preserveDataLength is false', () => {
        jest.setMock('../config', {
            getConfig: () => {
                return {
                    mask: 'REDACTED',
                    preserveDataLength: false,
                };
            },
        });
        const { getRedactMask } = require('../util');

        expect(getRedactMask('abc')).toBe('REDACTED');
    });
});
