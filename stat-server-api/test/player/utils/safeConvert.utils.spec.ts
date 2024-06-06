import * as ut from '@player/utils/safeConvert.utils';

describe('Safe Convert', () => {
    describe('safeConvertInt', () => {
        it.each([
            [0, 0],
            ['0', parseInt('0')],
            ['101', parseInt('101')],
            ['2.1234', parseInt('2.1234')],
            ['a', parseInt('a')],
            ['', parseInt('')],
        ])('safeConvertInt when value %s', (value, result) => {
            expect(ut.safeConvertInt(value)).toEqual(result);
        });
    });

    describe('safeConvertFloat', () => {
        it.each([
            [0, 0],
            ['0', parseFloat('0')],
            ['101', parseFloat('101')],
            ['2.1234', parseFloat('2.1234')],
            ['a', parseFloat('a')],
            ['', parseFloat('')],
        ])('safeConvertFloat when value %s', (value, result) => {
            expect(ut.safeConvertFloat(value)).toEqual(result);
        });
    });
});