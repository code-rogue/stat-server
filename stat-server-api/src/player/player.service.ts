import BioModel from '@player/models/bio.model';
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
import SeasonAdvDefStatModel from '@player/models/season/advanced/season.adv.def.model';
import SeasonAdvPassStatModel from '@player/models/season/advanced/season.adv.pass.model';
import SeasonAdvRecStatModel from '@player/models/season/advanced/season.adv.rec.model';
import SeasonAdvRushStatModel from '@player/models/season/advanced/season.adv.rush.model';
import SeasonDefStatModel from '@player/models/season/season.def.model';
import SeasonKickStatModel from '@player/models/season/season.kick.model';
import SeasonPassStatModel from '@player/models/season/season.pass.model';
import SeasonRecStatModel from '@player/models/season/season.rec.model';
import SeasonRushStatModel from '@player/models/season/season.rush.model';
import SeasonStatModel from '@player/models/season/season.model';
import SeasonQueryAPI from '@interfaces/stats/season/season.query.api';
import { TwoColumnSeasonJoin } from '@database/database.utils';
import WeeklyQueryAPI from '@interfaces/stats/weekly/weekly.query.api';
import { SortDirection } from '@interfaces/enums/app.enums';
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

import { 
    SeasonModelLabel, 
    SeasonDefModelLabel,
    SeasonKickModelLabel,
    SeasonPassModelLabel,
    SeasonRecModelLabel,
    SeasonRushModelLabel 
} from '@constants/nfl/service.constants';

import type { PlayerSummary } from '@interfaces/types/player.types';

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
                include: [ BioModel, LeagueModel ],
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
                include: [ BioModel, LeagueModel, SeasonStatModel ],
            });

            if (!player) {
                throw new NotFoundException(`Player with ID ${player_id} not found`);
            }

            const statsQuery = new SeasonQueryAPI({ player_id, sort_direction: SortDirection.DESC });
            const stats = await SeasonStatModel.findAll({
                where: statsQuery.buildWhereClause(),
                include: [ 
                    SeasonAdvDefStatModel,
                    SeasonAdvPassStatModel,
                    SeasonAdvRecStatModel,
                    SeasonAdvRushStatModel,
                    TwoColumnSeasonJoin(sequelize, SeasonDefStatModel, SeasonModelLabel, SeasonDefModelLabel),
                    TwoColumnSeasonJoin(sequelize, SeasonKickStatModel, SeasonModelLabel, SeasonKickModelLabel),
                    TwoColumnSeasonJoin(sequelize, SeasonPassStatModel, SeasonModelLabel, SeasonPassModelLabel),
                    TwoColumnSeasonJoin(sequelize, SeasonRecStatModel, SeasonModelLabel, SeasonRecModelLabel),
                    TwoColumnSeasonJoin(sequelize, SeasonRushStatModel, SeasonModelLabel, SeasonRushModelLabel),
                ],
                order: statsQuery.buildOrderByClause(['season']),
            });
            
            const playerData = player as PlayerQueryModel;
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
            
            const query = new PlayerQueryAPI({ id: player_id });
            const player = await PlayerModel.findOne({
                where: query.buildPlayerWhereClause(),
                include: [ BioModel, LeagueModel ],
            });

            if (!player) {
                throw new NotFoundException(`Player with ID ${player_id} not found`);
            }

            const seasonStatsQuery = new SeasonQueryAPI({ 
                player_id, 
                seasons: season,
                sort_direction: SortDirection.DESC
            });
            const seasonStats = await SeasonStatModel.findOne({
                where: seasonStatsQuery.buildWhereClause(),
                include: [ SeasonAdvDefStatModel, SeasonAdvPassStatModel, SeasonAdvRecStatModel, SeasonAdvRushStatModel ],
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
                ],
                order: weeklyStatsQuery.buildOrderByClause(['week']),
            });

            const stats = seasonStats as SeasonStatQueryModel;
            stats.weeks = weeklyStats;
            const playerData = player as PlayerQueryModel;
            playerData.stats = [stats];
            
            return new PlayerDto(playerData);
            
        } catch (error) {
            this.logger.error(`Failed to find weekly stats for season`, error.stack, LogContext.PlayerService);
            console.error('seasonWeeklyStats Error: ', error);
            throw new InternalServerErrorException(error);
        }
    }
}
