import * as ut from '@player/utils/player.utils';
import * as db from '@database/database.utils';

import PaginationAPI from '@interfaces/pagination.api';
import PlayerModel from '@player/models/player.model';
import SeasonQueryAPI from '@interfaces/stats/season/season.query.api';
import SeasonQueryDto from '@interfaces/stats/season/season.query.dto';
import { Op, Sequelize } from 'sequelize';

import SeasonAdvDefStatModel from '@player/models/season/advanced/season.adv.def.model';
import SeasonAdvPassStatModel from '@player/models/season/advanced/season.adv.pass.model';
import SeasonAdvRecStatModel from '@player/models/season/advanced/season.adv.rec.model';
import SeasonAdvRushStatModel from '@player/models/season/advanced/season.adv.rush.model';

jest.mock('@interfaces/pagination.api');

describe('Season Query API', () => {
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

    let mockTwoColumnSeasonJoin;

    beforeEach(async () => {
        mockTwoColumnSeasonJoin = jest.spyOn(db, 'twoColumnSeasonJoin').mockReturnValue({});
    });

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

    describe('buildIncludes', () => {
        const sequelize = new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            username: 'test',
            password: 'testMe',
            database: 'Postgres',
            port: 255,
        });
        
        const player = {
            id: 1,
            career_status: 'ACT',
            game_status_abbr: 'ACT',
            game_status: 'Active',
            esb_id: '',
            gsis_id: '00-0030506',
            gsis_it_id: '',
            smart_id: '',
            pfr_id: 'KelcTr00',
            full_name: 'Travis Kelce',
            first_name: 'Travis',
            last_name: 'Kelce',
            short_name: 'T. Kelce',
            suffix:  ''
        } as PlayerModel;

        const offensiveResult = [
            SeasonAdvPassStatModel,
            SeasonAdvRecStatModel,
            SeasonAdvRushStatModel,
            {}, {}, {}
        ];
        const defensiveResult = [ SeasonAdvDefStatModel, {} ];
        const KickerResult = [ {} ];
        const allResult = [ 
            SeasonAdvDefStatModel,
            SeasonAdvPassStatModel,
            SeasonAdvRecStatModel,
            SeasonAdvRushStatModel,
            {}, {}, {}, {}, {}
         ];

        it.each([
            [false, false, false, allResult],
            [true, false, false, offensiveResult],
            [false, true, false, defensiveResult],
            [false, false, true, KickerResult],
            [true, true, false, offensiveResult],
            [false, true, true, defensiveResult],
            [true, true, true, offensiveResult],
        ])('should return where clause', (isOff, isDef, isKick, result) => {
            const mockIsOffensivePlayer = jest.spyOn(ut, 'isDefensivePlayer').mockReturnValue(isDef);
            const mockIsDefensivePlayer = jest.spyOn(ut, 'isKicker').mockReturnValue(isKick);
            const mockIsKicker = jest.spyOn(ut, 'isOffensivePlayer').mockReturnValue(isOff);
            
            const api = new SeasonQueryAPI(opt1);
            expect(api.buildIncludes(sequelize, player)).toEqual(result);

            mockIsOffensivePlayer.mockRestore();
            mockIsDefensivePlayer.mockRestore();
            mockIsKicker.mockRestore();
        });
    });
});
