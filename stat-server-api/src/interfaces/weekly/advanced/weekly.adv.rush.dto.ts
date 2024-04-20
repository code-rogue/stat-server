import { WeeklyAdvRushQueryModel } from '@interfaces/stats/adv.query.model';

export class WeeklyAdvRushDto {
   public yards_before_contact?: number;
   public yards_before_contact_avg?: number;
   public yards_after_contact?: number;
   public yards_after_contact_avg?: number;
   public broken_tackles?: number;

   constructor(advStats?: WeeklyAdvRushQueryModel) {
       this.yards_before_contact = advStats?.yards_before_contact;
       this.yards_before_contact_avg = advStats?.yards_before_contact_avg;
       this.yards_after_contact = advStats?.yards_after_contact;
       this.yards_after_contact_avg = advStats?.yards_after_contact_avg;
       this.broken_tackles = advStats?.broken_tackles;
   }
}