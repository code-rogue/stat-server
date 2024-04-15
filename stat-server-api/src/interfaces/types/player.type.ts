import { PlayerSummaryDto } from '@interfaces/player/player.dto';
import {
   SeasonAdvDefQueryModel,
   SeasonAdvPassQueryModel,
   SeasonAdvRecQueryModel,
   SeasonAdvRushQueryModel,
   WeeklyAdvDefQueryModel,
   WeeklyAdvPassQueryModel,
   WeeklyAdvRecQueryModel,
   WeeklyAdvRushQueryModel,
} from '@interfaces/stats/advStats.query.model';
import {
   WeeklyDefQueryModel,
   WeeklyKickQueryModel,
   WeeklyPassQueryModel,
   WeeklyRecQueryModel,
   WeeklyRushQueryModel,
} from '@interfaces/stats/stats.query.model';
import {
   WeeklyNextGenPassQueryModel,
   WeeklyNextGenRecQueryModel,
   WeeklyNextGenRushQueryModel,
} from '@interfaces/stats/nextGenStats.query.model';

export type PlayerSummary = {
    data: PlayerSummaryDto[], 
    total: number
}

export type SeasonAdvancedStats = {
    def?: SeasonAdvDefQueryModel,
    pass?: SeasonAdvPassQueryModel,
    rec?: SeasonAdvRecQueryModel,
    rush?: SeasonAdvRushQueryModel,
}

export type WeeklyAdvancedStats = {
    def?: WeeklyAdvDefQueryModel,
    pass?: WeeklyAdvPassQueryModel,
    rec?: WeeklyAdvRecQueryModel,
    rush?: WeeklyAdvRushQueryModel,
}

export type WeeklyNextGenStats = {
    pass?: WeeklyNextGenPassQueryModel,
    rec?: WeeklyNextGenRecQueryModel,
    rush?: WeeklyNextGenRushQueryModel,
}

export type WeeklyStats = {
    def?: WeeklyDefQueryModel,
    kick?: WeeklyKickQueryModel,
    pass?: WeeklyPassQueryModel,
    rec?: WeeklyRecQueryModel,
    rush?: WeeklyRushQueryModel,
}