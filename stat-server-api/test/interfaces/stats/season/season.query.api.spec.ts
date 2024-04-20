import SeasonQueryAPI from '@interfaces/stats/season/season.query.api';
import PaginationAPI from '@interfaces/pagination.api';
import SeasonQueryDto from '@interfaces/stats/season/season.query.dto';

jest.mock('@interfaces/pagination.api');

describe('Season Query API', () => {
    const { Op } = require('sequelize');
    const opt1 = {} as SeasonQueryDto;
    
    const opt2 = {
        id: 5,
        player_id: 5,
        seasons: '',
    } as SeasonQueryDto;

    const opt3 = {
        ids: '4,5',
        player_id: 5,
        seasons: '2022,2023',
    } as SeasonQueryDto;

    const opt4 = {
        ids: '4,5',
        player_id: 5,
    } as SeasonQueryDto;

    const opt5 = {
        ids: '4,5',
        seasons: '2022',
    } as SeasonQueryDto;

    describe('Constructor', () => {
        it.each([
            [opt1],
            [opt2],
        ])('constructor', (options) => {
            const api = new SeasonQueryAPI(options);
            
            expect(PaginationAPI).toHaveBeenCalledWith(options);
            expect(api.player_id).toEqual(options.player_id);
            expect(api.seasons).toEqual(options.seasons?.split(',') ?? []);
        });
    });

    describe('buildWhereClause', () => {
        const result1 = {};
        const result2 = { id: { [Op.eq]: opt2.id } };
        const result3 = { 
            id: { [Op.in]: opt3.ids.split(',') },
            player_id: { [Op.eq]: opt3.player_id },
            season: { [Op.in]: opt3.seasons?.split(',') ?? [] }
        };
        const result4 = { 
            id: { [Op.in]: opt4.ids.split(',') },
            player_id: { [Op.eq]: opt3.player_id }, 
        };
        const result5 = { 
            id: { [Op.in]: opt5.ids.split(',') },
            season: { [Op.in]: opt5.seasons?.split(',') ?? [] }
        };
        it.each([
            [opt1, result1],
            [opt2, result2],
            [opt3, result3],
            [opt4, result4],
            [opt5, result5],
        ])('should return where clause', (options, whereClause) => {
            const api = new SeasonQueryAPI(options);
            if (options.id) {
                api.id = options.id
            } else if (options.ids) {
                api.ids = options.ids.split(',');
            }
            expect(api.buildWhereClause()).toEqual(whereClause);
        });
    });
});
