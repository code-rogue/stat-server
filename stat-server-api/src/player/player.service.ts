import BioModel from '@player/models/bio.model';
import { DatabaseService } from '@database/database.service';
import { InitPlayerModels } from '@player/init-models/player.init';
import { 
    Injectable, 
    NotFoundException, 
    InternalServerErrorException  
} from '@nestjs/common';
import LeagueModel from '@player/models/league.model';
import { LogContext } from '@log/log.enums';
import { LogService } from '@log/log.service'; 
import PlayerModel from '@player/models/player.model';
import { PlayerDto, PlayerSummaryDto } from '@interfaces/player/player.dto';
import { PlayerQueryAPI } from '@interfaces/player/player.query.dto';
import type { PlayerSummary } from '@interfaces/types/player.type';
import { 
    PlayerQueryModel, 
    SeasonStatQueryModel, 
    WeeklyStatQueryModel 
} from '@interfaces/player/player.query.model';
import SeasonAdvDefStatModel from '@player/models/season/advanced/season.adv.def.model';
import SeasonAdvPassStatModel from '@player/models/season/advanced/season.adv.pass.model';
import SeasonAdvRecStatModel from '@player/models/season/advanced/season.adv.rec.model';
import SeasonAdvRushStatModel from '@player/models/season/advanced/season.adv.rush.model';
import SeasonStatModel from '@player/models/season/season.model';
import { SeasonStatQueryAPI, WeeklyStatQueryAPI } from '@interfaces/stats/stats.query.dto';
import { SortDirection } from '@app/app.dto';
import WeeklyDefStatModel from '@player/models/weekly/weekly.def.model';
import WeeklyKickStatModel from '@player/models/weekly/weekly.kick.model';
import WeeklyPassStatModel from '@player/models/weekly/weekly.pass.model';
import WeeklyRecStatModel from '@player/models/weekly/weekly.rec.model';
import WeeklyRushStatModel from '@player/models/weekly/weekly.rush.model';
import WeeklyStatModel from '@player/models/weekly/weekly.model';
import WeeklyAdvDefStatModel from '@player/models/weekly/advanced/weekly.adv.def.model';
import WeeklyAdvPassStatModel from '@player/models/weekly/advanced/weekly.adv.pass.model';
import WeeklyAdvRecStatModel from '@player/models/weekly/advanced/weekly.adv.rec.model';
import WeeklyAdvRushStatModel from '@player/models/weekly/advanced/weekly.adv.rush.model';
import WeeklyNextGenPassStatModel from '@player/models/weekly/nextGen/weekly.nextgen.pass.model';
import WeeklyNextGenRecStatModel from '@player/models/weekly/nextGen/weekly.nextgen.rec.model';
import WeeklyNextGenRushStatModel from '@player/models/weekly/nextGen/weekly.nextgen.rush.model';

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
                player => new PlayerSummaryDto(player.toJSON() as PlayerQueryModel),
            );
            
            return { data, total };
        } catch (error) {
            this.logger.error(`Failed to get players`, error.stack, LogContext.PlayerService);
            console.error('GetAll Players Error: ', error);
            return { data: [], total: 0};
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
            return new PlayerDto(player.toJSON() as PlayerQueryModel);
            
        } catch (error) {
            this.logger.error(`Failed to get players`, error.stack, LogContext.PlayerService);
            console.error('GetAll Players Error: ', error);
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

            const statsQuery = new SeasonStatQueryAPI({ player_id });
            statsQuery.sort_direction = SortDirection.DESC;
            const stats = await SeasonStatModel.findAll({
                where: statsQuery.buildWhereClause(),
                include: [ 
                    SeasonAdvDefStatModel,
                    SeasonAdvPassStatModel,
                    SeasonAdvRecStatModel,
                    SeasonAdvRushStatModel
                ],
                order: statsQuery.buildOrderByClause(['season']),
            });
            
            const statEntry = stats[0].toJSON();
            const playerData = player.toJSON() as PlayerQueryModel
            playerData.stats = stats;
            return new PlayerDto(playerData);
            
        } catch (error) {
            this.logger.error(`Failed to get season stats`, error.stack, LogContext.PlayerService);
            console.error('GetAll Players Error: ', error);
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

            const seasonStatsQuery = new SeasonStatQueryAPI({ player_id, seasons: season });
            seasonStatsQuery.sort_direction = SortDirection.DESC;
            const seasonStats = await SeasonStatModel.findOne({
                where: seasonStatsQuery.buildWhereClause(),
                include: [ SeasonAdvDefStatModel, SeasonAdvPassStatModel, SeasonAdvRecStatModel, SeasonAdvRushStatModel ],
                order: seasonStatsQuery.buildOrderByClause(['season']),
            });

            const weeklyStatsQuery = new WeeklyStatQueryAPI({ player_id, seasons: season });
            weeklyStatsQuery.sort_direction = SortDirection.ASC;
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

            const weeks: WeeklyStatQueryModel[] = []
            weeklyStats.forEach(week => {
                weeks.push(week.toJSON() as WeeklyStatQueryModel)
            })
            console.log(`Week 1: ${JSON.stringify(weeks[1])}`)

            const stats = seasonStats.toJSON() as SeasonStatQueryModel;
            stats.weeks = weeks;
            const playerData = player.toJSON() as PlayerQueryModel;
            playerData.stats = [stats];
            
            return new PlayerDto(playerData);
            
        } catch (error) {
            this.logger.error(`Failed to get weekly stats for season`, error.stack, LogContext.PlayerService);
            console.error('GetAll Players Error: ', error);
            throw new InternalServerErrorException(error);
        }
    }
}
