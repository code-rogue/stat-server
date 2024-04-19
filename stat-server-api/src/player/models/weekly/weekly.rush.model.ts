import { Model } from 'sequelize';

export default class WeeklyRushStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public carries: number;
    public rush_yards: number;
    public rush_first_downs: number;
    public rush_epa: number;
    public rush_tds: number;
    public rush_two_pt_conversions: number;
    public rush_fumbles: number;
    public rush_fumbles_lost: number;
    public special_teams_tds: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}