import { SeasonStatQueryModel } from '@interfaces/player/player.query.model';
import { SeasonAdvDto } from '@interfaces/season/season.adv.dto';
import { WeeklyDto } from '@interfaces/weekly/weekly.dto';

import type { SeasonAdvancedStats } from '@interfaces/types/player.types';

export class SeasonDto {
   public id: number;
   public player_id: number;
   public season: string;
   public age: number;
   public games_played: number;
   public games_started: number;
   public fantasy_points: number;
   public fantasy_points_ppr: number;
   public advanced: SeasonAdvancedStats;
   public weeks: WeeklyDto[];

   constructor(season: SeasonStatQueryModel) {
       this.id = season.id;
       this.player_id = season.player_id;
       this.season = season.season;
       this.age = season.age;
       this.games_played = season.games_played;
       this.games_started = season.games_started;
       this.fantasy_points = season.fantasy_points;
       this.fantasy_points_ppr = season.fantasy_points_ppr;
       this.advanced = new SeasonAdvDto(season);

       this.weeks = [];
       season.weeks?.forEach(week => {
           this.weeks.push(new WeeklyDto(week));
       })
   }
}