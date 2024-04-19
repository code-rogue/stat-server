import { Model } from 'sequelize';

export default class SeasonAdvRecStatModel extends Model {
    public id: number;
    public player_season_id: number;
    public targets: number;
    public receptions: number;
    public yards: number;
    public tds: number;
    public longest_rec: number;
    public air_yards: number;
    public air_yards_avg: number;
    public yards_after_contact: number;
    public yards_after_contact_avg: number;
    public adot: number;
    public broken_tackles: number;
    public broken_tackles_avg: number;
    public drops: number;
    public drop_pct: number;
    public interceptions: number;
    public qb_rating: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}