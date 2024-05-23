import { Model } from 'sequelize';

export default class SeasonPassStatModel extends Model {
    public id: number;
    public player_id: number;
    public season: string;
    public fantasy_points: number;
    public fantasy_points_ppr: number;
    public attempts: number;
    public completions: number;
    public pass_yards: number;
    public pass_yards_after_catch: number;
    public pass_air_yards: number;
    public pass_air_conversion_ratio: number;
    public pass_first_downs: number;
    public dakota: number;
    public pass_epa: number;
    public pass_tds: number;
    public pass_two_pt_conversions: number;
    public interceptions: number;
    public sacks: number;
    public sack_yards: number;
    public sack_fumbles: number;
    public sack_fumbles_lost: number;
}