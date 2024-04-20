import { SeasonAdvRushQueryModel } from '@interfaces/stats/adv.query.model';

export class SeasonAdvRushDto {
   public attempts?: number;
   public yards?: number;
   public tds?: number;
   public longest_rush?: number;
   public yards_before_contact?: number;
   public yards_before_contact_avg?: number;
   public yards_after_contact?: number;
   public yards_after_contact_avg?: number;
   public broken_tackles?: number;
   public broken_tackles_avg?: number;
   public created_date?: Date;
   public last_modified?: Date;

   constructor(advStats?: SeasonAdvRushQueryModel) {
       this.attempts = advStats?.attempts;
       this.yards = advStats?.yards;
       this.tds = advStats?.tds;
       this.longest_rush = advStats?.longest_rush;
       this.yards_before_contact = advStats?.yards_before_contact;
       this.yards_before_contact_avg = advStats?.yards_before_contact_avg;
       this.yards_after_contact = advStats?.yards_after_contact;
       this.yards_after_contact_avg = advStats?.yards_after_contact_avg;
       this.broken_tackles = advStats?.broken_tackles;
       this.broken_tackles_avg = advStats?.broken_tackles_avg;
   }
}