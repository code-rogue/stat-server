import { WeeklyNextGenPassQueryModel } from '@interfaces/stats/nextGenStats.query.model';

export class WeeklyNextGenPassDto {
   public aggressiveness?: number;
   public avg_time_to_throw?: number;
   public avg_air_distance?: number;
   public max_air_distance?: number;
   public avg_completed_air_yards?: number;
   public avg_intended_air_yards?: number;
   public avg_air_yards_to_sticks?: number;
   public max_completed_air_distance?: number;
   public passer_rating?: number;
   public completion_pct?: number;
   public expected_completion_pct?: number;
   public completions_above_expectation_pct?: number;
   public created_date?: Date;
   public last_modified?: Date;

   constructor(stats?: WeeklyNextGenPassQueryModel) {
       this.aggressiveness = stats?.aggressiveness;
       this.avg_time_to_throw = stats?.avg_time_to_throw;
       this.avg_air_distance = stats?.avg_air_distance;
       this.max_air_distance = stats?.max_air_distance;
       this.avg_completed_air_yards = stats?.avg_completed_air_yards;
       this.avg_intended_air_yards = stats?.avg_intended_air_yards;
       this.avg_air_yards_to_sticks = stats?.avg_air_yards_to_sticks;
       this.max_completed_air_distance = stats?.max_completed_air_distance;
       this.passer_rating = stats?.passer_rating;
       this.completion_pct = stats?.completion_pct;
       this.expected_completion_pct = stats?.expected_completion_pct;
       this.completions_above_expectation_pct = stats?.completions_above_expectation_pct;
   }
}