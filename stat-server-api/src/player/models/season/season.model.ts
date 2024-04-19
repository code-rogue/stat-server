import { Model } from 'sequelize';

export default class SeasonStatModel extends Model {
    public id: number;
    public player_id: number;
    public season: string;
    public age: number;
    public games_played: number;
    public games_started: number;
    public fantasy_points: number;
    public fantasy_points_ppr: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}