import * as pinit from '@player/init-models/player.init';

import { AuthGuard } from '@auth/auth.guard';
import { 
    BindOrReplacements, 
    FieldMap, 
    FindAttributeOptions, 
    FindOptions, 
    GroupOption, 
    GroupedCountResultItem, 
    Includeable, 
    IndexHint, 
    LOCK, 
    Model, 
    ModelStatic, 
    Order, 
    Sequelize, 
    Transaction, 
    WhereOptions 
} from 'sequelize';
import BioModel from '@player/models/bio.model';
import { CareerStatus, Position, PositionGroup } from '@interfaces/enums/player.enums';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '@database/database.service';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LeagueModel from '@player/models/league.model';
import { LogContext } from '@log/log.enums';
import { LogService } from '@log/log.service';
import { Options } from 'retry-as-promised';
import PlayerModel from '@player/models/player.model';
import { PlayerService } from '@player/player.service';
import PlayerDto from '@interfaces/player/player.dto';
import PlayerQueryDto from '@interfaces/player/player.query.dto';
import PlayerQueryAPI from '@interfaces/player/player.query.api';
import { PlayerQueryModel, SeasonStatQueryModel } from '@interfaces/player/player.query.model';
import PlayerSummaryDto from '@interfaces/player/player.summary.dto';
import SeasonQueryAPI from '@interfaces/stats/season/season.query.api';
import SeasonStatModel from '@player/models/season/season.model';
import { SortDirection } from '@interfaces/enums/app.enums';
import TeamModel from '@team/models/team.model';
import { Test, TestingModule } from '@nestjs/testing';
import WeeklyAdvDefStatModel from '@player/models/weekly/advanced/weekly.adv.def.model';
import WeeklyAdvPassStatModel from '@player/models/weekly/advanced/weekly.adv.pass.model';
import WeeklyAdvRecStatModel from '@player/models/weekly/advanced/weekly.adv.rec.model';
import WeeklyAdvRushStatModel from '@player/models/weekly/advanced/weekly.adv.rush.model';
import WeeklyDefStatModel from '@player/models/weekly/weekly.def.model';
import WeeklyKickStatModel from '@player/models/weekly/weekly.kick.model';
import WeeklyNextGenPassStatModel from '@player/models/weekly/nextGen/weekly.nextgen.pass.model';
import WeeklyNextGenRecStatModel from '@player/models/weekly/nextGen/weekly.nextgen.rec.model';
import WeeklyNextGenRushStatModel from '@player/models/weekly/nextGen/weekly.nextgen.rush.model';
import WeeklyPassStatModel from '@player/models/weekly/weekly.pass.model';
import WeeklyRecStatModel from '@player/models/weekly/weekly.rec.model';
import WeeklyRushStatModel from '@player/models/weekly/weekly.rush.model';
import WeeklyQueryAPI from '@interfaces/stats/weekly/weekly.query.api';
import WeeklyStatModel from '@player/models/weekly/weekly.model';
import { DraftTeamModelLabel, OpponentModelLabel, TeamModelLabel } from '@constants/nfl/service.constants';

const obj = {};
let mockBuildIncludes = jest.fn();
let mockBuildWhere = jest.fn();
let mockBuildOrderBy = jest.fn();
let mockBuildTeamWhere = jest.fn();

jest.mock('@interfaces/player/player.summary.dto', () => {
    return {
        default: jest.fn().mockImplementation(() => {
            return  {
                id: 1,
                full_name: 'Travis Kelce',
                career_status: 'ACT',
                position: 'TE',
                position_group: 'TE',
                headshot_url: '',
                team: {
                    id: 18,
                    name: 'KC',
                    full_name: 'Kansas City Chiefs',
                    logo_url: 'team_url',
                },
            }
        }),
    };
});

jest.mock('@interfaces/player/player.dto', () => {
    return {
        default: jest.fn().mockImplementation(() => {
            return  {
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
            }
        }),
    };
});

