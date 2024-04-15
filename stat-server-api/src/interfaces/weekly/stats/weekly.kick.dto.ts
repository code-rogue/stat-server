import { WeeklyKickQueryModel } from '@interfaces/stats/stats.query.model';

export class WeeklyKickDto {
   public fg_att?: number;
   public fg_made?: number;
   public fg_missed?: number;
   public fg_blocked?: number;
   public fg_pct?: number;
   public fg_long?: number;
   public fg_made_0_19?: number;
   public fg_made_20_29?: number;
   public fg_made_30_39?: number;
   public fg_made_40_49?: number;
   public fg_made_50_59?: number;
   public fg_made_60_?: number;
   public fg_missed_0_19?: number;
   public fg_missed_20_29?: number;
   public fg_missed_30_39?: number;
   public fg_missed_40_49?: number;
   public fg_missed_50_59?: number;
   public fg_missed_60_?: number;
   public fg_made_distance?: number;
   public fg_missed_distance?: number;
   public fg_blocked_distance?: number;
   public fg_made_list?: string;
   public fg_missed_list?: string;
   public fg_blocked_list?: string;
   public gwfg_att?: number;
   public gwfg_distance?: number;
   public gwfg_made?: number;
   public gwfg_missed?: number;
   public gwfg_blocked?: number;
   public pat_att?: number;
   public pat_made?: number;
   public pat_missed?: number;
   public pat_blocked?: number;
   public pat_pct?: number;

   constructor(stats?: WeeklyKickQueryModel) {
       this.fg_att = stats?.fg_att;
       this.fg_made = stats?.fg_made;
       this.fg_missed = stats?.fg_missed;
       this.fg_blocked = stats?.fg_blocked;
       this.fg_pct = stats?.fg_pct;
       this.fg_long = stats?.fg_long;
       this.fg_made_0_19 = stats?.fg_made_0_19;
       this.fg_made_20_29 = stats?.fg_made_20_29;
       this.fg_made_30_39 = stats?.fg_made_30_39;
       this.fg_made_40_49 = stats?.fg_made_40_49;
       this.fg_made_50_59 = stats?.fg_made_50_59;
       this.fg_made_60_ = stats?.fg_made_60_;
       this.fg_missed_0_19 = stats?.fg_missed_0_19;
       this.fg_missed_20_29 = stats?.fg_missed_20_29;
       this.fg_missed_30_39 = stats?.fg_missed_30_39;
       this.fg_missed_40_49 = stats?.fg_missed_40_49;
       this.fg_missed_50_59 = stats?.fg_missed_50_59;
       this.fg_missed_60_ = stats?.fg_missed_60_;
       this.fg_made_distance = stats?.fg_made_distance;
       this.fg_missed_distance = stats?.fg_missed_distance;
       this.fg_blocked_distance = stats?.fg_blocked_distance;
       this.fg_made_list = stats?.fg_made_list;
       this.fg_missed_list = stats?.fg_missed_list;
       this.fg_blocked_list = stats?.fg_blocked_list;
       this.gwfg_att = stats?.gwfg_att;
       this.gwfg_distance = stats?.gwfg_distance;
       this.gwfg_made = stats?.gwfg_made;
       this.gwfg_missed = stats?.gwfg_missed;
       this.gwfg_blocked = stats?.gwfg_blocked;
       this.pat_att = stats?.pat_att;
       this.pat_made = stats?.pat_made;
       this.pat_missed = stats?.pat_missed;
       this.pat_blocked = stats?.pat_blocked;
       this.pat_pct = stats?.pat_pct;
   }
}