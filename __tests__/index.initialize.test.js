const { initialize } = require('..');
const { getConfig } = require('../config');

describe('Initialize Tests', () => {
    test('Should initialize with empty object', () => {
        initialize({});
        expect(getConfig()).toStrictEqual({
            mask: '*',
            textPatterns: [],
            keyPatterns: [],
            preserveDataLength: true,
        });
    });

    test('Should initialize with partial object', () => {
        initialize({ mask: '#' });
        expect(getConfig()).toStrictEqual({
            mask: '#',
            textPatterns: [],
            keyPatterns: [],
            preserveDataLength: true,
        });

        initialize({ mask: '#', textPatterns: ['333'] });
        expect(getConfig()).toStrictEqual({
            mask: '#',
            textPatterns: ['333'],
            keyPatterns: [],
            preserveDataLength: true,
        });
    });
});
