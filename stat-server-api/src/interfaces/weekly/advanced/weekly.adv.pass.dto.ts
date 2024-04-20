import { WeeklyAdvPassQueryModel } from '@interfaces/stats/adv.query.model';

export class WeeklyAdvPassDto {
   public pass_drops?: number;
   public pass_drop_pct?: number;
   public rec_drops?: number;
   public rec_drop_pct?: number;
   public bad_throws?: number;
   public bad_throw_pct?: number;
   public blitzed?: number;
   public hurried?: number;
   public hit?: number;
   public pressured?: number;
   public pressured_pct?: number;
   public created_date?: Date;
   public last_modified?: Date;

   constructor(advStats?: WeeklyAdvPassQueryModel) {
       this.pass_drops = advStats?.pass_drops;
       this.pass_drop_pct = advStats?.pass_drop_pct;
       this.rec_drops = advStats?.rec_drop;
       this.rec_drop_pct = advStats?.rec_drop_pct;
       this.bad_throws = advStats?.bad_throws;
       this.bad_throw_pct = advStats?.bad_throw_pct;
       this.blitzed = advStats?.blitzed;
       this.hurried = advStats?.hurried;
       this.hit = advStats?.hit;
       this.pressured = advStats?.pressured;
       this.pressured_pct = advStats?.pressured_pct;
   }
}