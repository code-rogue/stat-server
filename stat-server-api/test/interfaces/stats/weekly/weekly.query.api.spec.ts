import PaginationAPI from '@interfaces/pagination.api';
import WeeklyQueryAPI from '@interfaces/stats/weekly/weekly.query.api';
import WeeklyQueryDto from '@interfaces/stats/weekly/weekly.query.dto';

jest.mock('@interfaces/pagination.api');

describe('Weekly Query API', () => {
    const { Op } = require('sequelize');
    const opt1 = {} as WeeklyQueryDto;
    
    const opt2 = {
        id: 5,
        player_id: 5,
        seasons: '',
        weeks: '',
    } as WeeklyQueryDto;

    const opt3 = {
        ids: '4,5',
        player_id: 5,
        seasons: '2022,2023',
        weeks: '10,11,12',
    } as WeeklyQueryDto;

    const opt4 = {
        ids: '4,5',
        player_id: 5,
        weeks: '10,11,12',
    } as WeeklyQueryDto;

    const opt5 = {
        ids: '4,5',
        seasons: '2022',
    } as WeeklyQueryDto;

    describe('Constructor', () => {
        it.each([
            [opt1],
            [opt2],
        ])('constructor', (options) => {
            const api = new WeeklyQueryAPI(options);
            
            expect(PaginationAPI).toHaveBeenCalledWith(options);
            expect(api.player_id).toEqual(options.player_id);
            expect(api.seasons).toEqual(options.seasons?.split(',') ?? []);
            expect(api.weeks).toEqual(options.weeks?.split(',') ?? []);
        });
    });

    describe('buildWhereClause', () => {
        const result1 = {};
        const result2 = { id: { [Op.eq]: opt2.id } };
        const result3 = { 
            id: { [Op.in]: opt3.ids.split(',') },
            player_id: { [Op.eq]: opt3.player_id },
            season: { [Op.in]: opt3.seasons?.split(',') ?? [] },
            week: { [Op.in]: opt3.weeks?.split(',') ?? [] }
        };
        const result4 = { 
            id: { [Op.in]: opt4.ids.split(',') },
            player_id: { [Op.eq]: opt3.player_id },
            week: { [Op.in]: opt3.weeks?.split(',') ?? [] },
        };
        const result5 = { 
            id: { [Op.in]: opt5.ids.split(',') },
            season: { [Op.in]: opt5.seasons?.split(',') ?? [] },
        };
        it.each([
            [opt1, result1],
            [opt2, result2],
            [opt3, result3],
            [opt4, result4],
            [opt5, result5],
        ])('should return where clause', (options, whereClause) => {
            const api = new WeeklyQueryAPI(options);
            if (options.id) {
                api.id = options.id
            } else if (options.ids) {
                api.ids = options.ids.split(',');
            }
            expect(api.buildWhereClause()).toEqual(whereClause);
        });
    });
});