jest.mock('@interfaces/stats/season/season.query.api', () => {
    return {
        default: jest.fn().mockImplementation(() => {
            return  {
                player_id: 5,
                seasons: ['2022', '2023'],
                buildWhereClause: mockBuildWhere,
                buildIncludes: mockBuildIncludes,
                buildOrderByClause: mockBuildOrderBy,
            }
        }),
    };
});

jest.mock('@interfaces/stats/weekly/weekly.query.api', () => {
    return {
        default: jest.fn().mockImplementation(() => {
            return  {
                player_id: 5,
                seasons: ['2022', '2023'],
                weeks: [],
                buildWhereClause: mockBuildWhere,
                buildOrderByClause: mockBuildOrderBy,
            }
        }),
    };
});

jest.mock('@interfaces/player/player.query.api', () => {
    return {
        default: jest.fn().mockImplementation(() => {
            return  {
                name: 'Travis Kelce',
                position: Position.TE,
                position_group: PositionGroup.TE,
                status: CareerStatus.ActiveOnly,
                buildPlayerWhereClause: mockBuildWhere,
                buildLeagueWhereClause: mockBuildWhere,
                buildTeamWhereClause: mockBuildTeamWhere,
                buildOrderByClause: mockBuildOrderBy,
            }
        }),
    };
});

