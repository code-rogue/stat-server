import { WeeklyNextGenRushQueryModel } from '@interfaces/stats/nextGenStats.query.model';

export class WeeklyNextGenRushDto {
   public efficiency?: number;
   public attempts_gte_eight_defenders_pct?: number;
   public avg_time_to_los?: number;
   public expected_yards?: number;
   public yards_over_expected?: number;
   public avg_yards?: number;
   public yards_over_expected_per_att?: number;
   public yards_over_expected_pct?: number;

   constructor(stats?: WeeklyNextGenRushQueryModel) {
       this.efficiency = stats?.efficiency;
       this.attempts_gte_eight_defenders_pct = stats?.attempts_gte_eight_defenders_pct;
       this.avg_time_to_los = stats?.avg_time_to_los;
       this.expected_yards = stats?.expected_yards;
       this.expected_yards = stats?.expected_yards;
       this.yards_over_expected = stats?.yards_over_expected;
       this.avg_yards = stats?.avg_yards;
       this.yards_over_expected_per_att = stats?.yards_over_expected_per_att;
       this.yards_over_expected_pct = stats?.yards_over_expected_pct;
   }
}