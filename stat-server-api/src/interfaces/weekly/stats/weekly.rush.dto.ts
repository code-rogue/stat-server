import { WeeklyRushQueryModel } from '@interfaces/stats/query.model';

export class WeeklyRushDto {
   public carries?: number;
   public rush_yards?: number;
   public rush_first_downs?: number;
   public rush_epa?: number;
   public rush_tds?: number;
   public rush_two_pt_conversions?: number;
   public rush_fumbles?: number;
   public rush_fumbles_lost?: number;
   public special_teams_tds?: number;

   constructor(stats?: WeeklyRushQueryModel) {
       this.carries = stats?.carries;
       this.rush_yards = stats?.rush_yards;
       this.rush_first_downs = stats?.rush_first_downs;
       this.rush_epa = stats?.rush_epa;
       this.rush_tds = stats?.rush_tds;
       this.rush_two_pt_conversions = stats?.rush_two_pt_conversions;
       this.rush_fumbles = stats?.rush_fumbles;
       this.rush_fumbles_lost = stats?.rush_fumbles_lost;
       this.special_teams_tds = stats?.special_teams_tds;
   }
}