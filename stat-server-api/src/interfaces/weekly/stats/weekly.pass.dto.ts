import { WeeklyPassQueryModel } from '@interfaces/stats/query.model';

export class WeeklyPassDto {
   public attempts?: number;
   public completions?: number;
   public pass_yards?: number;
   public pass_yards_after_catch?: number;
   public pass_air_yards?: number;
   public pass_air_conversion_ratio?: number;
   public pass_first_down?: number;
   public dakota?: number;
   public pass_epa?: number;
   public pass_tds?: number;
   public pass_two_pt_conversions?: number;
   public interceptions?: number;
   public sacks?: number;
   public sack_yards?: number;
   public sack_fumbles?: number;
   public sack_fumbles_lost?: number;

   constructor(stats?: WeeklyPassQueryModel) {
       this.attempts = stats?.attempts;
       this.completions = stats?.completions;
       this.pass_yards = stats?.pass_yards;
       this.pass_yards_after_catch = stats?.pass_yards_after_catch;
       this.pass_air_yards = stats?.pass_air_yards;
       this.pass_air_conversion_ratio = stats?.pass_air_conversion_ratio;
       this.pass_first_down = stats?.pass_first_down;
       this.dakota = stats?.dakota;
       this.pass_epa = stats?.pass_epa;
       this.pass_tds = stats?.pass_tds;
       this.pass_two_pt_conversions = stats?.pass_two_pt_conversions;
       this.interceptions = stats?.interceptions;
       this.sacks = stats?.sacks;
       this.sack_yards = stats?.sack_yards;
       this.sack_fumbles = stats?.sack_fumbles;
       this.sack_fumbles_lost = stats?.sack_fumbles_lost;
   }
}