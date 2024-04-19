import { Model } from 'sequelize';

export default class WeeklyNextGenRushStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public efficiency: number;
    public attempts_gte_eight_defenders_pct: number;
    public avg_time_to_los: number;
    public expected_yards: number;
    public yards_over_expected: number;
    public avg_yards: number;
    public yards_over_expected_per_att: number;
    public yards_over_expected_pct: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}