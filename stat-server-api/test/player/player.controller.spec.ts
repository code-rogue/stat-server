import { AuthGuard } from '@auth/auth.guard';
import { CareerStatus, Position, PositionGroup } from '@interfaces/enums/player.enums';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '@database/database.service';
import { JwtService } from '@nestjs/jwt';
import { LogService } from '@log/log.service';
import { PlayerController } from '@player/player.controller';
import PlayerDto from '@interfaces/player/player.dto';
import PlayerQueryDto from '@interfaces/player/player.query.dto';
import PlayerQueryAPI from '@interfaces/player/player.query.api';
import { PlayerService } from '@player/player.service';
import { PlayerSummary } from '@interfaces/types/player.types';
import { TeamDto } from '@interfaces/player/team.dto';
import { Test, TestingModule } from '@nestjs/testing';

describe('PlayerController', () => {
    const playerQuery: PlayerQueryDto = { 
        name: 'Allen',
        position: Position.QB,
        position_group: PositionGroup.QB,
        status: CareerStatus.ActiveOnly,
    };
    const players = { data: [], total: 0 };

    const player: PlayerDto = { 
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
        suffix: '',
        birth_date: new Date(),
        college: '',
        college_conference: '',
        height: 0,
        weight: 0,
        headshot_url: '',
        position_group: '',
        position: '',
        jersey_number: 0,
        years_of_experience: 0,
        team: {
            id: 18,
            name: 'KC',
            full_name: 'Kansas City Chiefs',
            logo_url: 'team_url',
        },
        rookie_year: '',
        draft_team: '',
        draft_number: '',
        draft_round: '',
        season: '',
        stats: [],
    };

    let mockGetAll: jest.SpyInstance<Promise<PlayerSummary>, [query: PlayerQueryAPI], any>;
    let mockGetById: jest.SpyInstance<Promise<PlayerDto>, [id: number], any>;
    let mockSeasonStats: jest.SpyInstance<Promise<PlayerDto>, [player_id: number], any>;
    let mockSeasonWeeklyStats: jest.SpyInstance<Promise<PlayerDto>, [player_id: number, season: string], any>;

    let service: PlayerService;
    let controller: PlayerController;
    let authGuard: AuthGuard;
    let logService: LogService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [PlayerController],
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

        controller = module.get<PlayerController>(PlayerController);
        service = module.get<PlayerService>(PlayerService);
        authGuard = module.get<AuthGuard>(AuthGuard);
        logService = module.get<LogService>(LogService);
        mockGetAll = jest.spyOn(service, 'getAll').mockReturnValue(Promise.resolve(players));
        mockGetById = jest.spyOn(service, 'getById').mockReturnValue(Promise.resolve(player));
        mockSeasonStats = jest.spyOn(service, 'seasonStats').mockReturnValue(Promise.resolve(player));
        mockSeasonWeeklyStats = jest.spyOn(service, 'seasonWeeklyStats').mockReturnValue(Promise.resolve(player));
    });

    describe('Controller', () => {
        it('should be defined', () => {
            expect(controller).toBeDefined();
        });
    });

    describe('GET /players', () => {
        it('should return Player Summary Collection', async () => {
            const playerQueryAPI = new PlayerQueryAPI(playerQuery)

            expect(await controller.getPlayers(playerQuery)).toEqual(players);
            expect(mockGetAll).toHaveBeenCalledWith(playerQueryAPI);
        });
    });

    describe('GET /players/{id}', () => {
        it('should return Player Resource', async () => {
            const playerQueryAPI = new PlayerQueryAPI(playerQuery)

            expect(await controller.getPlayerById(1001)).toEqual(player);
            expect(mockGetById).toHaveBeenCalledWith(1001);
        });
    });

    describe('GET /players/{id}/seasons', () => {
        it('should return season stats', async () => {
            expect(await controller.getPlayerSeasonStats(2001)).toEqual(player);
            expect(mockSeasonStats).toHaveBeenCalledWith(2001);
        });
    });

    describe('GET /players/{id}/seasons/{season}', () => {
        it('should return weekly stats for a season', async () => {
            expect(await controller.getPlayerSeasonWeeklyStats(2001, '2023')).toEqual(player);
            expect(mockSeasonWeeklyStats).toHaveBeenCalledWith(2001, '2023');
        });
    });
});
