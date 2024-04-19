import { Model } from 'sequelize';

export default class SeasonAdvRushStatModel extends Model {
    public id: number;
    public player_season_id: number;
    public attempts: number;
    public yards: number;
    public tds: number;
    public longest_rush: number;
    public yards_before_contact: number;
    public yards_before_contact_avg: number;
    public yards_after_contact: number;
    public yards_after_contact_avg: number;
    public broken_tackles: number;
    public broken_tackles_avg: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}