import { Model } from 'sequelize';

export default class SeasonRecStatModel extends Model {
    public id: number;
    public player_id: number;
    public season: string;
    public fantasy_points: number;
    public fantasy_points_ppr: number;
    public targets: number;
    public receptions: number;
    public target_share: number;
    public rec_yards: number;
    public rec_yards_after_catch: number;
    public rec_air_yards: number;
    public rec_air_yards_share: number;
    public rec_air_conversion_ratio: number;
    public weighted_opportunity_rating: number;
    public rec_epa: number;
    public rec_tds: number;
    public rec_two_pt_conversions: number;
    public rec_first_downs: number;
    public rec_fumbles: number;
    public rec_fumbles_lost: number;
}