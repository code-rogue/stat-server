import { WeeklyAdvDefQueryModel } from '@interfaces/stats/adv.query.model';

export class WeeklyAdvDefDto {
   public interceptions?: number;
   public targets?: number;
   public completions_allowed?: number;
   public completions_pct?: number;
   public yards_allowed?: number;
   public yards_allowed_per_cmp?: number;
   public yards_allowed_per_tgt?: number;
   public tds_allowed?: number;
   public passer_rating_allowed?: number;
   public adot?: number;
   public air_yards_completed?: number;
   public yards_after_catch?: number;
   public blitzed?: number;
   public hurried?: number;
   public pressures?: number;
   public tackles_combined?: number;
   public tackles_missed?: number;
   public tackles_missed_pct?: number;

   constructor(advStats?: WeeklyAdvDefQueryModel) {
       this.interceptions = advStats?.interceptions;
       this.targets = advStats?.targets;
       this.completions_allowed = advStats?.completions_allowed;
       this.completions_pct = advStats?.completions_pct;
       this.yards_allowed = advStats?.yards_allowed;
       this.yards_allowed_per_cmp = advStats?.yards_allowed_per_cmp;
       this.yards_allowed_per_tgt = advStats?.yards_allowed_per_tgt;
       this.tds_allowed = advStats?.tds_allowed;
       this.passer_rating_allowed = advStats?.passer_rating_allowed;
       this.adot = advStats?.adot;
       this.air_yards_completed = advStats?.air_yards_completed;
       this.yards_after_catch = advStats?.yards_after_catch;
       this.blitzed = advStats?.blitzed;
       this.hurried = advStats?.hurried;
       this.pressures = advStats?.pressures;
       this.tackles_combined = advStats?.tackles_combined;
       this.tackles_missed = advStats?.tackles_missed;
       this.tackles_missed_pct = advStats?.tackles_missed_pct;
   }
}