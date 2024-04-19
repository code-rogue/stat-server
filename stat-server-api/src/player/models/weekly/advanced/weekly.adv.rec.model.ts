import { Model } from 'sequelize';

export default class WeeklyAdvRecStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public broken_tackles: number;
    public drops: number;
    public drop_pct: number;
    public interceptions: number;
    public qb_rating: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}