import * as pinit from '@player/init-models/player.init';

import { AuthGuard } from '@auth/auth.guard';
import BioModel from '@player/models/bio.model';
import { 
    CareerStatus,
    PlayerQueryAPI, 
    PlayerQueryDto, 
    Position, 
    PositionGroup 
} from '@interfaces/player/player.query.dto';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '@database/database.service';
import { JwtService } from '@nestjs/jwt';
import LeagueModel from '@player/models/league.model';
import { LogContext } from '@log/log.enums';
import { LogService } from '@log/log.service';
import PlayerModel from '@player/models/player.model';
import { PlayerService } from '@player/player.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BindOrReplacements, FieldMap, FindAttributeOptions, GroupOption, GroupedCountResultItem, Includeable, IndexHint, LOCK, Model, ModelStatic, Order, Sequelize, Transaction, WhereOptions } from 'sequelize';
import { Options } from 'retry-as-promised';

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
        career_status: '',
        game_status_abbr: '',
        game_status: '',
        esb_id: '',
        gsis_id: '',
        gsis_it_id: '',
        smart_id: '',
        pfr_id: '',
        full_name: '',
        first_name: '',
        last_name: '',
        short_name: '',
        suffix:  ''
    } as PlayerModel;
    
    const players = { data: [player], total: 1 };
    const playerQueryResult = { rows: [player], count: 1 };
    const obj = {};

    let mockConsoleError: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any>;
    let mockbuildPlayerWhereClause;
    let mockbuildLeagueWhereClause;
    let mockbuildOrderByClause: jest.SpyInstance<any, [defaultSort: string[]], any>;
    let mockFindAndCountAll: jest.SpyInstance<Promise<{ rows: Model<any, any>[]; count: GroupedCountResultItem[]; }>, [options: { bind?: BindOrReplacements; include?: Includeable | Includeable[]; distinct?: boolean; col?: string; logging?: boolean | ((sql: string, timing?: number) => void); benchmark?: boolean; transaction?: Transaction; where?: WhereOptions<any>; attributes?: FindAttributeOptions; paranoid?: boolean; useMaster?: boolean; order?: Order; limit?: number; groupedLimit?: unknown; offset?: number; lock?: boolean | LOCK | { level: LOCK; of: ModelStatic<Model<any, any>>; }; skipLocked?: boolean; raw?: boolean; having?: WhereOptions<any>; subQuery?: boolean; type?: string; nest?: boolean; plain?: boolean; replacements?: BindOrReplacements; instance?: Model<any, any>; mapToModel?: boolean; retry?: Options; fieldMap?: FieldMap; indexHints?: IndexHint[]; group: GroupOption; }], any>;
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
        mockbuildPlayerWhereClause = jest.spyOn(PlayerQueryAPI.prototype, 'buildPlayerWhereClause').mockReturnValue(obj);
        mockbuildLeagueWhereClause = jest.spyOn(PlayerQueryAPI.prototype, 'buildLeagueWhereClause').mockReturnValue(obj);
        mockbuildOrderByClause = jest.spyOn(PlayerQueryAPI.prototype, 'buildOrderByClause').mockReturnValue(obj);
        // @ts-ignore
        mockFindAndCountAll = jest.spyOn(Model, 'findAndCountAll').mockResolvedValue(playerQueryResult);
        mockInitPlayerModels = jest.spyOn(pinit, 'InitPlayerModels').mockImplementation();        
        mockSequelize = jest.spyOn(databaseService, 'sequelize').mockImplementation(() => sequelize);        
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
            expect(mockbuildPlayerWhereClause).toHaveBeenCalledTimes(1);
            expect(mockbuildLeagueWhereClause).toHaveBeenCalledTimes(1);
            expect(mockbuildOrderByClause).toHaveBeenCalledWith(service.sortDefaults);
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
});