describe('PlayerService', () => {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        username: 'test',
        password: 'testMe',
        database: 'Postgres',
        port: 255,
    });
    
    const playerQuery: PlayerQueryDto = { 
        name: 'Allen',
        position: Position.QB,
        position_group: PositionGroup.QB,
        status: CareerStatus.ActiveOnly,
        limit: 50,
        offset: 0,
    };
    const playerQueryAPI = new PlayerQueryAPI(playerQuery);

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
    const playerSummary = {
        id: 1,
        full_name: 'Travis Kelce',
        career_status: 'ACT',
        position: 'TE',
        position_group: 'TE',
        headshot_url: '',
        team: {
            id: 18,
            name: 'KC',
            full_name: 'Kansas City Chiefs',
            logo_url: 'team_url',
        },
    } as PlayerSummaryDto;
    const season = {
        id: 1,
        player_id: 5,
        season: '2023',
        age: 33,
        games_played: 17,
        games_started: 17,
        fantasy_points: 195,
        fantasy_points_ppr: 247,
        created_date: new Date(),
        last_modified: new Date(),
    } as SeasonStatModel;
    const week = {
        id: 1,
        game_id: 1001,
        pfr_game_id: 1001001,
        player_id: 5,
        season: '2023',
        week: 12,
        game_type: 'REG',
        team: {
            id: 18,
            name: 'KC',
            full_name: 'Kansas City Chiefs',
            logo_url: 'team_url',
        },
        opponent: {
            id: 4,
            name: 'BUF',
            full_name: 'Buffalo Bills',
            logo_url: 'team_url',
        },
        fantasy_points: 9.5,
        fantasy_points_ppr: 14.5,
        created_date: new Date(),
        last_modified: new Date(),
    } as WeeklyStatModel;
        
    const noPlayers = { data: [], total: 0 };
    const playerQueryResult = { rows: [player, player], count: 2 };
    const seasonQueryResult = [season, season];
    const weeklyQueryResult = [week, week];

    let mockConsoleError: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any>;
    let mockFindAll;
    let mockFindAndCountAll: jest.SpyInstance<Promise<{ rows: Model<any, any>[]; count: GroupedCountResultItem[]; }>, [options: { bind?: BindOrReplacements; include?: Includeable | Includeable[]; distinct?: boolean; col?: string; logging?: boolean | ((sql: string, timing?: number) => void); benchmark?: boolean; transaction?: Transaction; where?: WhereOptions<any>; attributes?: FindAttributeOptions; paranoid?: boolean; useMaster?: boolean; order?: Order; limit?: number; groupedLimit?: unknown; offset?: number; lock?: boolean | LOCK | { level: LOCK; of: ModelStatic<Model<any, any>>; }; skipLocked?: boolean; raw?: boolean; having?: WhereOptions<any>; subQuery?: boolean; type?: string; nest?: boolean; plain?: boolean; replacements?: BindOrReplacements; instance?: Model<any, any>; mapToModel?: boolean; retry?: Options; fieldMap?: FieldMap; indexHints?: IndexHint[]; group: GroupOption; }], any>;
    let mockFindOne: jest.SpyInstance<Promise<Model<any, any>>, [options?: FindOptions<any>], any>;
    let mockInitPlayerModels: jest.SpyInstance<void, [sequelize: Sequelize], any>;
    let mockSequelize;

    let service: PlayerService;
    let authGuard: AuthGuard;
    let logService: LogService;
    let databaseService: DatabaseService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            AuthGuard,
            ConfigService,
            DatabaseService,
            JwtService,
            PlayerService,
            {
                provide: LogService,
                useValue: {
                  debug: jest.fn(),
                  notice: jest.fn(),
                  error: jest.fn(),
                },
            },
        ],
        }).compile();

        service = module.get<PlayerService>(PlayerService);
        authGuard = module.get<AuthGuard>(AuthGuard);
        logService = module.get<LogService>(LogService);
        databaseService = module.get<DatabaseService>(DatabaseService);
        
        mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockFindAll = jest.spyOn(Model, 'findAll').mockResolvedValue(seasonQueryResult);
        // @ts-ignore
        mockFindAndCountAll = jest.spyOn(Model, 'findAndCountAll').mockResolvedValue(playerQueryResult);
        mockFindOne = jest.spyOn(Model, 'findOne').mockResolvedValue(player);
        mockInitPlayerModels = jest.spyOn(pinit, 'InitPlayerModels').mockImplementation();        
        mockSequelize = jest.spyOn(databaseService, 'sequelize').mockImplementation(() => sequelize);        

        mockBuildIncludes.mockRestore();
        mockBuildWhere.mockRestore();
        mockBuildTeamWhere.mockRestore();
        mockBuildOrderBy.mockRestore();

        mockBuildIncludes.mockImplementation(() => obj);
        mockBuildWhere.mockImplementation(() => obj);
        mockBuildTeamWhere.mockImplementation(() => obj);
        mockBuildOrderBy.mockImplementation(() => obj);
    });

    describe('Service', () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
            expect(service.sortDefaults).toEqual(['last_name', 'first_name']);
        });
    });

    describe('Search', () => {
        it('should return players', async () => {
            const findAndCountAll = {
                where: obj,
                include: [
                    BioModel,
                    {
                        model: LeagueModel,
                        include: [{
                            model: TeamModel,
                            where: obj,
                        }],
                        where: obj,
                    },
                ],
                order: obj,
                limit: playerQueryAPI.limit,
                offset: playerQueryAPI.offset,
            }
            await expect(service.search(playerQueryAPI)).resolves.toEqual([playerQueryResult.rows, playerQueryResult.count]);
            expect(logService.debug).toHaveBeenCalledWith(
                `Searching for Players: ${JSON.stringify(playerQueryAPI)}`,
                LogContext.PlayerService
            );
            expect(mockSequelize).toHaveBeenCalledTimes(1);            
            expect(mockInitPlayerModels).toHaveBeenCalledWith(sequelize);
            expect(mockFindAndCountAll).toHaveBeenCalledWith(findAndCountAll);
            expect(mockBuildWhere).toHaveBeenCalledTimes(2);
            expect(mockBuildTeamWhere).toHaveBeenCalledTimes(1);
            expect(mockBuildOrderBy).toHaveBeenCalledWith(service.sortDefaults);
        });

        it('should throw error', async () => {
            const error = new Error('Query failed');

            // @ts-ignore
            mockFindAndCountAll = jest.spyOn(Model, 'findAndCountAll').mockRejectedValue(error);

            await expect(service.search(playerQueryAPI)).resolves.toEqual([[], 0]);
            expect(logService.error).toHaveBeenCalledWith(
                `Failed to search for players`,
                error.stack,
                LogContext.PlayerService
            );
            expect(mockConsoleError).toHaveBeenCalledWith('Player Search Error: ', error);
        });
    });

    describe('getAll', () => {
        it.each([
            [0, []],
            [1, [playerSummary]],
            [2, [playerSummary, playerSummary]]
        ])('should return players - test %s', async (total, rows) => {
            const getAllResult = { data: rows, total };

            // @ts-ignore
            const mockSearch = jest.spyOn(service, 'search').mockResolvedValue([rows, total]);
            
            // Returns no players as PlayerSummaryDto is mocked 
            await expect(service.getAll(playerQueryAPI)).resolves.toEqual(getAllResult);
            for(let i = 0; i < total; i++)
                expect(PlayerSummaryDto).toHaveBeenNthCalledWith(i+1, rows[i]);
            
            expect(mockSearch).toHaveBeenCalledWith(playerQueryAPI);
            mockSearch.mockRestore();
        });

        it('should throw error', async () => {
            const error = new Error('Search failed');
            const mockSearch = jest.spyOn(service, 'search').mockRejectedValue(error);
            const internalServerError = new InternalServerErrorException(error);

            await expect(service.getAll(playerQueryAPI)).rejects.toThrow(internalServerError);
            expect(mockSearch).toHaveBeenCalledWith(playerQueryAPI);
            expect(logService.error).toHaveBeenCalledWith(
                `Failed to get players`,
                error.stack,
                LogContext.PlayerService
            );
            expect(mockConsoleError).toHaveBeenCalledWith('GetAll Players Error: ', error);
            mockSearch.mockRestore();
        });
    });

    describe('getById', () => {
        const player_id = 5;
        const findOne = {
            where: obj,
            include: [BioModel, { 
                model: LeagueModel, 
                include: [
                    {
                        model: TeamModel,
                        as: TeamModelLabel,
                    },
                    {
                        model: TeamModel,
                        as: DraftTeamModelLabel,
                    }
                ] 
            }],
        }
        const notFoundError = new NotFoundException(`Player with ID ${player_id} not found`);

        it('should return a player', async () => {
            mockFindOne = jest.spyOn(Model, 'findOne').mockResolvedValue(player);
            await expect(service.getById(player_id)).resolves.toEqual(player);
            expect(mockSequelize).toHaveBeenCalledTimes(1);            
            expect(mockInitPlayerModels).toHaveBeenCalledWith(sequelize);
            expect(PlayerQueryAPI).toHaveBeenCalledWith({ id: player_id });
            expect(mockFindOne).toHaveBeenCalledWith(findOne);
            expect(PlayerDto).toHaveBeenCalledTimes(1);
            expect(PlayerDto).toHaveBeenCalledWith(player);
        });

        it('should return Not Found', async () => {
            mockFindOne = jest.spyOn(Model, 'findOne').mockResolvedValue(null);
            
            await expect(service.getById(player_id)).rejects.toThrow(notFoundError);
            expect(mockSequelize).toHaveBeenCalledTimes(1);            
            expect(mockInitPlayerModels).toHaveBeenCalledWith(sequelize);
            expect(mockFindOne).toHaveBeenCalledWith(findOne);
        });

        it('should throw internal server error', async () => {
            const internalServerError = new InternalServerErrorException(notFoundError);

            mockFindOne = jest.spyOn(Model, 'findOne').mockRejectedValue(notFoundError);

            await expect(service.getById(player_id)).rejects.toThrow(internalServerError);

            expect(logService.error).toHaveBeenCalledWith(
                `Failed to find player`,
                notFoundError.stack,
                LogContext.PlayerService
            );
            expect(mockConsoleError).toHaveBeenCalledWith('getById Players Error: ', notFoundError);
        });
    });

    describe('seasonStats', () => {
        const player_id = 5;
        const findOne = {
            where: obj,
            include: [
                BioModel, 
                { 
                    model: LeagueModel, 
                    include: [
                        {
                            model: TeamModel,
                            as: TeamModelLabel,
                        },
                        {
                            model: TeamModel,
                            as: DraftTeamModelLabel,
                        }
                    ]
                },
                SeasonStatModel
            ],
        }
        const findAll = {
            where: obj,
            include: obj,
            order: obj,
        }
        const notFoundError = new NotFoundException(`Player with ID ${player_id} not found`);

        it('should return season stats for player', async () => {
            mockBuildIncludes.mockClear();
            mockBuildWhere.mockClear();
            mockBuildOrderBy.mockClear();

            mockFindOne = jest.spyOn(Model, 'findOne').mockResolvedValue(player);
            mockFindAll = jest.spyOn(Model, 'findAll').mockResolvedValue(seasonQueryResult);

            // PlayerDto is mocked to olnly return player
            await service.seasonStats(player_id);
            
            expect(mockSequelize).toHaveBeenCalledTimes(1);            
            expect(mockInitPlayerModels).toHaveBeenCalledWith(sequelize);
            expect(PlayerQueryAPI).toHaveBeenCalledWith({ id: player_id });
            expect(mockFindOne).toHaveBeenCalledWith(findOne);
            
            expect(SeasonQueryAPI).toHaveBeenCalledWith({player_id, sort_direction: SortDirection.DESC});
            expect(mockFindAll).toHaveBeenCalledWith(findAll);

            expect(mockBuildWhere).toHaveBeenCalledTimes(2);
            expect(mockBuildIncludes).toHaveBeenCalledWith(sequelize, player);
            expect(mockBuildOrderBy).toHaveBeenNthCalledWith(1, ['season']);

            const playerData = player as PlayerQueryModel;
            playerData.stats = seasonQueryResult;
            expect(PlayerDto).toHaveBeenCalledWith(playerData);
        });

        it('should return Not Found', async () => {
            mockFindOne = jest.spyOn(Model, 'findOne').mockResolvedValue(null);
            
            await expect(service.seasonStats(player_id)).rejects.toThrow(notFoundError);
            expect(mockSequelize).toHaveBeenCalledTimes(1);            
            expect(mockInitPlayerModels).toHaveBeenCalledWith(sequelize);
            expect(mockFindOne).toHaveBeenCalledWith(findOne);
        });

        it('should throw internal server error', async () => {
            const internalServerError = new InternalServerErrorException(notFoundError);
            mockFindOne = jest.spyOn(Model, 'findOne').mockRejectedValue(notFoundError);

            await expect(service.seasonStats(player_id)).rejects.toThrow(internalServerError);

            expect(logService.error).toHaveBeenCalledWith(
                `Failed to find season stats`,
                notFoundError.stack,
                LogContext.PlayerService
            );
            expect(mockConsoleError).toHaveBeenCalledWith('seasonStats Error: ', notFoundError);
        });
    });

    describe('seasonWeeklyStats', () => {
        const player_id = 5;
        const seasons = '2022,2023';
        const findOnePlayer = {
            where: obj,
            include: [
                BioModel, 
                { 
                    model: LeagueModel, 
                    include: [
                        {
                            model: TeamModel,
                            as: TeamModelLabel,
                        },
                        {
                            model: TeamModel,
                            as: DraftTeamModelLabel,
                        }
                    ]
                },
            ],
        }
        const findOneSeason = {
            where: obj,
            include: obj,
            order: obj,
        }
        const findAll = {
            where: obj,
            include: [ 
                WeeklyDefStatModel,
                WeeklyKickStatModel,
                WeeklyPassStatModel,
                WeeklyRecStatModel,
                WeeklyRushStatModel,
                WeeklyAdvDefStatModel,
                WeeklyAdvPassStatModel,
                WeeklyAdvRecStatModel,
                WeeklyAdvRushStatModel,
                WeeklyNextGenPassStatModel,
                WeeklyNextGenRecStatModel,
                WeeklyNextGenRushStatModel,
                {
                    model: TeamModel,
                    as: TeamModelLabel,
                },
                {
                    model: TeamModel,
                    as: OpponentModelLabel,
                },
            ],
            order: obj,
        }
        const notFoundError = new NotFoundException(`Player with ID ${player_id} not found`);

        it('should return weekly stats for player for given season', async () => {
            mockBuildIncludes.mockClear();
            mockBuildWhere.mockClear();
            mockBuildOrderBy.mockClear();
            mockFindOne.mockRestore();
            mockFindAll.mockRestore();

            mockFindOne = jest.spyOn(Model, 'findOne')
                .mockResolvedValueOnce(player)
                .mockResolvedValue(season);
            mockFindAll = jest.spyOn(Model, 'findAll').mockResolvedValue(weeklyQueryResult);

            // PlayerDto is mocked to olnly return player
            await service.seasonWeeklyStats(player_id, seasons);
            
            expect(mockSequelize).toHaveBeenCalledTimes(1);            
            expect(mockInitPlayerModels).toHaveBeenCalledWith(sequelize);
            expect(PlayerQueryAPI).toHaveBeenCalledWith({ id: player_id });
            expect(mockFindOne).toHaveBeenNthCalledWith(1, findOnePlayer);
            
            expect(SeasonQueryAPI).toHaveBeenCalledWith({
                player_id,
                seasons,
                sort_direction: SortDirection.DESC});
            expect(mockFindOne).toHaveBeenNthCalledWith(2, findOneSeason);

            expect(WeeklyQueryAPI).toHaveBeenCalledWith({
                player_id,
                seasons,
                sort_direction: SortDirection.ASC
            });
            expect(mockFindAll).toHaveBeenCalledWith(findAll);

            
            expect(mockBuildIncludes).toHaveBeenCalledWith(sequelize, player);
            expect(mockBuildWhere).toHaveBeenCalledTimes(3);
            expect(mockBuildOrderBy).toHaveBeenNthCalledWith(1, ['season']);
            expect(mockBuildOrderBy).toHaveBeenNthCalledWith(2, ['week']);

            const stats = season as SeasonStatQueryModel;
            stats.weeks = weeklyQueryResult;
            const playerData = player as PlayerQueryModel;
            playerData.stats = [stats];
            expect(PlayerDto).toHaveBeenCalledWith(playerData);
        });

        it('should return Not Found', async () => {
            mockFindOne = jest.spyOn(Model, 'findOne').mockResolvedValue(null);
            
            await expect(service.seasonWeeklyStats(player_id, seasons)).rejects.toThrow(notFoundError);
            expect(mockSequelize).toHaveBeenCalledTimes(1);            
            expect(mockInitPlayerModels).toHaveBeenCalledWith(sequelize);
            expect(mockFindOne).toHaveBeenCalledWith(findOnePlayer);
        });

        it('should throw internal server error', async () => {
            const internalServerError = new InternalServerErrorException(notFoundError);
            mockFindOne = jest.spyOn(Model, 'findOne').mockRejectedValue(notFoundError);

            await expect(service.seasonWeeklyStats(player_id, seasons)).rejects.toThrow(internalServerError);

            expect(logService.error).toHaveBeenCalledWith(
                `Failed to find weekly stats for season`,
                notFoundError.stack,
                LogContext.PlayerService
            );
            expect(mockConsoleError).toHaveBeenCalledWith('seasonWeeklyStats Error: ', notFoundError);
        });
    });
});
