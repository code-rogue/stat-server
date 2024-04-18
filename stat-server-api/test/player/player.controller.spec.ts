import { AuthGuard } from '@auth/auth.guard';
import { ConfigService } from '@nestjs/config';
import { PlayerController } from '@player/player.controller';
import { PlayerService } from '@player/player.service';
//import { LogService } from '@log/log.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { LogService } from '@log/log.service';
import { JwtService } from '@nestjs/jwt';
import { PlayerDto } from '@interfaces/player/player.dto';
import { 
    CareerStatus,
    PlayerQueryAPI, 
    PlayerQueryDto, 
    Position, 
    PositionGroup 
} from '@interfaces/player/player.query.dto';
import { PlayerSummary } from '@interfaces/types/player.type';

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
        team: '',
        team_display_name: '',
        team_seq: '',
        team_id: '',
        rookie_year: '',
        draft_team: '',
        draft_number: '',
        draft_round: '',
        season: '',
        stats: [],
    };

    let mockGetAll: jest.SpyInstance<Promise<PlayerSummary>, [query: PlayerQueryAPI], any>;
    let mockGetById;
    let mockSeasonStats;
    let mockSeasonWeeklyStats;

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
