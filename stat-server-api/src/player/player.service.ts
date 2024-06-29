import BioModel from '@player/models/bio.model';
import { CareerStatus } from '@interfaces/enums/player.enums';
import { DatabaseService } from '@database/database.service';
import { InitPlayerModels } from '@player/init-models/player.init';
import { 
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import LeagueModel from '@player/models/league.model';
import { LogContext } from '@log/log.enums';
import { LogService } from '@log/log.service'; 
import PlayerDto from '@interfaces/player/player.dto';
import PlayerModel from '@player/models/player.model';
import PlayerQueryAPI from '@interfaces/player/player.query.api';
import { 
    PlayerQueryModel, 
    SeasonStatQueryModel, 
} from '@interfaces/player/player.query.model';
import PlayerSummaryDto from '@interfaces/player/player.summary.dto';
import SeasonStatModel from '@player/models/season/season.model';
import SeasonQueryAPI from '@interfaces/stats/season/season.query.api';
import WeeklyQueryAPI from '@interfaces/stats/weekly/weekly.query.api';
import { SortDirection } from '@interfaces/enums/app.enums';
import TeamModel from '@team/models/team.model';
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
import WeeklyStatModel from '@player/models/weekly/weekly.model';

import type { PlayerSummary } from '@interfaces/types/player.types';
import { DraftTeamModelLabel, OpponentModelLabel, TeamModelLabel } from '@constants/nfl/service.constants';

@Injectable()
export class PlayerService {
    public sortDefaults: string[];

    constructor(
        private readonly database: DatabaseService,
        private readonly logger: LogService
    ) {
        this.sortDefaults = ['last_name', 'first_name'];
    }

    async search(query: PlayerQueryAPI): Promise<[PlayerModel[], number]> {
        try {
            this.logger.debug(`Searching for Players: ${JSON.stringify(query)}`, LogContext.PlayerService);
            
            const { limit, offset } = query;

            const sequelize = this.database.sequelize();
            InitPlayerModels(sequelize);

            const players = await PlayerModel.findAndCountAll({
                where: query.buildPlayerWhereClause(),
                include: [
                    BioModel,
                    {
                        model: LeagueModel,
                        include: [{
                            model: TeamModel,
                            where: query.buildTeamWhereClause(),    
                        }],
                        where: query.buildLeagueWhereClause(),
                    },
                ],
                order: query.buildOrderByClause(this.sortDefaults),
                limit,
                offset,
        });
        return [players.rows, players.count];
        } catch (error) {
            this.logger.error(`Failed to search for players`, error.stack, LogContext.PlayerService);
            console.error('Player Search Error: ', error);
            return [[], 0];
        }
    }

    async getAll(query: PlayerQueryAPI): Promise<PlayerSummary> {
        try {
            const [players, total] = await this.search(query);
            const data = players.map(
                player => new PlayerSummaryDto(player),
            );
            
            return { data, total };
        } catch (error) {
            this.logger.error(`Failed to get players`, error.stack, LogContext.PlayerService);
            console.error('GetAll Players Error: ', error);
            throw new InternalServerErrorException(error);
        }
    }

    async getById(id: number): Promise<PlayerDto> {
        try {
            const sequelize = this.database.sequelize();
            InitPlayerModels(sequelize);
            
            const query = new PlayerQueryAPI({ id });
            const player = await PlayerModel.findOne({
                where: query.buildPlayerWhereClause(),
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
            });

            if (!player) {
                throw new NotFoundException(`Player with ID ${id} not found`);
            }
            return new PlayerDto(player);
            
        } catch (error) {
            this.logger.error(`Failed to find player`, error.stack, LogContext.PlayerService);
            console.error('getById Players Error: ', error);
            throw new InternalServerErrorException(error);
        }
    }

    async seasonStats(player_id: number): Promise<PlayerDto> {
        try {
            const sequelize = this.database.sequelize();
            InitPlayerModels(sequelize);
            
            const query = new PlayerQueryAPI({ id: player_id });
            const player = await PlayerModel.findOne({
                where: query.buildPlayerWhereClause(),
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
            });

            if (!player) {
                throw new NotFoundException(`Player with ID ${player_id} not found`);
            }

            const playerData = player as PlayerQueryModel;

            const statsQuery = new SeasonQueryAPI({ player_id, sort_direction: SortDirection.DESC });
            const stats = await SeasonStatModel.findAll({
                where: statsQuery.buildWhereClause(),
                include: statsQuery.buildIncludes(sequelize, playerData),
                order: statsQuery.buildOrderByClause(['season']),
            });
            
            
            playerData.stats = stats;
            return new PlayerDto(playerData);
            
        } catch (error) {
            this.logger.error(`Failed to find season stats`, error.stack, LogContext.PlayerService);
            console.error('seasonStats Error: ', error);
            throw new InternalServerErrorException(error);
        }
    }

    async seasonWeeklyStats(player_id: number, season: string): Promise<PlayerDto> {
        try {
            const sequelize = this.database.sequelize();
            InitPlayerModels(sequelize);
            
            const query = new PlayerQueryAPI({ id: player_id, status: CareerStatus.All });
            const player = await PlayerModel.findOne({
                where: query.buildPlayerWhereClause(),
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
            });

            if (!player) {
                throw new NotFoundException(`Player with ID ${player_id} not found`);
            }

            const playerData = player as PlayerQueryModel;

            const seasonStatsQuery = new SeasonQueryAPI({ 
                player_id, 
                seasons: season,
                sort_direction: SortDirection.DESC
            });
            const seasonStats = await SeasonStatModel.findOne({
                where: seasonStatsQuery.buildWhereClause(),
                include: seasonStatsQuery.buildIncludes(sequelize, playerData),
                order: seasonStatsQuery.buildOrderByClause(['season']),
            });

            const weeklyStatsQuery = new WeeklyQueryAPI({ 
                player_id, 
                seasons: season,
                sort_direction: SortDirection.ASC
            });
            const weeklyStats = await WeeklyStatModel.findAll({
                where: weeklyStatsQuery.buildWhereClause(),
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
                order: weeklyStatsQuery.buildOrderByClause(['week']),
            });

            if(seasonStats !== null) {
                const stats = seasonStats as SeasonStatQueryModel;
                stats.weeks = weeklyStats;
                playerData.stats = [stats];
            }
            return new PlayerDto(playerData);
            
        } catch (error) {
            this.logger.error(`Failed to find weekly stats for season`, error.stack, LogContext.PlayerService);
            console.error('seasonWeeklyStats Error: ', error);
            throw new InternalServerErrorException(error);
        }
    }
}
