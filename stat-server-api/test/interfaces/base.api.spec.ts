import BaseAPI from '@interfaces/base.api';
import BaseDto from '@interfaces/base.dto';
import { SortDirection } from '@interfaces/enums/app.enums';

describe('BaseAPI', () => {
    const defaultSort = ['z','y','x'];

    const opt1 = {
        id: 5,
        ids: '1,2,3',
        sort: ['a','b','c'],
        sort_direction: SortDirection.ASC,
    } as BaseDto;

    const opt2 = {
        id: 50,
        ids: '3,2,1',
        sort: 'z',
        sort_direction: SortDirection.DESC,
    } as BaseDto;

    const opt3: BaseDto = {
        sort_direction: SortDirection.ASC,
    } as BaseDto;

    describe('Constructor', () => {
        it.each([
            [opt1],
            [opt2],
            [opt3],
        ])('constructor', (options) => {
            const api = new BaseAPI(options);
            const ids = options.ids?.split(',') ?? [];

            expect(api.id).toEqual(options.id);
            expect(api.ids).toEqual(ids);
            expect(api.sort_direction).toEqual(options.sort_direction);

            let sort: string[];
            if(options?.sort) {
                if(Array.isArray(options.sort))
                    sort = options.sort;
                else
                    sort = [options.sort];

                expect(api.sort).toEqual(sort);
            }
        });
    });

    describe('buildOrderByClause', () => {
        it.each([
            [opt1, [['a', SortDirection.ASC], ['b', SortDirection.ASC], ['c', SortDirection.ASC]]],
            [opt2, [['z', SortDirection.DESC]]],
            [opt3, [['z', SortDirection.ASC], ['y', SortDirection.ASC], ['x', SortDirection.ASC]]],
        ])('should return an order by clause', (options, sortClause) => {
            const api = new BaseAPI(options);
            expect(api.buildOrderByClause(defaultSort)).toEqual(sortClause);
        });
    });
});
