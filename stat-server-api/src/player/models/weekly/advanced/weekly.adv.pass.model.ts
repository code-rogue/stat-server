import { Model } from 'sequelize';

export default class WeeklyAdvPassStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public pass_drops: number;
    public pass_drop_pct: number;
    public bad_throws: number;
    public bad_throw_pct: number;
    public blitzed: number;
    public hurried: number;
    public hit: number;
    public pressured: number;
    public pressured_pct: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}