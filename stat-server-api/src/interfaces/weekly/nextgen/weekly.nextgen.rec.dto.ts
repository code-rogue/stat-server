import { WeeklyNextGenRecQueryModel } from '@interfaces/stats/nextGen.query.model';

export class WeeklyNextGenRecDto {
   public avg_cushion?: number;
   public avg_intended_air_yards_pct?: number;
   public avg_separation?: number;
   public avg_intended_air_yards?: number;
   public catch_pct?: number;
   public share_of_intended_air_yards_pct?: number;
   public avg_yac?: number;
   public avg_expected_yac?: number;
   public avg_yac_above_expectation?: number;

   constructor(stats?: WeeklyNextGenRecQueryModel) {
       this.avg_cushion = stats?.avg_cushion;
       this.avg_intended_air_yards_pct = stats?.avg_intended_air_yards_pct;
       this.avg_separation = stats?.avg_separation;
       this.avg_intended_air_yards = stats?.avg_intended_air_yards;
       this.catch_pct = stats?.catch_pct;
       this.share_of_intended_air_yards_pct = stats?.share_of_intended_air_yards_pct;
       this.avg_yac = stats?.avg_yac;
       this.avg_expected_yac = stats?.avg_expected_yac;
       this.avg_yac_above_expectation = stats?.avg_yac_above_expectation;
   }
}