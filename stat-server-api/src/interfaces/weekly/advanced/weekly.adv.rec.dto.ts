import { WeeklyAdvRecQueryModel } from '@interfaces/stats/advStats.query.model';

export class WeeklyAdvRecDto {
   public broken_tackles?: number;
   public drops?: number;
   public drop_pct?: number;
   public interceptions?: number;
   public qb_rating?: number;
   public created_date?: Date;
   public last_modified?: Date;

   constructor(advStats?: WeeklyAdvRecQueryModel) {
       this.broken_tackles = advStats?.broken_tackles;
       this.drops = advStats?.drops;
       this.drop_pct = advStats?.drop_pct;
       this.interceptions = advStats?.interceptions;
       this.qb_rating = advStats?.qb_rating;        
   }
}