import { Model } from 'sequelize';

export default class WeeklyAdvRushStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public yards_before_contact: number;
    public yards_before_contact_avg: number;
    public yards_after_contact: number;
    public yards_after_contact_avg: number;
    public broken_tackles: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}