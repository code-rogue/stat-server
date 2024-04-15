import { WeeklyRecQueryModel } from '@interfaces/stats/stats.query.model';

export class WeeklyRecDto {
   public targets?: number;
   public receptions?: number;
   public target_share?: number;
   public rec_yards?: number;
   public rec_yards_after_catch?: number;
   public rec_air_yards?: number;
   public rec_air_yards_share?: number;
   public rec_air_conversion_ratio?: number;
   public weighted_opportunity_rating?: number;
   public rec_epa?: number;
   public rec_tds?: number;
   public rec_two_pt_conversions?: number;
   public rec_first_downs?: number;
   public rec_fumbles?: number;
   public rec_fumbles_lost?: number;

   constructor(stats?: WeeklyRecQueryModel) {
       this.targets = stats?.targets;
       this.receptions = stats?.receptions;
       this.target_share = stats?.target_share;
       this.rec_yards = stats?.rec_yards;
       this.rec_yards_after_catch = stats?.rec_yards_after_catch;
       this.rec_air_yards = stats?.rec_air_yards;
       this.rec_air_yards_share = stats?.rec_air_yards_share;
       this.rec_air_conversion_ratio = stats?.rec_air_conversion_ratio;
       this.weighted_opportunity_rating = stats?.weighted_opportunity_rating;
       this.rec_epa = stats?.rec_epa;
       this.rec_tds = stats?.rec_tds;
       this.rec_two_pt_conversions = stats?.rec_two_pt_conversions;
       this.rec_first_downs = stats?.rec_first_downs;
       this.rec_fumbles = stats?.rec_fumbles;
       this.rec_fumbles_lost = stats?.rec_fumbles_lost;
   }
}