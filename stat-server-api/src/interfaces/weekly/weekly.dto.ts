import {
   TeamModelLabel as team,
   OpponentModelLabel as opponent,
} from '@constants/nfl/service.constants';

import { WeeklyStatQueryModel } from '@interfaces/player/player.query.model';
import { WeeklyAdvDto } from '@interfaces/weekly/advanced/weekly.adv.dto';
import { WeeklyNextGenDto } from '@interfaces/weekly/nextgen/weekly.nextgen.dto';
import { WeeklyStatsDto } from '@interfaces/weekly/weekly.stats.dto';

import type {
   WeeklyAdvancedStats,
   WeeklyNextGenStats,
   WeeklyStats,
} from '@interfaces/types/player.types';
import { TeamDto } from '@interfaces/player/team.dto';

export class WeeklyDto {
   public id: number;
   public game_id: number;
   public pfr_game_id: number;
   public player_id: number;
   public season: string;
   public week: number;
   public game_type: string;
   public team: TeamDto;
   public opponent: TeamDto;
   public fantasy_points: number;
   public fantasy_points_ppr: number;
   public advanced: WeeklyAdvancedStats;
   public nextgen: WeeklyNextGenStats;
   public stats: WeeklyStats;

   constructor(week: WeeklyStatQueryModel) {
      this.id = week.id;
      this.game_id = week.game_id;
      this.pfr_game_id = week.pfr_game_id;
      this.player_id = week.player_id;
      this.season = week.season;
      this.week = week.week;
      this.game_type = week.game_type;
      this.team = new TeamDto(week[team])
      this.opponent = new TeamDto(week[opponent]);
      this.fantasy_points = week.fantasy_points;
      this.fantasy_points_ppr = week.fantasy_points_ppr;
      this.advanced = new WeeklyAdvDto(week);
      this.nextgen = new WeeklyNextGenDto(week);
      this.stats = new WeeklyStatsDto(week);
   }
}