import PlayerQueryAPI from '@interfaces/player/player.query.api';
import PaginationAPI from '@interfaces/pagination.api';
import BaseDto from '@interfaces/base.dto';
import { SortDirection } from '@interfaces/enums/app.enums';
import { CareerStatus, Position, PositionGroup } from '@interfaces/enums/player.enums';
import PlayerQueryDto from '@interfaces/player/player.query.dto';

jest.mock('@interfaces/pagination.api');

describe('Player Query API', () => {
    const { Op } = require('sequelize');
    const opt1 = {} as PlayerQueryDto;
    
    const opt2 = {
        id: 5,
        name: 'Travis',
        position: Position.QB,
        position_group: PositionGroup.QB,
        status: CareerStatus.ActiveOnly,
    } as PlayerQueryDto;

    const opt3 = {
        ids: '4,5',
        name: 'Travis',
        position: Position.QB,
        status: CareerStatus.InactiveOnly,
    } as PlayerQueryDto;

    const opt4 = {
        ids: '4,5',
        name: 'Travis',
        position_group: PositionGroup.QB,
        status: CareerStatus.All,
    } as PlayerQueryDto;

    const opt5 = {
        ids: '4,5',
        name: 'Travis',
        position: Position.QB,
        position_group: PositionGroup.QB,
    } as PlayerQueryDto;

    describe('Constructor', () => {
        it.each([
            [opt1],
            [opt2],
        ])('constructor', (options) => {
            const api = new PlayerQueryAPI(options);
            
            expect(PaginationAPI).toHaveBeenCalledWith(options);

            expect(api.name).toEqual(options.name);
            expect(api.position).toEqual(options.position);
            expect(api.position_group).toEqual(options.position_group);
            expect(api.status).toEqual(options.status);
        });
    });

    describe('buildPlayerWhereClause', () => {
        const result1 = { career_status: { [Op.iLike]: 'ACT' }}
        const result2 = { id: { [Op.eq]: opt2.id }};
        const result3 = { 
            id: { [Op.in]: opt3.ids.split(',') }, 
            full_name: { [Op.iLike]: `%${opt3.name}%` }, 
            career_status: { [Op.notILike]: 'ACT' }
        };
        const result4 = { 
            id: { [Op.in]: opt4.ids.split(',') }, 
            full_name: { [Op.iLike]: `%${opt4.name}%` }, 
        };
        const result5 = { 
            id: { [Op.in]: opt5.ids.split(',') }, 
            full_name: { [Op.iLike]: `%${opt5.name}%` },
            career_status: { [Op.iLike]: 'ACT' }
        };
        it.each([
            [opt1, result1],
            [opt2, result2],
            [opt3, result3],
            [opt4, result4],
            [opt5, result5],
        ])('should return player where clause', (options, whereClause) => {
            const api = new PlayerQueryAPI(options);
            if (options.id) {
                api.id = options.id
            } else if (options.ids) {
                api.ids = options.ids.split(',');
            }
            expect(api.buildPlayerWhereClause()).toEqual(whereClause);
        });
    });

    describe('buildLeagueWhereClause', () => {
        const result2 = {
            position: { [Op.eq]: `${opt2.position}` },
            position_group: { [Op.eq]: `${opt2.position_group}` },
        };
        const result3 = {
            position: { [Op.eq]: `${opt2.position}` },
        }
        const result4 = {
            position_group: { [Op.eq]: `${opt2.position_group}` },
        }
        it.each([
            [opt1, {}],
            [opt2, result2],
            [opt3, result3],
            [opt4, result4],
        ])('should return league where clause', (options, whereClause) => {
            const api = new PlayerQueryAPI(options);
            expect(api.buildLeagueWhereClause()).toEqual(whereClause);
        });
    });
});
