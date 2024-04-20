import { SeasonAdvRecQueryModel } from '@interfaces/stats/adv.query.model';

export class SeasonAdvRecDto {
   public targets?: number;
   public receptions?: number;
   public yards?: number;
   public tds?: number;
   public longest_rec?: number;
   public air_yards?: number;
   public air_yards_avg?: number;
   public yards_after_contact?: number;
   public yards_after_contact_avg?: number;
   public adot?: number;
   public broken_tackles?: number;
   public broken_tackles_avg?: number;
   public drops?: number;
   public drop_pct?: number;
   public interceptions?: number;
   public qb_rating?: number;

   constructor(advStats?: SeasonAdvRecQueryModel) {
       this.targets = advStats?.targets;
       this.receptions = advStats?.receptions;
       this.yards = advStats?.yards;
       this.tds = advStats?.tds;
       this.longest_rec = advStats?.longest_rec;
       this.air_yards = advStats?.air_yards;
       this.air_yards_avg = advStats?.air_yards_avg;
       this.yards_after_contact = advStats?.yards_after_contact;
       this.yards_after_contact_avg = advStats?.yards_after_contact_avg;
       this.adot = advStats?.adot;
       this.broken_tackles = advStats?.broken_tackles;
       this.broken_tackles_avg = advStats?.broken_tackles_avg;
       this.drops = advStats?.drops;
       this.drop_pct = advStats?.drop_pct;
       this.interceptions = advStats?.interceptions;
       this.qb_rating = advStats?.qb_rating;        
   }
}