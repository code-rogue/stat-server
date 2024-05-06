import BaseAPI from '@interfaces/base.api';
import PaginationAPI, { DEFAULT_LIMIT } from '@interfaces/pagination.api';
import PaginationDto from '@interfaces/pagination.dto';

jest.mock('@interfaces/base.api');

describe('PaginationAPI', () => {
    const opt1 = {
        offset: 5,
        limit: 100,
    } as PaginationDto;

    const opt2 = {
        offset: 500,
    } as PaginationDto;

    const opt3 = {
        limit: 200,
    } as PaginationDto;
    
    describe('Constructor', () => {
        it.each([
            [opt1],
            [opt2],
            [opt3],
        ])('constructor', (options) => {
            const api = new PaginationAPI(options);

            expect(BaseAPI).toHaveBeenCalledWith(options);
            expect(api.limit).toEqual(options.limit ?? DEFAULT_LIMIT);
            expect(api.offset).toEqual(options.offset ?? 1);
        });
    });
});